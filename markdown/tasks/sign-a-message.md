# Sign a message | Universe Wallet

What message signing proves, why the wallet has no screen for composing one yourself, and why raw data signing is off by default.

- Universe Wallet 
- Everyday tasks 
 
# Sign a message

 Intended reader: anyone asked by a site to sign a message.
 Goal: proving you control an address, without agreeing to something you did not read.
 Prerequisites: a connected site that requested a signature.
 Safety: no coin can move from signing a message. That does not make every message safe to sign.

 Message signing is initiated by a site, not by you
 Universe Wallet 1.7.5.8 has no screen for composing your own message and signing it . Message
signing appears only as an approval, in response to a request from a connected application. If you
need to sign an arbitrary message for your own purposes, this wallet does not currently offer that.

 
 
## What a message signature proves
 Section titled “What a message signature proves” 

 That the holder of a private key agreed to a specific piece of text. It is used to prove address
ownership without moving funds: sign in to a service, claim membership of a collection, verify you
control an address to a counterparty.

 No fee is paid. Nothing is broadcast. No coin can move as a direct result. 

 
## Why it still deserves attention
 Section titled “Why it still deserves attention” 

 A message is not always a neutral proof. It can be a statement, an agreement, or a term. What the text
says is what you are agreeing to, and the wallet cannot know which sentences carry weight.

 The wallet scans message text for scam-language patterns and warns you when it finds them, which
helps with the obvious cases and cannot help with a well-written one. Read the text yourself.

 
## The three variants you may see
 Section titled “The three variants you may see” 

 Request What it is What to do Text signing Human-readable text Read every line before approving Raw data signing A hex blob, not readable text Off by default. See below. Multiple message signing Several messages in one request Each one still counts. Read them all, or reject. 

 Raw data signing is off by default, and enabling it needs a typed confirmation
 A blob you cannot read is indistinguishable from something you would never agree to. That is exactly
why it is disabled until you deliberately turn it on. If a site insists you enable it, that is a
reason to leave, not a reason to comply.

 
 
## Steps
 Section titled “Steps” 

 

- The site requests a signature and the approval window opens. 

- Read the origin shown by the wallet. It comes from the browser, not from the page. 

- Read the message text in full. 

- Confirm the address being used is the one you intend to prove ownership of. 

- Approve, or reject. 

 
## Expected result
 Section titled “Expected result” 

 The signature is returned to the requesting site. Nothing appears in your activity, because nothing
happened on the chain.

 
## Refuse when
 Section titled “Refuse when” 

 

- The message is unreadable, or is raw data you did not expect. 

- The message contains terms you would not agree to in writing. 

- The origin is not the site you are on. 

- The request arrived without you doing anything on the page. 

 
## Related
 Section titled “Related” 

 

- What a signature authorizes 

- Phishing and impostors 

 Edit page Last updated: Nov 11, 2026 

 Previous Review a PSBT Next Connect an application 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Approval/components/SignText.tsx, SignData.tsx, MultiSignMessage.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
