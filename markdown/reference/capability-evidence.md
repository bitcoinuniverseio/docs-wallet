# Capability evidence | Universe Wallet

The rule that decides whether an operation ships, what counts as evidence, and how to check a claim yourself instead of taking anyone's word.

- Universe Wallet 
- Reference 
 
# Capability evidence

 Most wallets describe support by listing what the code can do. Universe Wallet does not, because a
list of what the code can do is a list of things that might work, presented as things that do.

 
## The rule
 Section titled “The rule” 

 Code existing is not support. A route existing is not availability. A parser existing is not wallet
support. 

 An operation is authorized only when the exact build carries current, verified evidence for the
complete path behind it.

 
 Six links, all of which must carry evidence bound to the exact source commit of the build. One
missing link means the operation is not authorized, and the screen says so.
 

 
## What is checked
 Section titled “What is checked” 

 The release matrix carries one row for every protocol, network, and operation combination, with UI,
provider, API, signer, indexer, health, evidence, and release-state classifications. In
the imported 1.7.5.8 source snapshot, 0 of
42 protocols have an authorized operation. This is a source baseline, not a
claim about a newly published extension.

 The local payment-instruction parser and receiving-request builder can complete their local work
without moving funds. Parsing an instruction or creating a payment request does not authorize a
payment feature or establish that a payer settled it. Remote product operations still require their
own available executor and release evidence.

 Authorization is produced for an immutable workflow run, not copied by hand into a document. The
generated readiness record contains the exact source commit, the workflow run id, individual gate
results, the protocol matrix checksum, and the exact extension artifact checksum. A go decision is
possible only when every gate succeeds, the artifact is checksum-bound, and every intended protocol
operation is evidence-backed. Zero functional coverage is always a no-go.

 
## What this means when you read a claim
 Section titled “What this means when you read a claim” 

 Any statement that Universe Wallet supports a protocol is checkable, and the way to check it is not to
ask the person who said it.

 

- Open the screen in your own wallet. 

- If the operation is not authorized in your build, the screen says so and names what is missing. 

- That screen is authoritative for you. This documentation is not, and neither is a store listing, a
social post, or a support reply. 

 
## Why the committed baseline is empty
 Section titled “Why the committed baseline is empty” 

 Deliberately. Authorization is attached at release time to one exact build. If the baseline carried
authorizations, a build could inherit a claim it never earned, which is precisely the failure the
system exists to prevent.

 So gated-blocked in the wallet’s own route inventory means “not authorized in the committed
baseline”, not “permanently unreachable”.

 
## The one campaign that has completed
 Section titled “The one campaign that has completed” 

 A qualification campaign scoped to Zerdinals and ZRunes completed on 30 August 2026 against one
candidate commit. Every release gate passed and an authorization covering thirteen operations across
those two protocols was produced. The matrix regenerated from it authorizes 26 of its 1,595 rows and
nothing outside that scope.

 That artifact has not been published. See
 Which version you are running .

 
## Related
 Section titled “Related” 

 

- What this release authorizes 

- Why an action is unavailable 

- The protocol registry 

 Edit page Last updated: Nov 11, 2026 

 Previous Known limitations Next Release notes 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/RELEASE-READINESS-POLICY.md, docs/PROTOCOL-RELEASE-MATRIX.md 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-06 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
