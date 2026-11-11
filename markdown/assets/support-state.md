# What this release authorizes | Universe Wallet

The generated answer to which protocol operations Universe Wallet 1.7.5.8 authorizes, and why the number is what it is.

- Universe Wallet 
- Assets and protocols 
 
# What this release authorizes

 The number, first
 Universe Wallet 1.7.5.8 carries 42 protocols in its
registry and authorizes 0 of them. No protocol operation is
available in the committed baseline. Do not plan around a protocol action working.

 
 That figure comes from the wallet’s own generated capability summary, which is the only source this
documentation is permitted to make a version or capability claim from. It is copied into this
repository as capability-snapshot.json and every count on this site is rendered from it, so the two
cannot drift apart.

 
## Why zero
 Section titled “Why zero” 

 
 An operation is authorized only when current evidence exists for every link behind it, bound
to the exact commit of the build. The baseline in the repository carries none, on purpose, so that
a build can never inherit an authorization it did not earn.
 

 The rule the product applies is: code existing is not support . A route existing is not
availability. A parser existing is not wallet support. Authorization is attached at release time, per
protocol, per network, per operation, from evidence covering the wallet, the API, the indexer, the
network, confirmation, and reconciliation.

 One qualification campaign has completed, scoped to Zerdinals and ZRunes, producing an authorization
covering thirteen operations across those two protocols against one candidate commit. That artifact
has not been published. See Which version you are running .

 
## What is still true with zero authorized
 Section titled “What is still true with zero authorized” 

 The parts of the wallet that carry no protocol gate work regardless: creating and importing wallets,
receiving, addresses and address types, network switching, connections, the security dashboard,
locked-coin and coin-health views, the address book, and activity.

 The parts that carry a protocol gate, including ordinary Bitcoin sending , depend on what your
build authorized. The screen tells you. See
 Why an action is unavailable .

 
## How to read a claim anywhere else
 Section titled “How to read a claim anywhere else” 

 If a page, a listing, a social post, or a person tells you a protocol action works in Universe Wallet,
the way to check is not to ask them. Open the screen. If the operation is not authorized in your
build, the screen says so and names what is missing.

 
## Related
 Section titled “Related” 

 

- The protocol registry , all 42 of them 

- Capability evidence 

- Why an action is unavailable 

 Edit page Last updated: Nov 11, 2026 

 Previous What a digital artifact is Next The protocol registry 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/PUBLIC-CAPABILITY-SUMMARY.json 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Not released 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
