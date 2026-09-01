// Makes overflowing code blocks reachable from the keyboard, with a name.
//
// When a code block is wider than its column, Expressive Code's browser script
// sets tabindex and role on the `<pre>` so it can be scrolled from the
// keyboard. That only runs client side, so a reader with JavaScript disabled
// gets a scroll region no keyboard can reach, which axe reports as
// scrollable-region-focusable.
//
// Marking the block at build time fixes it for everyone. A code block is not a
// region of the page, and listing every one alongside the navigation and main
// content would be noise, so each is marked as a focusable group with a name:
// focusable is what the scrolling needs, and group carries the label without
// claiming to be page structure.
//
// Expressive Code's own check is `getAttribute("tabindex") !== null`, so a
// block that already declares itself focusable is left alone.
export function codeBlockAccessibility() {
  return {
    name: 'code-block-accessibility',
    hooks: {
      postprocessRenderedBlock: (context) => {
        const pre = findPre(context.renderData.blockAst);
        if (pre === null) return;
        pre.properties = pre.properties ?? {};
        pre.properties.tabIndex = 0;
        pre.properties.role = 'group';
        pre.properties['aria-label'] = nameFor(context.codeBlock);
      },
    },
  };
}

// "js code, connecting" where the block has a title, "js code" where it does
// not. The language is the useful half: it tells a listener what they are about
// to hear before they hear it.
function nameFor(codeBlock) {
  const language = (codeBlock?.language ?? '').trim();
  const title = (codeBlock?.metaOptions?.getString?.('title') ?? '').trim();
  const kind = language === '' || language === 'plaintext' ? 'Code' : `${language} code`;
  return title === '' ? kind : `${kind}, ${title}`;
}

function findPre(node) {
  if (node === null || node === undefined) return null;
  if (node.type === 'element' && node.tagName === 'pre') return node;
  for (const child of node.children ?? []) {
    const found = findPre(child);
    if (found !== null) return found;
  }
  return null;
}
