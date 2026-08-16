# Dogecoin marketplace signing

Universe Wallet supports transaction-specific approval for integrated Dogecoin
marketplace flows. The application supplies a prepared transaction together
with a marketplace intent. The wallet validates the request and signs only the
inputs explicitly assigned to the connected account.

## What the wallet checks

For a supported marketplace request, the wallet verifies that:

- the request identifies the intended marketplace action;
- the transaction matches the approved template;
- the listed signing inputs match the transaction inputs assigned to the
  connected account;
- the signature mode commits to the complete transaction; and
- the returned signed transaction is bound to the same intent and input list.

These checks reduce the risk of signing a substituted transaction or unintended
input. They do not replace your own review of the asset, price, recipient,
network, and fee.

Funding inputs come from Universe-operated Dogecoin Core and Doginals/DRC-20
indexers. Before signing, the wallet recalculates every supplied previous
transaction ID and confirms the exact output value and script. Protocol-bearing
or currently reserved outputs are not offered as ordinary funding. If the
authority is stale, disagrees with Core, or cannot provide enough verified
cardinal DOGE, the transaction remains unavailable.

## Review and sign

1. Start the marketplace action in the connected application.
2. When Universe Wallet opens, verify that the account and Dogecoin network are
   correct.
3. Compare the marketplace summary, amount, recipient, and fee with the order
   you intended to create or accept.
4. Approve only if every field is expected. Otherwise, reject the request.
5. Return to the application and wait for its broadcast or confirmation status.

Do not retry blindly after an error. Refresh the marketplace state first so you
do not approve a stale or duplicate action.
