# Coin control

This page is for users who want to choose exactly which coins a transaction spends: inspecting outputs, freezing them, ordering them, and consolidating dust.

## Why coins matter

A wallet balance is really a set of discrete coins (UTXOs). Which coins fund a payment affects fees, privacy, and asset safety. Universe automates this safely by default and exposes the controls when you want them.

## The coin inspector

**Settings → Tools → Coin control** opens **Locked asset UTXOs**: every output the wallet holds back from ordinary spending, each labelled with the reason: **Frozen**, **Locked**, **Reserved**, **Inscription**, **Protocol asset**, **CAT asset**, **Rare sat**, or **Provider asset**. Plain spendable coins read **Cardinal BTC**. Freezing an output there excludes it from all automatic selection until you unfreeze it.

## Choosing coins for a transaction

On the [review screen](reviewing-a-transaction.md), the **Funding coins** panel lets you add or remove specific coins before signing. It shows live totals as you choose: inputs, estimated fee, change, and status. **Selection order** controls which coins are drawn first. Coins that must not fund a plain payment are marked and require the **Protected asset confirmation** step to include; see [Protected outputs](../assets-and-protocols/protected-outputs.md).

## Consolidating small coins

Many small coins make future transactions large and expensive. The cleanup tool selects your small plain outputs and merges them back to your own address in one transaction. Run it when fee rates are low; the send screen shows the count and locks the amount to the selected total so the merge cannot become an accidental payment.

## Guardrails that work alongside coin control

The **Security Dashboard** (Settings → Security dashboard) adds optional limits that the send flow enforces:

- **Limits**: a per-transaction cap and a daily send cap.
- **Addresses**: a whitelist, so sends go only to addresses you pre-approved.
- **Activity**: session events and login history, for your own audit.

## What can go wrong

- **A send fails after manual selection.** The selected coins no longer cover amount plus fee, or an input was spent elsewhere; the review screen names the problem, for example *"Fix coin selection"*, and offers a re-check.
- **You froze a coin and forgot.** The coin sits in **Locked asset UTXOs** marked **Frozen** until you release it. Frozen value counts in Total, not in Available.

## Next

- [Fees](../wallet-basics/fees.md)
- [Protected outputs](../assets-and-protocols/protected-outputs.md)
