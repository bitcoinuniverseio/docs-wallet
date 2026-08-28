# Security model

This page states plainly what protects your funds, what Universe can and cannot do, and which decisions remain yours.

## Where your keys live

Your recovery phrase and private keys are generated in the extension, encrypted with your password, and stored only on your device. They are never sent to Universe or anyone else. Signing happens inside the extension, or on your hardware device for hardware accounts.

## What Universe can do

- Serve blockchain data, asset indexes, and media from Universe-operated infrastructure.
- Block known phishing sites before they load and screen signature requests for scam language.
- Ship releases where each protocol action is enabled only with current, verified end-to-end evidence.

## What Universe cannot do

- Move, freeze, or recover your funds.
- Reverse a confirmed transaction. Nobody can.
- Restore a lost recovery phrase. There is no account, no reset email, no support override. The phrase on your paper is the wallet.

Anyone claiming to be Universe support and asking for your phrase, or offering to reverse a transaction, is committing fraud.

## The defenses in the product

- **Password and auto-lock.** The wallet locks itself after your chosen idle time, from 30 seconds to 4 hours; default 30 minutes, and the lock-time screen recommends 5 minutes. **Lock Immediately** is at the bottom of Settings.
- **Approval on everything.** No connected site can spend or sign without a request you read and accept. See [Connections](../using-wallet/connections.md) and [Reviewing a transaction](../using-wallet/reviewing-a-transaction.md).
- **Asset-aware spending.** Asset-bearing coins never fund ordinary payments. See [Protected outputs](../assets-and-protocols/protected-outputs.md).
- **Request integrity.** An approval is bound to the exact request that opened it; a request that changes after you saw it is blocked as *Request replaced*.
- **Optional hard limits.** Whitelists and spending caps in the Security Dashboard, enforced by the send flow. See [Coin control](../using-wallet/coin-control.md).
- **Raw-data signing off by default.** See [Signing a message](../using-wallet/signing-a-message.md).

## The decisions that stay yours

The product cannot protect the phrase written on your paper, the address you paste, or the request you approve without reading. Its job is to make each of those decisions clear at the moment you take it; the words in the review are chosen so you can explain what will happen before you sign.

## Next

- [Backup](backup.md)
- [If your wallet is compromised](compromised-wallet.md)
