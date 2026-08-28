# Create a wallet

This page walks you through creating a new wallet: a password, a 12-word recovery phrase, a short backup check, and an address type.

## Before you start

- The extension is [installed](install.md).
- Pen and paper, or another offline place to write 12 words. Not a screenshot, not a note app, not a chat with yourself.
- A private moment. The phrase appears on screen once you reveal it.

## Steps

1. Open Universe Wallet and select **Create new wallet**.
2. Create a password. The **Password requirements** card shows what the password still needs. This password unlocks the wallet on this device only; it is not your backup.
3. The wallet generates your **Secret Recovery Phrase**. The words start hidden. Select **Reveal words** when you are ready, and write all 12 words down in order.
4. Check the warning and mean it: *"This phrase is the ONLY way to recover your wallet. Do NOT share it with anyone!"* Anyone who has these words has your funds.
5. Tick **I saved My Secret Recovery Phrase** and select **Continue**.
6. Pass the **Backup quiz**. The wallet asks you to type three of the words from your written backup, for example word #1, word #7, and word #12. The check is not case-sensitive. When the status reads **Backup verified**, select **Continue**.
7. Choose an **Address Type**. The default, **Native Segwit (P2WPKH)**, has the lowest fees for plain bitcoin payments. Pick **Taproot (P2TR)** if you plan to hold or mint Ordinals, Runes, and most protocol assets. You can add more address types later without a new backup.
8. Finish. The wallet opens on Home.

## What success looks like

Home shows **TOTAL BALANCE** of 0 for a fresh wallet, with **Receive**, **Send**, and **History** underneath.

## What can go wrong

- **You lose the paper before verifying.** Start over: create a new wallet and back up the new phrase. Nothing was deposited yet, so nothing is lost.
- **The quiz will not pass.** You are typing from memory or the words are in the wrong order. Read from the paper, in order, and correct the paper if it disagrees with the screen before you continue.
- **You are tempted to store the phrase digitally.** Do not. Malware looks for exactly that. The wallet never asks for the phrase again except when you deliberately restore.

## Next

- [Receive your first bitcoin](first-receive.md)
- [Verify your understanding of backup and restore](../security-and-recovery/backup.md)
