# Diagram style

Every diagram in this folder is hand-authored SVG. There is no build step and no
external tooling, so a diagram is edited the same way a paragraph is.

## Rules

- **One idea per diagram.** If a second idea needs saying, write a second diagram.
- **Theme-aware.** Define the light palette on the class, then override only what
  changes inside `@media (prefers-color-scheme: dark)`. Both themes must be
  legible on GitHub, which serves these through an `<img>` tag so the media query
  resolves against the reader's browser.
- **Accessible.** Every file carries `role="img"` and `aria-labelledby` pointing at
  a `<title>` and a `<desc>`. The `<desc>` describes what the diagram shows, not
  what it looks like, so a reader who cannot see it still gets the point. The
  Markdown alt text repeats the title.
- **No markers for arrowheads.** A `<marker>` cannot inherit the referencing
  path's colour across a theme switch. Draw the arrowhead as an explicit path and
  give it its own class.
- **Synthetic values only.** Addresses, balances, transaction ids and site names
  are invented. Nothing here may come from a real wallet.
- **No em dashes, no emoji.** Same rule as the prose.

## Palette

| Role | Light | Dark |
| --- | --- | --- |
| Page | `#ffffff` | `#0e0a13` |
| Panel | `#fbf7fa` | `#16101d` |
| Panel border | `#e6dde6` | `#372b47` |
| Text | `#1a1119` | `#f3edf5` |
| Text dim | `#5f5262` | `#a9a0b3` |
| Accent | `#e10098` | `#ff2a85` |
| Safe | `#1a7f43` | `#5fd18b` |
| Held back | `#b3006f` | `#ff7ab8` |
| Caution | `#8a5a00` | `#f0b74d` |

Type is the system UI stack. No web font is referenced, so a diagram renders the
same whether or not the reader is online.

## Files

| File | Explains | Used by |
| --- | --- | --- |
| `protected-outputs.svg` | Why an asset-bearing coin never funds a plain payment | [Protected outputs](../../assets-and-protocols/protected-outputs.md) |
| `address-lanes.svg` | Which address receives what, and why they differ | [Accounts and networks](../../wallet-basics/accounts-and-networks.md) |
| `transaction-review.svg` | Every card on the review screen and what it answers | [Reviewing a transaction](../../using-wallet/reviewing-a-transaction.md) |
| `connection-lifecycle.svg` | What a connected site gets, and how access ends | [Connections](../../using-wallet/connections.md) |
| `recovery-paths.svg` | Which recovery path applies to which loss | [Restore](../../security-and-recovery/restore.md) |
| `release-evidence.svg` | Why a protocol appears only when evidence proves it | [Supported protocols](../../assets-and-protocols/supported-protocols.md) |
