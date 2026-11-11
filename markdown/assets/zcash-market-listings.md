# Zcash market listings | Universe Wallet

Review Zerdinal listings and full token lots with exact total prices, clear quantities, and a separate purchase approval.

- Universe Wallet 
- Assets and protocols 
 
# Zcash market listings

 Universe Wallet’s source supports Zerdinal listings and full-lot purchases of ZRune and ZRC-20
tokens. A full lot moves everything listed on one outpoint in one purchase. It does not split the
lot into partial fills.

 Check your installed build
 This source update is not an extension release. Listing and purchase signing require the installed
build to authorize the corresponding operation. Source tests alone do not make the controls
available. If the wallet reports that an operation is unavailable, keep that restriction in place.
See Which version you are running and
 What this release authorizes .

 
 
## What you are buying
 Section titled “What you are buying” 

 Asset What the lot represents ZRune The listed token balance carried by one outpoint ZRC-20 (zord) One pending transfer inscription evaluated under zord rules ZRC-20 (zecscriptions) One pending transfer inscription evaluated under zecscriptions rules 

 The two ZRC-20 rulesets have separate identities and balances. A matching ticker does not make them
interchangeable. The purchase approval names the selected ruleset.

 
## Read the quantity and total together
 Section titled “Read the quantity and total together” 

 The approval shows Full lot in base units and Total lot price in ZEC or testnet ZEC.
Base units are the token’s smallest units, not necessarily whole tokens. For a token with 18 decimal
places, 100000000000000000000 base units represent 100 tokens. Confirm the token’s decimal places
and lot on the market before approving.

 New total-price lots can have a price smaller than one zatoshi per base unit. The wallet shows their
exact total without inventing a rounded unit price. Existing per-unit listings retain their exact
price per base unit and also show the derived total.

 Review Buyer debit , the seller proceeds, creator payout, platform fee, network fee, change, and
maximum debit. Check the delivery address separately from the address receiving your change.
A signature does not mean the asset has arrived: delivery remains pending until the transaction is
confirmed and indexed.

 
## What a listing signature allows
 Section titled “What a listing signature allows” 

 A listing signature commits one asset outpoint to an exact seller payout. The payout must return
to your connected wallet address. Anyone holding the signature can settle a conforming purchase;
it does not reserve the offer for a particular buyer.

 There is no escrow or service custody. Review the exact amount you will receive, the listed
outpoint and everything it carries, its expiry, and the selected network before signing.

 
## Why an approval can be blocked
 Section titled “Why an approval can be blocked” 

 The wallet refuses an unverifiable asset outpoint, a mismatched account or network, a changed
consensus branch, invalid transaction bytes, or a buyer debit above the approved maximum.
A token purchase must settle the full lot from one outpoint. Partial fills and additional lot
outpoints are refused.

 The wallet verifies its own funding and checks asset claims from Universe-operated services.
The market and indexer establish the token quantity and ruleset. Missing or conflicting evidence
must be resolved before approval; a disabled approve control is not a warning to click through.

 
## Cancellation and expiry
 Section titled “Cancellation and expiry” 

 

- A listing is public. Anyone can settle it while its signature remains valid. 

- Cancellation removes the market offer. It does not revoke a signature already supplied.
A confirmed spend of the listed outpoint invalidates that offer. A positive expiry also limits
the signature; an offer marked No expiry has no expiry block. 

- The ZEC riding on the asset outpoint transfers with it. Consider that value when setting
your selling price. 

 Disconnecting a site does not revoke a previously issued listing signature.

 
## After you approve
 Section titled “After you approve” 

 The wallet checks the request again before signing. Changes to the account, network, site,
reviewed order, transaction, or maximum debit require a fresh approval. Purchase signing touches
only the reviewed buyer inputs and preserves the seller’s authorization and transaction outputs.

 If a submitted purchase has an unknown outcome, retain its execution identity and check its
recorded status before retrying. Do not assume an interrupted page means the transaction failed.

 
## Related
 Section titled “Related” 

 

- What a signature authorizes 

- Connection permissions 

- What this release authorizes 

 Edit page Last updated: Nov 11, 2026 

 Previous Dogecoin marketplace Next Security model 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path backend/shared/utils/zcash-market-settlement.ts, frontend/ui/pages/Approval/components/ZcashSignMarketSettlement/index.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Chain zcash 
 Lifecycle Not released 
 Last verified 2026-09-17 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
