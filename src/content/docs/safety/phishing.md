---
title: Phishing and impostors
description: The small number of attacks that account for almost all losses, the one rule that defeats most of them, and what the wallet does and does not filter.
sourceRepo: bitcoinuniverseio/wallet
sourcePath: frontend/ui/pages/Phishing
lifecycle: experimental
lastVerified: 2026-09-01
---

## The one rule

**Nobody legitimate ever needs your recovery phrase.**

Not support. Not a verification step. Not a wallet upgrade. Not an airdrop claim. Not a migration
tool. Not a security check. Not the person helping you recover funds. There is no exception, in any
wallet, ever.

If you follow only this rule, you avoid most of the ways people lose everything.

## The attacks that actually work

### The counterfeit extension

A store listing that copies the name, icon, and description. It asks you to import your phrase and
takes everything the moment you do.

**Defence:** install only from the store listing with item id
`fjalkkkbjffhgdoheannkodafhemfdba`. Names can be copied. Ids cannot. See
[Install](/docs-wallet/start/install).

### Support that contacts you first

Someone appears in a reply, a direct message, or a chat channel, offering to help with a problem you
mentioned. They are friendly, they are competent, and eventually they need your phrase or a "sync
code".

**Defence:** real support never contacts you first and never needs your phrase. Go to
[Support](/docs-wallet/help/support) yourself.

### The look-alike site

A site one character away from the real one, or a sponsored search result above it. Everything works
until the signature request, which does something other than what the page says.

**Defence:** bookmark the sites you use and reach them from your bookmarks. Read the origin line the
wallet shows, which comes from the browser and cannot be faked by the page.

### The unreadable signature

A request that is raw data rather than readable text, or a transaction whose effect you cannot
explain. Sometimes framed as "just verifying your wallet".

**Defence:** if you cannot say in one sentence what the request does, reject it. See
[What a signature authorizes](/docs-wallet/concepts/what-a-signature-authorizes).

### The address swap

Malware that replaces an address in your clipboard between copying and pasting. The ends often look
plausible.

**Defence:** compare the first four and last four characters after pasting, every time.

### The urgent deadline

A mint closing, a claim expiring, a compromise you must fix in the next ten minutes. Urgency exists to
stop you reading.

**Defence:** treat urgency itself as the warning. Nothing legitimate is destroyed by taking five
minutes to check.

## What the wallet does

- Blocks known phishing domains through rules that ship inside the extension, applied locally rather
  than by sending your browsing anywhere.
- Screens signature request text for scam-language patterns and warns you.
- Shows the origin the browser reports, not a name the page chose.
- Provides a phishing URL checker in the security dashboard.

## What the wallet cannot do

- Recognise a site that is new, or convincing, or targeted at you specifically.
- Tell whether the deal you are signing is a good one.
- Stop you approving something after it warned you.

Filtering catches the known. Your reading catches the rest.

## If you already did

Go to [If your wallet is compromised](/docs-wallet/safety/compromised-wallet). Speed matters more than
diagnosis.

## Related

- [Security model](/docs-wallet/safety/security-model)
- [Manage connections](/docs-wallet/tasks/manage-connections)
