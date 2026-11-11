# Which version you are running | Universe Wallet

The published Chrome Web Store build is 1.0.13 from April 2025. This documentation describes the 1.7.5.8 source tree, which has not been published. Here is exactly what that means for you.

- Universe Wallet 
- Start here 
 
# Which version you are running

 There are two version numbers in play, and confusing them is the easiest way to be misled by this
site. This page exists so that you cannot be.

 
## The two numbers
 Section titled “The two numbers” 

 Published to users Described here Version 1.0.13 1.7.5.8 Date 15 April 2025 Not published Where Chrome Web Store item fjalkkkbjffhgdoheannkodafhemfdba The bitcoinuniverseio/wallet source tree Zcash support Predates it entirely Present in source Protocol operations authorized Not verifiable from this source tree 0 of 42 

 What this means for you
 If you installed Universe Wallet from the Chrome Web Store, you are running 1.0.13. Screens described
on this site may not exist in your build, may be laid out differently, or may behave differently.
Where this documentation and your wallet disagree, your wallet is correct . Never take an action
because a page here says a screen should be there.

 
 
## Why 1.7.5.8 is not published
 Section titled “Why 1.7.5.8 is not published” 

 Two independent blockers were recorded in the product’s release ledger. One is closed, one is not.

 

- No authorized artifact existed. This closed on 30 August 2026. A qualification campaign scoped
to Zerdinals and ZRunes completed against one candidate commit, every release gate passed, and an
authorization was produced covering thirteen operations across those two protocols and nothing
else. 

- The Chrome Web Store publishing credential is not available to the repository. This still
blocks submission. Nothing can be submitted regardless of readiness. 

 So an artifact that could be published exists, and it has not been published. Until it is, the wallet
people actually have installed is the April 2025 build.

 
## Why the committed source authorizes nothing
 Section titled “Why the committed source authorizes nothing” 

 The number above says 0 of 42, and that is not an
outage or an oversight.

 Authorization is not written into the source. It is attached at release time to one exact build, from
externally verified evidence covering the wallet, the API, the indexer, the network, confirmation, and
reconciliation. The baseline committed in the repository therefore authorizes nothing on purpose, so
that no build can inherit a claim it did not earn.

 The consequence for reading this site: a page describing a protocol action is describing a screen that
exists, not a screen that will work for you. See
 What this release authorizes and
 Why an action is unavailable .

 
## How to check your own build
 Section titled “How to check your own build” 

 

- Open the extension. 

- Go to Settings , then About . 

- Read the version shown there. 

 That number, and the screens you can actually reach, are the authoritative answer for you.

 
## What this site does with that
 Section titled “What this site does with that” 

 Every page carries a footer stating the release it was checked against and the date it was checked.
Anything that could not be verified in the 1.7.5.8 source is stated as unavailable
rather than described. The things that fell into that category are listed on
 Known limitations .

 Edit page Last updated: Nov 11, 2026 

 Previous Holding your own keys Next Install 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path docs/STORE-LISTING.md, docs/PUBLIC-CAPABILITY-SUMMARY.json 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
