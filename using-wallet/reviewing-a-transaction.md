# Reviewing a transaction

Every signing request, whether it comes from a connected application or from
the wallet's own Send flow, opens the same review screen. Read it top to
bottom; the most important facts come first.

## What the screen shows

1. **Blocking reasons.** If the wallet cannot sign (for example a BIP-110
   block, a failed inventory check or a ChainBloom block), a red card at the
   top names the reason and the confirm button carries the same words. A
   routine confirmation never looks like a blocked one.
2. **Impact.** What you send, what you receive, any amount that goes to other
   recipients (a marketplace or service fee shows here), the net change, the
   reserved coins the transaction spends (coins you froze, locked or reserved)
   and any effect the wallet could not verify. A badge states how sure the
   wallet is: `EXACT`, `ESTIMATED` or `UNKNOWN`. `UNKNOWN` means the wallet
   could not read the outcome; it never looks like a safe state.
3. **Summary.** One short status (`Ready`, `Review` or `Blocked`) with plain
   sentences about what happens. An unknown outcome always reads `Review` or
   `Blocked`.
4. **Warnings.** BIP-110 advisories, decoded risk rows (for example an
   inscription leaving the wallet), ChainBloom carrier checks and address
   reputation. Each card is tinted by severity; a check that is still running
   shows a neutral "Checking" badge.
5. **Details.** Network, destination (the recipient you entered, or the
   largest external output for an application request, labelled "External
   recipient"), amount, one fee card with the rate and whether the fee can
   still change, inputs and outputs, and the full raw PSBT behind "Raw PSBT".

## Words the wallet uses

- **Protected** (Home and Send): bitcoin held inside outputs that also carry
  inscriptions, runes or other assets. The wallet does not spend it as plain
  bitcoin.
- **Reserved coins** (review screen): coins you froze, locked or reserved
  yourself and that this transaction would spend.
- **Spendable**: bitcoin the wallet can send right now.

## Before you sign

- Confirm the active network and account in the header.
- Compare asset, amount, destination and fee with what you asked for.
- Treat `UNKNOWN` and `Review` as a reason to stop and read the details.
- Reject anything you did not request. The application can send a new request.

## Zcash inscriptions

A Zerdinals reveal writes its content through a transaction input. The review
names the input, byte length, and SHA-256 content hash before signing, so an
empty-looking output list cannot hide what will be written permanently. When a
transaction funds a new commit, the wallet rederives that commit from its own
reveal key and refuses an address it could not spend later.

## Next

- [Signing a message](signing-a-message.md)
- [Coin control](coin-control.md)
