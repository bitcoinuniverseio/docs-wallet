# Connection permissions | Universe Wallet

What a connected site is granted, the five things it is never granted, and how the idle window ends access on its own.

- Universe Wallet 
- How it works 
 
# Connection permissions

 Connecting a site is the smallest permission in the product, and it is routinely mistaken for the
largest one. It is worth being precise about.

 
 Being connected is permission to ask . It is never permission to sign . Every
signature is its own screen, every time, for the life of the connection.
 

 
## Granted
 Section titled “Granted” 

 

- One address, on one network. Not your wallet, not your accounts, not your other networks. The
one you selected when you approved. 

- The public data at that address: balance, assets, history. All of this is public on the chain
already, and anyone could read it without asking you. 

- The right to put a signature request in front of you. 

 
## Never granted
 Section titled “Never granted” 

 

- Your recovery phrase. 

- Your private keys. 

- The ability to move a coin without a fresh approval. 

- Your other accounts and other networks. 

- The contents of the pages you visit. The wallet reads the origin the browser reports, not the page. 

 
## The origin is what the browser says it is
 Section titled “The origin is what the browser says it is” 

 The approval screen shows the origin the browser reports, not a name the page chose for itself. A page
can print any brand it likes in its own body. It cannot change the origin line in the wallet. When you
are checking whether you are on the real site, that line is the one to read.

 
## How access ends
 Section titled “How access ends” 

 You choose an idle window when you connect. Options are 24 hours, 7 days, 30 days, which is the
default, or until you disconnect.

 It is an idle window, not an age limit. Each time you use the site, the window restarts. A site you
use every day never expires on its own; a site you tried once in March is gone by April.

 When the window passes, access ends. The site has to ask again from the beginning, and you get the
full approval screen again.

 
## Ending it yourself
 Section titled “Ending it yourself” 

 Open Connected sites . You can see every connection, what each one can read, when it was last used,
and end any of them, or all of them at once. A site that lost access has to start over.

 
## What disconnecting does not do
 Section titled “What disconnecting does not do” 

 Disconnecting stops a site from asking for anything new. It does not:

 

- reverse a transaction you already approved, 

- revoke a signature you already gave, including a partial signature that someone can still complete
(see What a signature authorizes ), 

- undo an approval on the chain. 

 If you are disconnecting because something went wrong, disconnecting is the second step. The first is
 If your wallet is compromised .

 
## Related
 Section titled “Related” 

 

- Connect an application 

- Manage connections 

- Provider API 

 Edit page Last updated: Nov 11, 2026 

 Previous What a signature authorizes Next Backup and recovery 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path frontend/ui/pages/Approval/components/Connect.tsx, frontend/ui/pages/ConnectedSites 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-01 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
