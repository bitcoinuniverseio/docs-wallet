# Why an action is unavailable | Universe Wallet

What the unavailable screen means, what it is not, and the list of things that will not change it.

- Universe Wallet 
- Assets and protocols 
 
# Why an action is unavailable

 You opened a screen and it told you the operation is not available in this build. Here is what that
means.

 
## What it means
 Section titled “What it means” 

 The exact build you are running does not carry evidence for that operation, on that protocol, on that
network. So the wallet refuses it up front, and names what is missing, rather than offering an action
that would fail somewhere later.

 The screen still loads. It does not disappear from navigation. That is deliberate: a feature that
silently vanishes between builds leaves you unsure whether you imagined it.

 
## What it is not
 Section titled “What it is not” 

 

- Not an outage. Nothing is down. This is a property of your build. 

- Not a permission problem. There is no account, no tier, and no upgrade. 

- Not a setting. There is no toggle in the wallet that changes it. 

- Not a bug to report. It is the product working as designed. Reporting it is fine and the answer
will be this page. 

 
## What will not change it
 Section titled “What will not change it” 

 

- Reinstalling the extension. 

- Clearing storage or resetting the wallet. 

- Switching accounts, or importing the phrase again. 

- Switching networks, although a different network genuinely can have a different authorization state,
because authorization is recorded per network. 

- Waiting. It changes when a new build is released carrying evidence for that operation, not
before. 

 
## How the gating is shaped
 Section titled “How the gating is shaped” 

 Screens fall into groups, recorded in the wallet’s generated route inventory:

 Group What it means Always reachable No protocol gate. Present in every build. Gated and authorized Behind a protocol gate that your release authorizes. Gated and blocked Behind a protocol gate with no authorized operation. Fails closed. Runtime gated The gate depends on what you navigated from. 

 In the 1.7.5.8 baseline, 69 of 113 routes are always reachable, 40 are gated and
blocked, and 4 are runtime gated. Nothing is gated and authorized, because the baseline authorizes
nothing.

 Ordinary Bitcoin sending is behind a gate too
 The send, confirm, batch send, and consolidation screens sit behind bitcoin/send and
 bitcoin/broadcast . This surprises people, and it is the same rule applied consistently: no operation
is exempt from needing evidence, including the most ordinary one.

 
 
## What you can still do
 Section titled “What you can still do” 

 Everything with no protocol gate: create and import wallets, receive, manage address types, switch
networks, connect and disconnect sites, read activity, inspect a transaction by id, view locked coins
and coin health, use the address book, and use the security dashboard.

 
## If you need the operation
 Section titled “If you need the operation” 

 There is nothing to configure locally. Follow the
 release list for a build that carries it, and
read What this release authorizes for the current position.

 
## Related
 Section titled “Related” 

 

- Capability evidence 

- Which version you are running 

 Edit page Last updated: Nov 11, 2026 

 Previous The protocol registry Next Media and large portfolios 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/ROUTE-INVENTORY.md, frontend/ui/pages/FeatureUnavailable 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Not released 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
