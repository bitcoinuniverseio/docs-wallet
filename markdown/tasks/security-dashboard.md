# Security dashboard | Universe Wallet

What the security dashboard tracks, what it can tell you, and the limits of what any dashboard can see.

- Universe Wallet 
- Everyday tasks 
 
# Security dashboard

 Intended reader: anyone doing a periodic check of their own setup.
 Goal: knowing whether your wallet’s posture matches what you intended.
 Prerequisites: an unlocked wallet.
 Safety: the dashboard reports. It does not defend. Acting on what it says is the part that matters.

 
## Where it is
 Section titled “Where it is” 

 Settings , then Security . The screen has no protocol gate, so it is present regardless of what
your build authorizes.

 
## What it tracks
 Section titled “What it tracks” 

 

- Recovery status. Whether you have confirmed a backup of your recovery phrase. 

- Login history. When the wallet was unlocked. 

- Session log. What happened during recent sessions. 

- Phishing URL checking. A place to check a URL against the wallet’s phishing policy before you
visit it. 

- Connection risk. Local scoring of your connected sites, with a one-step way to revoke risky
ones. 

 Everything here is computed on your device. None of it is a report sent anywhere.

 
## A monthly ten-minute check
 Section titled “A monthly ten-minute check” 

 

- Open the dashboard and read the recovery status. If it does not say your phrase is backed up,
go to Back up your recovery phrase . 

- Read the login history. Anything you cannot account for is worth investigating. 

- Open Connected sites and remove anything you no longer
use. 

- Check your auto-lock timer is short enough for how you actually work. See
 Locking and passwords . 

- Confirm your paper backup is still where you think it is, and still legible. 

 
## What a dashboard cannot see
 Section titled “What a dashboard cannot see” 

 

- Whether your recovery phrase has been copied. A phrase read from paper leaves no trace anywhere. 

- Whether a signature you gave was a good idea. It can tell you what you signed, not what it
meant. 

- Whether an outstanding partial signature can still be completed by someone. See
 What a signature authorizes . 

- Anything happening in another wallet using the same phrase. 

 A clean dashboard is reassuring and it is not proof. Treat it as one input.

 
## Optional controls worth turning on
 Section titled “Optional controls worth turning on” 

 Universe Wallet includes optional per-transaction and daily spending caps, and an address whitelist.
They are off by default, because most people do not want them and a wallet that demands configuration
before it is safe is a badly designed wallet. If your holdings are significant, they are worth the
five minutes.

 
## Related
 Section titled “Related” 

 

- Security model 

- If your wallet is compromised 

 Edit page Last updated: Nov 11, 2026 

 Previous Hardware wallets Next Locking and passwords 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Settings/SecurityDashboardScreen.tsx 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
