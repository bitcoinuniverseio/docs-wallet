# Release notes | Universe Wallet

What changed between the wallet builds this documentation can verify, and what has and has not reached users.

- Universe Wallet 
- Reference 
 
# Release notes

 Only one build has ever reached users
 The Chrome Web Store item has served 1.0.13 since 15 April 2025. Every version below exists as a
candidate in the source tree and in the release list, and none of them has been published. See
 Which version you are running .

 
 
## What is published
 Section titled “What is published” 

 Version Date Where 1.0.13 15 April 2025 Chrome Web Store item fjalkkkbjffhgdoheannkodafhemfdba 

 This documentation was not written against 1.0.13 and cannot describe it accurately. Its source is not
the tree used here.

 
## What exists as candidates
 Section titled “What exists as candidates” 

 Version State 1.7.5.8 Current source tree. 0 of 42 protocols authorized in the committed baseline. Not submitted. 1.7.5.6 Production readiness record exists, bound to one commit and one workflow run. 1.7.5.5, 1.7.5.4 Production release records and protocol matrices exist for both. 

 Candidate builds are published as pre-releases on the
 wallet releases page , named by their exact
commit. A pre-release is a candidate that has been built, not a build that has been authorized.

 
## The one qualification that completed
 Section titled “The one qualification that completed” 

 On 30 August 2026, a campaign scoped to Zerdinals and ZRunes completed against a single candidate
commit. Every release gate passed, and an authorization covering thirteen operations across those two
protocols was produced. The regenerated matrix authorizes 26 of its 1,595 rows and nothing outside
that scope.

 Submission remains blocked because the Chrome Web Store publishing credential is not available to the
repository.

 
## What changed in 1.7.5.8 that is visible to a user
 Section titled “What changed in that is visible to a user” 

 Verifiable from the source tree and its own records:

 

- Risk rows in the approval popover now open with a chip reading Warning or Critical . Before
1.7.5.8 the severity was carried only by colour, which failed the rule that colour
must never be the only signal. 

- The route inventory records 113 routes across 47 areas, with 15 approval variants, laying out at
popup, side panel, and tab widths. 

 
## How to read a release claim
 Section titled “How to read a release claim” 

 A version number tells you which code was built. It does not tell you which operations that build
authorizes. Those are separate facts, and the second one is the one that affects you. See
 Capability evidence .

 
## Related
 Section titled “Related” 

 

- Supported features 

- Known limitations 

 Edit page Last updated: Nov 11, 2026 

 Previous Capability evidence Next Glossary 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/PRODUCTION-RELEASE-1.7.5.4.md, docs/PRODUCTION-RELEASE-1.7.5.5.md, docs/PRODUCTION-READINESS-1.7.5.6.md 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
