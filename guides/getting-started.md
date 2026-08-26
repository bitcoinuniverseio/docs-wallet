# Getting started

## Before you begin

Use a supported Chromium-based browser and install Universe Wallet only from a
trusted Bitcoin Universe release channel. Check the publisher and extension
identity before importing an existing wallet.

## Create or import a wallet

1. Open Universe Wallet and choose to create a wallet or import an existing one.
2. Follow the on-screen recovery instructions in private.
3. Store the recovery phrase offline. Never photograph it, upload it, or send it
   to another person.
4. Set a strong local password and finish the wallet setup.
5. Confirm that the selected account and network match the application you plan
   to use.

## Connect to an application

1. Open a supported Bitcoin Universe application.
2. Select Universe Wallet when the application asks for a wallet connection.
3. Review the requesting site and account in the extension.
4. Approve only when the origin and requested permissions are expected.

A connection does not authorize every future transaction. Signing and broadcast
requests must still be reviewed separately.

Connections that remain idle expire automatically. Reconnect from the
application when the wallet asks for permission again. The Connected Sites
screen shows the remaining connection lifetime and lets you disconnect a site
immediately.

## Before every approval

- Confirm the active network and account.
- Compare the asset, quantity, recipient, and fee with the action you requested.
- Treat a recipient warning as a reason to compare the full address again. The
  wallet warns when the displayed address is difficult to distinguish from a
  recently used address, and it refreshes the warning whenever the recipient
  changes.
- Reject unexplained inputs, outputs, warnings, or changed terms.
- Never continue because a support account pressures you to act quickly.

If anything differs from the intended action, reject the request and return to
the application. The review screen is described in
[Reviewing a transaction](reviewing-a-transaction.md).

## Explore DROPS and OP_DROP

Version 1.7.5.5 adds the verified DROPS read-only explorer and OP_DROP deploy,
mint, transfer, and explorer tools. These surfaces use the Bitcoin Universe
Inscribe service and its unified production indexer. Review the network,
ticker, amount, recipient, funding output, and fee before approving any
OP_DROP transaction.
