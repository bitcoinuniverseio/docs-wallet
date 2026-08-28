# Known limitations

Current, honest limits of Universe Wallet 1.7.5.8. Each is stated with its practical effect.

- **Ledger and Trezor are not connectable yet.** The product lists them as coming soon. Keystone is the supported hardware integration; other signers work through the [watch-only flow](../security-and-recovery/watch-only.md).
- **The hardware wallet feature is marked experimental** in the product. Verify addresses on the device and start with small amounts.
- **Protocol actions depend on release evidence.** An action whose end-to-end evidence is not current in your release is hidden or shown as unavailable, with the reason, even though the code exists. This is deliberate; see [the release rule](../assets-and-protocols/overview.md).
- **Fiat display depends on a current Universe price source.** When no current price is available, amounts show without a fiat figure rather than with a stale or third-party number.
- **English only** for now. The interface is built for translation, but no other language ships yet.
- **12-word phrases are generated at creation.** Longer phrases from other wallets import fine; new wallets are 12 words.
- **Settings do not travel with the phrase.** Contacts, labels, frozen coins, limits, and connected sites are device-local. After a [restore](../security-and-recovery/restore.md), re-create them.
- **A wallet cannot make chain data private.** Addresses and transactions are public by nature; see [Privacy](../security-and-recovery/privacy.md).

Report anything missing from this list through [support](../support/README.md); an undocumented limitation is treated as a bug in the documentation.
