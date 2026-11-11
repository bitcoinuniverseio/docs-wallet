# Provider API | Universe Wallet

The JavaScript provider Universe Wallet injects into pages, with the object name, every method, its real parameters and return type, the event API, and the error codes.

- Universe Wallet 
- Developers 
 
# Provider API

 
 
 
 For developers building web applications that integrate Universe Wallet. Every signature below was
read from the extension source at 1.7.5.8. Where the source declares no return type, the runtime shape
is given and marked as such.

 Read Integrating with the wallet first for the rules that come
before any code.

 
## The provider object
 Section titled “The provider object” 

 
 With the extension installed , every page gets a provider object. The
primary name is window.tapwallet .

 
- if ( typeof window . tapwallet !== ' undefined ' ) { 

 console . log ( ' Universe Wallet is available ' ); 

 } 

 
 
 

 The same object is also defined under nine aliases, all non-writable, all pointing at one proxy:

 window . tapwallet // primary 

 window . tap_wallet 

 window . TapWallet 

 window . tapWallet 

 window . Tap_Wallet 

 window . universe 

 window . universewallet 

 window . UniverseWallet 

 window . bitcoinuniverse 

 window . bitcoinUniverse 

 
 
 

 The provider does not occupy window.unisat
 window.unisat is deliberately left alone, because the UniSat extension owns that namespace and may
be installed alongside this one. Detecting Universe Wallet through window.unisat will find the wrong
wallet, or nothing. Use window.tapwallet .

 
 The object carries identity flags you can branch on: isUniverse , isBitcoinUniverse , and
 isTapWallet are all true ; isUniSat and isUnisat are both false . The namespace string reported
by getCapabilities() is bitcoinuniverse .

 
### Waiting for injection
 Section titled “Waiting for injection” 

 The content script sets data-tapwallet-injected="true" and data-universe-wallet-injected="true" on
the &#x3C;html> element, and dispatches an initialization event on window for every alias, twice: once
immediately and once when initialization completes.

 function whenWalletReady ( cb ) { 

 if ( window . tapwallet ) return cb ( window . tapwallet ); 

 window . addEventListener ( ' tapwallet#initialized ' , () => cb ( window . tapwallet ) , { once: true }); 

 } 

 
 cb(window.tapwallet), { once: true });}"> 
 

 Properties whose names begin with an underscore return undefined through the proxy, apart from the
EventEmitter internals. Do not rely on any of them.

 
## Connecting
 Section titled “Connecting” 

 
 Connecting means asking to see the user’s selected account address. It never authorizes spending.
Every later transaction or message opens its own approval, and idle connections
 expire on their own .

 Call requestAccounts from a control the user clicked. Disable the control while the promise is
pending.

 try { 

 const accounts = await window . tapwallet . requestAccounts (); 

 console . log ( ' connected ' , accounts ); 

 } catch ( e ) { 

 console . log ( ' rejected or unavailable ' , e . code , e . message ); 

 } 

 
 
 

 requestAccounts resolves to a string[] holding one address, or an empty array when no account is
available.

 
## Availability, before anything else
 Section titled “Availability, before anything else” 

 Most write methods are gated at build time and default to disabled
 Protocol operations are re-enabled only by a signed authorization attached to a specific build.
 assertProviderMethodReleaseAuthorized runs as the first middleware on every request, and throws for
any method carrying a protocol and operation pair the build did not authorize.
 In a build with no authorization, only the ungated read methods work: getNetwork , getChain ,
 getAccounts , getPublicKey , getInscriptions , getBalance , getBalanceV2 , getBitcoinUtxos ,
 getVersion , getCapabilities , getFeatures , verifyMessageOfBIP322Simple , requestAccounts ,
 switchNetwork , and switchChain .
 Everything else, including sendBitcoin , signPsbt , signMessage , and pushTx , can be
unavailable in the build your user has. Call getCapabilities() and branch on what it reports
rather than assuming. See Capability evidence .

 
 const caps = await window . tapwallet . getCapabilities (); 

 // caps.namespace === 'bitcoinuniverse' 

 // caps.capabilitiesVersion === 2 

 // caps.bitcoin, caps.dogecoin, caps.zcash, caps.atomicals, 

 // caps.protocols, caps.protocolOperations are boolean maps. 

 
 
 

 getFeatures() returns the same object.

 
## Account and network
 Section titled “Account and network” 

 
### requestAccounts
 Section titled “requestAccounts” 

 requestAccounts() 

 Connect the current account. Opens an approval the first time.

 Returns Promise&#x3C;string[]> , holding one address, or empty.

 
### getAccounts
 Section titled “getAccounts” 

 getAccounts() 

 Returns Promise&#x3C;string[]> . Empty when not connected or locked.

 
### disconnect
 Section titled “disconnect” 

 disconnect() 

 Ends this site’s connection.

 Returns Promise&#x3C;undefined> .

 
### getPublicKey
 Section titled “getPublicKey” 

 getPublicKey() 

 Returns Promise&#x3C;string> , the compressed public key of the current account as hex. Returns an
empty string when the wallet is locked.

 
### getNetwork
 Section titled “getNetwork” 

 getNetwork() 

 Returns Promise&#x3C;string> . Exactly one of:

 Value Meaning 'livenet' Bitcoin mainnet 'testnet' Bitcoin Testnet or Testnet4 'unknown' The active chain is Signet, Fractal, Dogecoin, or Zcash 

 This returns a string, never a number
 'unknown' is a real return value, not an error. It means the legacy network name cannot describe the
active chain. Use getChain() when you need to know which chain the wallet is actually on.

 
 const network = await window . tapwallet . getNetwork (); 

 console . log ( network ); 

 // 'livenet' 

 
 
 

 
### switchNetwork
 Section titled “switchNetwork” 

 switchNetwork(network) 

 Parameters 

 

- network string : 'livenet' , 'mainnet' , or 'testnet' . The value 0 is also accepted for
mainnet. 

 Returns Promise&#x3C;string> , the resulting network name, 'livenet' or 'testnet' .

 Rejects with a message naming the supported networks if the value is not one of them. No approval is
shown when the requested network already matches the active one.

 const network = await window . tapwallet . switchNetwork ( ' livenet ' ); 

 console . log ( network ); 

 // 'livenet' 

 
 
 

 
### getChain
 Section titled “getChain” 

 getChain() 

 Returns Promise&#x3C;Object> :

 

- enum string : the chain type, for example BITCOIN_MAINNET 

- name string : the human label, for example Bitcoin or Bitcoin Testnet4 (Beta) 

- network string : 'livenet' or 'testnet' 

 
### switchChain
 Section titled “switchChain” 

 switchChain(chain) 

 Parameters 

 

- chain string : one of BITCOIN_MAINNET , BITCOIN_TESTNET , BITCOIN_TESTNET4 ,
 BITCOIN_SIGNET , FRACTAL_BITCOIN_MAINNET , FRACTAL_BITCOIN_TESTNET , DOGECOIN_MAINNET ,
 DOGECOIN_TESTNET , ZCASH_MAINNET , ZCASH_TESTNET . 

 Returns the same object shape as getChain() .

 
## Balances and holdings
 Section titled “Balances and holdings” 

 
### getBalance
 Section titled “getBalance” 

 getBalance() 

 Marked deprecated in the source. Prefer getBalanceV2 .

 Returns Promise&#x3C;Object> or null :

 

- confirmed number : confirmed satoshis 

- unconfirmed number : unconfirmed satoshis 

- total number : total satoshis 

 
### getBalanceV2
 Section titled “getBalanceV2” 

 getBalanceV2() 

 Returns Promise&#x3C;Object> or null :

 

- available number : satoshis that can fund an ordinary payment 

- unavailable number : satoshis held back, including protected coins 

- total number 

 The split matters. See Protected outputs .

 
### getInscriptions
 Section titled “getInscriptions” 

 getInscriptions(cursor = 0, size = 20) 

 List the inscriptions of the current account, one page at a time.

 Parameters 

 

- cursor number : where to start. Non-negative integer. Default 0 . 

- size number : how many to return. Integer from 1 to 100 . Default 20 . 

 Returns Promise&#x3C;Object> :

 

- total number 

- list Object[] , each carrying inscriptionId , inscriptionNumber , address , outputValue ,
 content , contentLength , contentType , preview , timestamp , offset , genesisTransaction ,
 output , and location . 

 Returns { list: [], total: 0 } when the wallet is locked.

 const page = await window . tapwallet . getInscriptions ( 0 , 20 ); 

 console . log ( page . total , page . list . length ); 

 
 
 

 
### getBitcoinUtxos
 Section titled “getBitcoinUtxos” 

 getBitcoinUtxos(cursor = 0, size = 20) 

 Returns Promise&#x3C;Array> of unspent outputs for the current account.

 
## Sending
 Section titled “Sending” 

 
### sendBitcoin
 Section titled “sendBitcoin” 

 sendBitcoin(toAddress, satoshis, options?) 

 The user reviews and approves in the wallet before anything is signed or broadcast.

 Parameters 

 

- toAddress string : up to 128 characters 

- satoshis number : positive integer 

- options Object , optional:
 

- feeRate number : positive, up to 1000000 

- memo string , optional: up to 256 characters 

- memos string[] , optional: up to 20 entries 

 

 Returns Promise&#x3C;string> , the txid.

 
### sendInscription
 Section titled “sendInscription” 

 sendInscription(toAddress, inscriptionId, options?) 

 Returns Promise&#x3C;string> , the txid.

 
### sendRunes
 Section titled “sendRunes” 

 sendRunes(toAddress, runeid, amount, options?) 

 amount is a string . Returns Promise&#x3C;string> , the txid.

 
### pushTx
 Section titled “pushTx” 

 pushTx(rawtx) 

 Parameters 

 

- rawtx string : the raw transaction hex. Not an object. 

 Returns Promise&#x3C;string> , the txid.

 const txid = await window . tapwallet . pushTx ( ' 0200000000010135bd7d... ' ); 

 
 
 

 
## Signing
 Section titled “Signing” 

 
### signMessage
 Section titled “signMessage” 

 signMessage(text, type) 

 Parameters 

 

- text string : up to 10000 characters 

- type string : 'ecdsa' or 'bip322-simple' . Anything else throws unsupported message type . 

 type is declared as required
 The page provider declares type without an optional marker, so pass it explicitly. Any value other
than 'bip322-simple' takes the ECDSA path, but relying on that is relying on a fallback.

 
 Returns Promise&#x3C;string> , the signature, base64 encoded. For ECDSA it is the standard 65-byte
Bitcoin signed-message form: a one-byte recovery header followed by a 64-byte compact signature.

 const signature = await window . tapwallet . signMessage ( ' abcdefghijk123456789 ' , ' ecdsa ' ); 

 
 
 

 
### verifyMessageOfBIP322Simple
 Section titled “verifyMessageOfBIP322Simple” 

 verifyMessageOfBIP322Simple(address, message, signature, network?) 

 Verification without leaving the wallet. This method is public: it needs no connection, no unlock, and
no approval, and it is not gated by a release authorization.

 Parameters 

 

- address string : up to 128 characters 

- message string 

- signature string : up to 512 characters 

- network number , optional: 0 for mainnet, 1 for testnet. This is the numeric network type,
not the 'livenet' string. 

 Returns Promise&#x3C;number> : 1 when the signature is valid, 0 when it is not. A number, not a
boolean.

 const valid = await window . tapwallet . verifyMessageOfBIP322Simple ( 

 ' bc1p...redacted ' , 

 ' abcdefghijk123456789 ' , 

 ' AkcwRAIgeHUcjr0jODaR7GMM8cenWnIj0MYdGmmr... ' , 

 ); 

 console . log ( valid === 1 ); 

 
 
 

 There is no provider method for verifying an ECDSA signature
 Only BIP-322-simple verification is exposed. To verify an 'ecdsa' signature, verify it yourself,
preferably on your server, with any general-purpose secp256k1 library. The construction is the
standard one: double SHA-256 over the "Bitcoin Signed Message:\n" prefixed and length-delimited
message, recovered against the 65-byte base64 signature.
 Do not install a third-party wallet library to do this. You do not need one, and asking users to trust
an extra wallet dependency for a verification step is a poor trade.

 
 
### multiSignMessage
 Section titled “multiSignMessage” 

 multiSignMessage(messages) 

 Parameters 

 

- messages Array&#x3C;{ text: string, type: string }> : 1 to 20 entries 

 Returns Promise&#x3C;string[]> .

 Every message in the batch is still a separate commitment. See
 What a signature authorizes .

 
### signData
 Section titled “signData” 

 signData(data, type) 

 Signs data that is not readable text.

 Returns Promise&#x3C;string> .

 Throws unless the user has enabled raw data signing in Advanced settings, which is off by default and
requires a typed confirmation. Treat a request for this as unusual and explain to your users, on your
own page, why you need it.

 
## PSBTs
 Section titled “PSBTs” 

 
### signPsbt
 Section titled “signPsbt” 

 signPsbt(psbtHex, options?) 

 Signs the inputs that match the current account.

 Parameters 

 

- psbtHex string : hex, or base64. Up to 8 MiB. 

- options Object , optional:
 

- autoFinalized boolean : whether to finalize after signing. Defaults to true . 

- approvalAction string , optional: only 'listing' is accepted. 

- toSignInputs Array , optional, up to 10000 entries:
 

- index number : which input to sign. Non-negative integer, 0 to 10000, unique within the array. 

- address string : the current account’s address. Supply this or publicKey . 

- publicKey string : the current account’s compressed public key, as hex. Supply this or
 address . 

- sighashTypes number[] , optional: up to 8 entries. 

- disableTweakSigner boolean , optional: when signing Taproot inputs the tweaked signer is used
by default. Enabling this signs with the untweaked key. 

- useTweakedSigner boolean , optional. 

- tapLeafHashToSign string , optional: hex, up to 64 characters. 

 

- contracts Array , optional: up to 100 entries. 

 

 Returns Promise&#x3C;string> , the signed PSBT as hex.

 address and publicKey are different values, and both are checked exactly
 address must equal the connected account’s address. publicKey must equal the connected account’s
compressed public key hex. Passing an address in the publicKey field throws
 invalid public key in toSignInput . Supply one or the other, never an address in both.

 
 const signed = await window . tapwallet . signPsbt ( ' 70736274ff01007d... ' , { 

 autoFinalized: false , 

 toSignInputs: [ 

 { index: 0 , address: ' tb1q...redacted ' }, 

 { index: 1 , address: ' tb1q...redacted ' , sighashTypes: [ 1 ] }, 

 { index: 2 , publicKey: ' 02062...8779693f ' }, 

 ] , 

 } ); 

 
 
 

 
### signPsbts
 Section titled “signPsbts” 

 signPsbts(psbtHexs, options?) 

 Parameters 

 

- psbtHexs string[] : up to 20 entries, 16 MiB total 

- options Object[] , optional: a parallel array, up to 20 entries, each the same shape as
 signPsbt options 

 Returns Promise&#x3C;string[]> .

 
### signAndPushPsbt
 Section titled “signAndPushPsbt” 

 signAndPushPsbt(psbtHex, options?) 

 Returns Promise&#x3C;Object> : psbtHex , rawtx , and txid .

 signAndBroadcastPsbt(psbtHex, options?) is an alias for this method.

 
### pushPsbt
 Section titled “pushPsbt” 

 pushPsbt(psbtHex) 

 Returns Promise&#x3C;string> , the txid.

 
## Protocol methods
 Section titled “Protocol methods” 

 These carry protocol and operation gates, so they can be unavailable in a build. Check
 getCapabilities() first.

 Method Signature inscribeTransfer (ticker: string, amount: string) , returns {inscriptionId, inscriptionNumber, ticker, amount} requestMint (options?: Object) , returns {status, orderId, txid, psbtHex?} requestArc20Mint (options?: Object) , delegates to requestMint isAtomicalsEnabled () , returns boolean getDogecoinMarketplaceAccount () , returns {address, publicKey, network} or null getDogecoinMarketplaceFundingInputs (minimumValueSats: string, maxInputs = 20) signDogecoinMessage (message: string) , returns string signDogecoinMarketplaceAction (preparedAction) getZcashAccount , getZcashBalance () , returns an object or null sendZcashPayment (request) , requires connection, unlock and explicit approval; unavailable in the imported source baseline signZcashTransaction , broadcastZcashTransaction , signZcashMarketListing (request) getVersion () , returns the build version string 

 A method appearing in the generated contract does not establish that it is enabled. In particular,
 sendZcashPayment remains gated by the exact Zcash payment operation’s release evidence. A submitted
payment identifier is not settlement proof. Preserve the original request identity across a lost
response and use the wallet’s recorded status before initiating another payment. See
 Read your activity .

 
## Events
 Section titled “Events” 

 The provider extends Node’s EventEmitter , so on , once , off , addListener ,
 removeListener , and removeAllListeners are all available. The listener limit defaults to 100.
Events are delivered only after initialization completes.

 Clean up when your component unmounts, or handlers pile up across renders.

 Event Payload accountsChanged string[] , the exposed addresses. An empty array on disconnect. networkChanged string , the network name chainChanged the chain object, the same shape getChain() returns connect connection data disconnect , close a provider error object ecosystemChanged ecosystem state 

 const onAccounts = ( accounts ) => { /* re-read state, never cache an address forever */ } ; 

 window . tapwallet . on ( ' accountsChanged ' , onAccounts ); 

 // later 

 window . tapwallet . removeListener ( ' accountsChanged ' , onAccounts ); 

 
 { /* re-read state, never cache an address forever */ };window.tapwallet.on(&#x27;accountsChanged&#x27;, onAccounts);// laterwindow.tapwallet.removeListener(&#x27;accountsChanged&#x27;, onAccounts);"> 
 

 
## Errors
 Section titled “Errors” 

 Rejections carry { code, message } .

 Code Meaning When 4001 User rejected the request The user declined or closed the approval. Also raised when a second approval is requested while one is pending, and when the account or signing context changed while a request was in flight. 4100 Unauthorized The site is not connected, or its permission was revoked while the request was pending. 4900 Disconnected The extension context was invalidated, usually by a reload or an update. -32601 Method not found No handler for that method name. -32600 Invalid request A malformed payload. -32603 Internal error An internal rejection. 

 Validation failures surface as plain Error objects with a descriptive message and no code. So does
 Too many chained approval requests , which is raised above five chained approvals.

 4001 is an ordinary outcome
 A user rejecting a request is not a failure of your integration. Return the interface to its previous
state without an error toast, and let them try again.

 
 
## Related
 Section titled “Related” 

 

- Integrating with the wallet 

- Connection permissions 

- What a signature authorizes 

 Edit page Last updated: Nov 11, 2026 

 Previous Integrating with the wallet Next Integration Studio 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Source path backend/content-script/pageProvider/index.ts, backend/background/controller/provider/controller.ts 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 Last verified 2026-09-06 
 
- Edit this page on GitHub 
- Bitcoin Universe documentation portal 
- Report a documentation error
