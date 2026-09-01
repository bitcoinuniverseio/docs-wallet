# Contributing

This is documentation for software that holds people's money. The bar for a change is different from
most documentation repositories, and the difference is worth stating plainly.

## The rule that matters

**A claim that cannot be verified in the wallet source does not go in.**

If a capability could not be established, say it is not available rather than describing how it might
work. A reader who believes a page here and loses funds has been failed by this repository, and no
amount of helpful tone makes up for it.

Corollary: **an undocumented limitation is a bug in the documentation.** If you find one, adding it is
a welcome contribution, not a complaint.

## Where facts come from

| Kind of claim | The only acceptable source |
| --- | --- |
| Version numbers and protocol support | `capability-snapshot.json`, rendered at build time. Never typed into prose. |
| Screens, routes, and gating | The wallet repository's generated route inventory |
| Product behaviour | The wallet source, cited in the page's `sourcePath` |
| Release position | The wallet repository's release records |

Refresh the capability snapshot rather than editing it:

```bash
npm run capability:pull
```

## Copy rules, enforced

Run `npm test` before opening a pull request. It fails on:

- an em dash anywhere, in prose or code. Use a comma, a colon, a period, or parentheses;
- the word this project does not use for "authoritative", outside the HTML `rel` attribute;
- any emoji. Status is carried by words, so that it survives a screen reader and a colour-blind reader;
- unverifiable superlatives, guarantees a wallet cannot keep, filler, and placeholders;
- a private hostname, an internal address, a credential shape, or a full-length example address;
- a page missing provenance or a unique description;
- a version or protocol count that contradicts the snapshot.

Write plainly. Short paragraphs. Prefer a diagram or a table over three paragraphs of text.

## Page structure

Every task guide states, in this order: intended reader, goal, prerequisites, chain and network,
safety considerations, exact steps, expected result, how to verify, common failures, recovery path,
and related pages.

Every page's front matter carries:

```yaml
sourceRepo: bitcoinuniverseio/wallet
sourcePath: the path in that repository where the behaviour is defined
lifecycle: stable | beta | experimental | not-released | deprecated
lastVerified: YYYY-MM-DD
```

Set `provenance: false` only on navigation pages that make no product claims.

## Diagrams

See [Diagram conventions](https://bitcoinuniverseio.github.io/docs-wallet/reference/diagram-conventions).
In short: hand-authored inline SVG, one idea each, a title and a real description, the accent colour
reserved for warnings, colour never the only signal, synthetic values only, and no screenshots.

`npm run check:diagrams` enforces most of that.

## Changing a URL

Add the old path to the `redirects` array in `docs.manifest.json`. A link people have bookmarked in a
wallet manual is not a link to break casually.

## Reviewing

A reviewer should ask three questions:

1. Can every factual claim here be traced to the wallet source or the capability snapshot?
2. Could a reader lose money by believing this page?
3. Does it state what is **not** available as clearly as what is?

## Security

Do not open a public issue for a vulnerability. See [SECURITY.md](SECURITY.md).

Never include a recovery phrase, a private key, or a screenshot of either in an issue or a pull
request, including a phrase you consider dead. Assume anything committed here is permanent and public.
