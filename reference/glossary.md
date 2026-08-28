# Glossary

The words Universe Wallet uses, defined once.

**Account.** One keypair inside a wallet. Accounts in an HD wallet share the same recovery phrase.

**Address type.** The format of your Bitcoin address: Native SegWit (`bc1q`), Nested SegWit (`3`), Taproot (`bc1p`), or Legacy (`1`). All derive from the same phrase.

**Available.** Coin value a plain payment can spend right now.

**Broadcast.** Handing a signed transaction to the network. After broadcast it is public and cannot be edited.

**Cardinal.** A coin that carries no indexed asset; plain bitcoin, safe to spend anywhere.

**Change.** The part of spent coins that returns to your own address. Marked **Back to you** on the review screen.

**Cold wallet.** A watch-only account whose keys live on an offline device. Universe watches and builds; the device signs.

**Confirmation.** A block on top of your transaction. More confirmations, more final.

**Connection.** Permission for one site to see one address and to ask, separately, for signatures. Expires when idle.

**Dust.** An amount too small for the network to relay. The wallet rejects sends below the dust floor.

**Fee rate.** Price of block space in satoshis per virtual byte (sat/vB). You bid; miners choose.

**Frozen / Locked / Reserved.** Coins you or an active flow held out of spending. Listed with reasons in coin control.

**HD wallet.** A wallet where one phrase deterministically produces all accounts and addresses.

**Inscription.** Content written on chain and carried inside a specific coin (Ordinals on Bitcoin, Doginals on Dogecoin, Zerdinals on Zcash).

**Keyring.** Internal name for one wallet secret: a phrase, key, hardware device, or watch-only import.

**Outpoint / UTXO.** One discrete spendable coin: a transaction output not yet spent. Balances are sets of these.

**Protected.** Value locked inside outputs that also carry assets. Never spent by a plain send.

**PSBT.** Partially Signed Bitcoin Transaction, the standard format for building and signing transactions across wallets and devices. The review screen shows the raw PSBT on request.

**RBF.** Replace-by-fee. A replaceable transaction can be re-sent with a higher fee before it confirms.

**Recovery phrase.** The 12 words that are the wallet. Anyone with them has the funds; without them, recovery is impossible.

**Sat / satoshi.** The smallest bitcoin unit; 100,000,000 sats = 1 BTC.

**Watch-only.** An account that can see and build but not sign. See cold wallet.
