# Transaction and Approval Safety Lab | Universe Wallet

Study real transaction and approval scenarios - fees, change, protected outputs, sighash - without signing anything.

# Transaction and Approval Safety Lab

 
# Transaction and Approval Safety Lab
 Every scenario here is a fixture generated from the wallet's own approval view models over synthetic data. Nothing in this laboratory signs, broadcasts, or contacts anything: it exists so that the first time you meet an unusual approval, it is not the first time you have seen its shape.
 

## Every scenario, in plain text
 The same content without JavaScript, for screen readers, search engines, and printing.
 
### When the change does not come back to your wallet
 The wallet's summary: “This sends BTC” (review)
 
- 1 input needs your signature. 
- 2 outputs go outside this wallet; 0 return to you. 
 Inputs: yours (10000 sats);
 Outputs: leaves your wallet (8000 sats); leaves your wallet (1500 sats);
 Fee: 500 sats at 2 sat/vB. No bump capability.

#### What to check
 
- The second output goes to an address that is not yours. 
- Change must return to your wallet. A stranger holding your change can collect it. 

 
### When the wallet cannot summarize a request safely
 The wallet's summary: “Cannot summarize safely” (danger)
 
- The wallet does not have enough decoded PSBT data to make a short summary. 
 Inputs: 
 Outputs: leaves your wallet (8000 sats); change to you (1500 sats);
 Fee: 500 sats at 2 sat/vB. No bump capability.

#### What to check
 
- When decoded data is missing, the wallet refuses to summarize instead of guessing. 
- A request the wallet cannot read is a request you should not sign. 

 
### A payment with several recipients
 The wallet's summary: “This sends BTC” (review)
 
- 1 input needs your signature. 
- 3 outputs go outside this wallet; 0 return to you. 
 Inputs: yours (10000 sats);
 Outputs: leaves your wallet (4000 sats); leaves your wallet (3000 sats); change to you (2500 sats);
 Fee: 500 sats at 2 sat/vB. No bump capability.

#### What to check
 
- A transaction can pay many recipients at once; read every output. 
- Your change is an output too. Anything that is not yours is a payment. 

 
### An ordinary send
 The wallet's summary: “This sends BTC” (review)
 
- 1 input needs your signature. 
- 2 outputs go outside this wallet; 0 return to you. 
 Inputs: yours (10000 sats);
 Outputs: leaves your wallet (8000 sats); change to you (1500 sats);
 Fee: 500 sats at 2 sat/vB. No bump capability.

#### What to check
 
- One output leaves the wallet, one output returns to it as change. 
- The fee is the difference between what goes in and what comes out. 
- Signing only this input at SIGHASH_ALL commits to the whole transaction. 

 
### A rare-sat transfer keeps its protected output first
 The wallet's summary: “This moves protected Rare Sats” (review)
 
- 1 input needs your signature. 
- 1 output goes outside this wallet; 0 return to you. 
- Protected Rare Sats move together in their complete UTXO. Separate cardinal BTC pays the network fee. 
- Protected UTXO: cccccccccccc…cccccccc:2. 
- Protected Rare-Sat composition: The sat you are sending rides on the first input and must lead the outputs unchanged.. 
 Inputs: yours (10000 sats);
 Outputs: leaves your wallet (10000 sats);
 Fee: 500 sats at 2 sat/vB. No bump capability.

#### What to check
 
- Protected assets keep their position: the protected output leads. 
- If a request reorders or splits the protected output, the asset can be lost. 

 
### A PSBT that spends inputs you do not own
 The wallet's summary: “This signs a Bitcoin transaction” (ok)
 
- 1 input needs your signature. 
- 1 output goes outside this wallet; 0 return to you. 
 Inputs: not yours (5000 sats); yours (10000 sats);
 Outputs: leaves your wallet (14000 sats);
 Fee: 1000 sats at 2 sat/vB. No bump capability.

#### What to check
 
- A PSBT can bundle inputs from many owners. 
- Only inputs marked as yours are signed; everything else is someone else’s money in the same transaction. 

 
### What a looser signature commits to
 The wallet's summary: “This signs a Bitcoin transaction” (review)
 
- 1 input needs your signature. 
- 2 outputs go outside this wallet; 0 return to you. 
 Inputs: yours (10000 sats, SIGHASH_SINGLE - commits this input to one output only);
 Outputs: leaves your wallet (8000 sats); change to you (1500 sats);
 Fee: 500 sats at 2 sat/vB. No bump capability.

#### What to check
 
- SIGHASH_SINGLE commits your input to only one output, leaving other outputs free to change. 
- Marketplaces use this for listings. Read which output is yours before signing one. 

 
### An output you did not expect
 The wallet's summary: “This sends BTC” (review)
 
- 1 input needs your signature. 
- 2 outputs go outside this wallet; 0 return to you. 
 Inputs: yours (10000 sats);
 Outputs: leaves your wallet (1000 sats); leaves your wallet (8500 sats);
 Fee: 500 sats at 2 sat/vB. No bump capability.

#### What to check
 
- The largest output of this transaction does not go to the requested recipient. 
- Read outputs from largest to smallest and account for every one. 

 
### An unusually high fee
 The wallet's summary: “This sends BTC” (review)
 
- 1 input needs your signature. 
- 2 outputs go outside this wallet; 0 return to you. 
 Inputs: yours (10000 sats);
 Outputs: leaves your wallet (8000 sats); change to you (1500 sats);
 Fee: 17000 sats at 850 sat/vB - far above the recommended rate. No bump capability.

#### What to check
 
- The fee is what the transaction pays the network, not what the site receives. 
- A fee rate far above the recommended rate is a signal to stop and reread. 

 Something wrong on this page? Open a prefilled issue in the documentation repository. What travels: the page path, the release this site describes, and your own words. Nothing about your wallet, transactions, or this browser is included or stored by this site.
 Page not helpful Stale screenshot Version mismatch Unsafe or unclear wording Broken journey 

 
 Previous Safe simulator Next Screen Atlas 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 
- Bitcoin Universe documentation portal 
- Report a documentation error
