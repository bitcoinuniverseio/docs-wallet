# Activity

This page explains the History screen and every state a transaction can be in.

## The History screen

Open it from Home with **History**. Each row reads **Receive** or **Send** with the counterparty address and amount. The panel above the list searches by txid or address, filters, and can **Copy list** for your records. An account with no transactions says so and offers **Receive**.

## Transaction states

- **Pending**: broadcast and seen by the network, waiting for a block. Normal duration ranges from seconds to hours depending on the fee; see [Fees](fees.md).
- **Confirmed**: included in a block. Each additional block on top adds a confirmation. Small amounts are fine at 1; treat large amounts as final after 6 on Bitcoin.
- **Replaced**: an RBF transaction you re-sent with a higher fee superseded this one. Only the replacement can confirm; the amounts were never spent twice.
- **Dropped**: the network forgot an unconfirmed transaction, usually after a long wait at a low fee. The coins remain yours and become spendable again.
- **Failed**: the transaction was rejected at broadcast. Nothing was spent.

The wallet does not mark a transaction failed just because one data source is briefly unreachable; it reports what it can verify and keeps checking.

## Opening a transaction

Select a row for the full record, or use Settings → Tools → **Transaction inspector** to decode any transaction: inputs, outputs, fees, protocol effects, and risk signals. The success screen after sending links the block explorer for an independent view.

## What can go wrong

- **A payment someone sent is not listed.** Confirm the exact address and network with the sender. See [Receive](../getting-started/first-receive.md).
- **A pending send you regret.** If it was RBF, you cannot cancel outright, but you can replace it before confirmation. A confirmed transaction is permanent; nobody, including Universe, can reverse it.
- **History will not load.** The wallet shows the error and a **Retry**; see [Troubleshooting](../troubleshooting/README.md) for network issues.

## Next

- [Fees and RBF](fees.md)
- [Transaction review](../using-wallet/reviewing-a-transaction.md)
