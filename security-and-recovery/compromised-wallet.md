# If your wallet is compromised

This page is the emergency procedure. If you believe someone else may control your keys, act in this order and do not stop to investigate first.

## Signs of compromise

- A transaction in History you did not make.
- You typed your recovery phrase into a website, an app, or a message, even once, even "support".
- Malware findings on the machine that holds the wallet.
- A signature request you approved that granted something you did not understand.

## The procedure

1. **Create a clean wallet on a clean device.** A new wallet, new phrase, on a machine you trust. If in doubt about your main computer, use another one. Do not restore the old phrase there; the old phrase is what is burned.
2. **Move plain coins first.** Send the spendable balance to the new wallet at a **Fast** fee. Speed beats fee optimization; you may be racing.
3. **Move assets next.** Transfer inscriptions, tokens, and other assets with their asset-specific flows. [Protected outputs](../assets-and-protocols/protected-outputs.md) explains why they need their own transfers.
4. **Only then clean up.** Disconnect all sites in **Settings → Connected Sites**, run a malware scan, and retire the old wallet. Never reuse the old phrase for anything.

If the key was on a Keystone and only the browser is suspect, funds are safer: the device still had to confirm anything that spent. Move funds anyway if any transaction appeared that the device did not sign knowingly.

## What cannot be done

A transaction that confirmed is permanent. No one, including Universe, can reverse it or seize it back. Recovery services claiming otherwise are a second scam aimed at victims of the first.

## Afterwards

- Report the theft to local police and keep txids; exchanges sometimes freeze deposits flagged by law enforcement.
- If a specific site or request tricked you, report it through [GitHub issues](https://github.com/bitcoinuniverseio/wallet/issues) so its domain can be blocked for others.
- Rebuild habits with the [security model](security-model.md) and a verified [backup](backup.md) of the new phrase.
