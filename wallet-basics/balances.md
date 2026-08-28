# Balances

This page defines every balance word the wallet uses, so a number is never a mystery.

## The words

- **TOTAL BALANCE** (Home): everything this account holds on the selected network, including coins that are protected or pending. The eye icon hides the number when you are in public.
- **Available** (Send screen): what a plain payment can spend right now.
- **Protected** (Send screen): bitcoin locked inside outputs that also carry inscriptions, BRC-20, runes, or other indexed assets. A plain send never spends it; that is a safety feature, not missing money. The **Unlock** control opens the inspection flow described in [Protected outputs](../assets-and-protocols/protected-outputs.md).
- **Selected** (asset cleanup): during a cleanup merge, the send screen locks to the total of the outputs you selected.
- **Pending**: a transaction seen by the network but not yet confirmed still counts toward TOTAL BALANCE; its coins become spendable per network rules as it confirms.

## Why Available + Protected may not equal Total

Total also counts unconfirmed change and coins you froze, locked, or reserved yourself through [coin control](../using-wallet/coin-control.md). The send screen only counts what this payment may touch.

## Fiat conversion

Amounts convert to USD when a current price is available from Universe services. When no price is available the wallet shows the amount without a fiat figure rather than an invented one.

## What can go wrong

- **Total looks too low.** Check the network and address type first ([Accounts and networks](accounts-and-networks.md)), then History for a transaction you forgot.
- **Available is much lower than Total.** You hold asset-bearing outputs. That is normal for collectors; read [Protected outputs](../assets-and-protocols/protected-outputs.md) before trying to free anything.

## Next

- [Fees](fees.md)
- [Activity](activity.md)
