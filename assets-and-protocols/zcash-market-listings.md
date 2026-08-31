# Zcash market listings

Universe Wallet implements listing signatures for the Universe market's
signed-order protocol (ZMarket Orders v1): a fixed-price offer to sell a
Zerdinal inscription. This page explains what that one signature does, what
the approval screen shows, and why the wallet sometimes refuses to show it at
all.

## Availability

Market listing signing follows [the release rule](overview.md) like every
other protocol operation. `market-list` sits on the Zerdinals intent list in
[Supported protocols](supported-protocols.md); the generated authorized table
on that page is the only claim about what your build can actually do, and no
release has authorized this operation yet. The build currently served by the
Chrome Web Store is older still and predates Zcash support entirely. Until a
release carries the evidence, a listing request fails closed and names what is
missing.

## One signature, one exact outcome

A listing is a single signature under `SIGHASH_SINGLE | ANYONECANPAY` over a
Zcash transaction digest computed from the listing terms alone. It binds your
asset outpoint to exactly one outcome: any transaction that spends that
outpoint must pay your own address the exact listed price. Everything else
about the final settlement is the buyer's to build, and your signature
deliberately does not constrain it.

There is no escrow and no service custody. The market cannot move your asset,
and equally your signature cannot choose the buyer: anyone holding it can
settle the offer by paying you.

## What the wallet checks

Before the approval opens, the wallet verifies that:

- the request contains exactly the listing terms and optional asset evidence;
  any other field is rejected before anything is reviewed;
- the seller address is the connected account's own Zcash address, and the
  payout script pays that same address, so the wallet never authorizes a sale
  of someone else's asset or a payout to anyone else;
- the network in the terms matches the active wallet chain;
- the pinned consensus branch matches the network's next block, so the
  listing becomes invalid by construction across a network upgrade;
- the price is above the relayable floor, and the platform fee amount and fee
  script are consistent with each other.

## Why the approval can be Blocked

The signature sells everything the listed outpoint carries, so the wallet
requires an asset verdict for that outpoint before it lets you approve:

- an outpoint with no asset verdict blocks the approval, because what the
  signature would sell cannot be shown;
- a verdict that does not carry the listed asset blocks the approval and
  names the mismatch;
- an outpoint carrying more than the listed asset is shown in full, because a
  sale delivers all of it together.

Blocked is not a warning you can click through. The approve button stays
disabled and the screen states the reason in the same words the wallet
enforces.

## What approving means

The approval screen states three consequences, and they are the substance of
what you agree to:

1. **A listing is a public offer.** Anyone can settle it at exactly these
   terms.
2. **Cancellation is advisory.** Cancelling removes the listing from the
   market, but the signature stays valid until the asset moves or the expiry
   block passes. The only certain revocation is transferring the asset to
   yourself.
3. **The ZEC riding on the asset outpoint transfers to the buyer with the
   asset.** Set the price with that in mind.

The screen also shows the exact amount you are paid, the platform fee (paid
by the buyer), the block at which the offer dies, the consensus branch, the
outpoint being committed, and the digest the signature is over.

## After you approve

Approval alone signs nothing. The wallet re-reviews the exact terms after
your approval and before any key material is touched, and checks the
consensus branch against the network again. If the terms no longer match what
you saw, or the asset can no longer be verified, the wallet refuses instead
of signing.

## Next

- [Reviewing a transaction](../using-wallet/reviewing-a-transaction.md)
- [Supported protocols](supported-protocols.md)
