# Signing a message

This page explains what a signature request is, what the wallet shows you, and how to tell a login from a trap.

## What message signing is

A connected site can ask you to sign a text message. The signature proves you control the address; it moves no funds and costs no fee. Sites use it to log you in or to prove ownership. Signing is not sending: the wallet states this on the request itself.

## What the request screen shows

The **Signature request** screen shows:

- the requesting site and the account it will use;
- **You are signing:** the exact message, with its **Request type** and **Message length**;
- a **Signature safety scan**. The wallet reads the message for language commonly used in scams. A clean result reads *"No obvious risky phrases found."*; findings are listed;
- **Copy signature receipt**, a record of what you signed, for your files.

If the message contains language associated with stealing recovery credentials or granting broad access, a warning screen comes first: **Suspicious signing request**. You can reject, or continue only after acknowledging you understand what the signature authorizes.

## Raw data signing is off by default

Some applications ask to sign raw data rather than readable text. This is riskier, because what you sign may not be what you see. Universe keeps this off until you enable it under **Settings → Advanced → Enable sign data**. Even then, every raw-data request shows the payload, a decoded preview when the data is readable, and requires you to type a confirmation phrase, `I only sign what I understand`, before the sign button activates.

## Before you sign

- Confirm the site shown is the site you are using.
- Read the message. A login message names the site and a timestamp or nonce. Be suspicious of messages you cannot read or that mention amounts, approvals, or permissions.
- A legitimate signature request never asks for your recovery phrase, in the message or anywhere else.

## What can go wrong

- **You signed something you now distrust.** A text signature by itself cannot move funds. But if the message resembled a transaction or permission grant, review the site in [Connections](connections.md) and disconnect it.
- **The site rejects your signature.** Usually an account mismatch: the site expected a different address. Switch account and retry.

## Next

- [Connections and permissions](connections.md)
- [Reviewing a transaction](reviewing-a-transaction.md)
