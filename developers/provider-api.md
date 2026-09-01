# Provider API

This page is for developers building web applications that integrate Universe Wallet. It documents the JavaScript provider object the extension injects into pages, with every method, parameter, and return type.

Three rules come before any code:

- Request a connection only in response to a direct user action, such as a click on a button you control. Never request one on page load.
- Never ask a user for their recovery phrase or private key. No integration needs either, and no legitimate flow collects them.
- Signing happens inside the wallet, not in your page. Your application submits a request; the user reads it in Universe Wallet and approves or rejects it there. Treat rejection as a normal outcome and handle it without error noise.

What the user sees and controls on their side of each request is described in [Connections](../using-wallet/connections.md), [Reviewing a transaction](../using-wallet/reviewing-a-transaction.md), and [Signing a message](../using-wallet/signing-a-message.md).

## The provider object

With the extension [installed](../getting-started/install.md), every page gets a `window.tapwallet` object. That name is exact: the provider is called `tapwallet`, not `universe`, so detect it by that name.

```js
if (typeof window.tapwallet !== 'undefined') {
  console.log('Tap Wallet is installed!');
}
```

## Connecting

"Connecting" means asking to see the user's selected account address. It never authorizes spending; every later transaction or message opens its own approval in the wallet, and idle connections [expire on their own](../using-wallet/connections.md).

Provide a button that calls `requestAccounts`, disable the button while the request is pending, and re-enable it when the promise settles:

```js
tapwallet.requestAccounts()
```

## Methods

Every method returns a promise. A request the user rejects makes the promise reject, so wrap calls in `try`/`catch`.

### requestAccounts

```js
tapwallet.requestAccounts()
```

Connect the current account.

**Parameters**

none

**Returns**

- `Promise` - `string[]`: address of current account

**Example**

```js
try {
  let accounts = await window.tapwallet.requestAccounts();
  console.log('connect success', accounts);
} catch (e) {
  console.log('connect failed');
}
> connect success ['tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz']
```

### getAccounts

```js
tapwallet.getAccounts()
```

Get the address of the current account.

**Parameters**

none

**Returns**

- `Promise` - `string`: address of current account

**Example**

```js
try {
  let res = await window.tapwallet.getAccounts();
  console.log(res)
} catch (e) {
  console.log(e);
}
> ["tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz"]
```

### getNetwork

```js
tapwallet.getNetwork()
```

Get the network the wallet is on.

**Parameters**

none

**Returns**

- `Promise` - `string`: the network. `livenet` and `testnet`

**Example**

```js
try {
  let res = await window.tapwallet.getNetwork();
  console.log(res)
} catch (e) {
  console.log(e);
}

> 0
```

### switchNetwork

```js
tapwallet.switchNetwork(network)
```

Switch the network.

**Parameters**

- `network` - `string`: the network. `livenet` and `testnet`

**Returns**

none

**Example**

```js
try {
  let res = await window.tapwallet.switchNetwork("livenet");
  console.log(res)
} catch (e) {
  console.log(e);
}

> 0
```

### getPublicKey

```js
tapwallet.getPublicKey()
```

Get the public key of the current account.

**Parameters**

none

**Returns**

- `Promise` - `string`: publicKey

**Example**

```js
try {
  let res = await window.tapwallet.getPublicKey();
  console.log(res)
} catch (e) {
  console.log(e);
}
> 03cbaedc26f03fd3ba02fc936f338e980c9e2172c5e23128877ed46827e935296f
```

### getBalance

```js
tapwallet.getBalance()
```

Get the BTC balance.

**Parameters**

none

**Returns**

- `Promise` - `Object`:
  - `confirmed` - `number`: the confirmed satoshis
  - `unconfirmed` - `number`: the unconfirmed satoshis
  - `total` - `number`: the total satoshis

**Example**

```js
try {
  let res = await window.tapwallet.getBalance();
  console.log(res)
} catch (e) {
  console.log(e);
}

> {
    "confirmed":0,
    "unconfirmed":100000,
    "total":100000
  }
```

### getInscriptions

```js
tapwallet.getInscriptions(cursor, size)
```

List the inscriptions of the current account, one page at a time.

**Parameters**

- `cursor` - `number`: the position to start listing from, as in the example call `getInscriptions(0, 10)`
- `size` - `number`: how many items to return

**Returns**

- `Promise` - `Object`:
  - `total` - `number`: the total count
  - `list` - `Object[]`:
    - `inscriptionId` - `string`: the id of inscription
    - `inscriptionNumber` - `string`: the number of inscription
    - `address` - `string`: the address of inscription
    - `outputValue` - `string`: the output value of inscription
    - `content` - `string`: the content url of inscription
    - `contentLength` - `string`: the content length of inscription
    - `contentType` - `number`: the content type of inscription
    - `preview` - `number`: the preview link
    - `timestamp` - `number`: the blocktime of inscription
    - `offset` - `number`: the offset of inscription
    - `genesisTransaction` - `string`: the txid of genesis transaction
    - `location` - `string`: the txid and vout of current location

**Example**

```js
try {
  let res = await window.tapwallet.getInscriptions(0,10);
  console.log(res)
} catch (e) {
  console.log(e);
}

> {
  "total":10,
  "list":[
    {
      inscriptionId: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
      inscriptionNumber: 959941,
      address: 'bc1q8h8s4zd9y0lkrx334aqnj4ykqs220ss735a3gh',
      outputValue: 546,
      preview: 'https://ordinals.com/preview/6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
      content: 'https://ordinals.com/content/6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531i0',
      contentLength: 53,
      contentType: 'text/plain;charset=utf-8',
      timestamp: 1680865285,
      genesisTransaction: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531',
      location: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0:0',
      output: '6037b17df2f48cf87f6b6e6ff89af416f6f21dd3d3bc9f1832fb1ff560037531:0',
      offset: 0
    }
  ]
}
```

### sendBitcoin

```js
tapwallet.sendBitcoin(toAddress, satoshis, options)
```

Send BTC. The user reviews and approves the transaction in the wallet before anything is signed or broadcast.

**Parameters**

- `toAddress` - `string`: the address to send
- `satoshis` - `number`: the satoshis to send
- `options` - `object`: (optional)
  - `feeRate` - `number`: the network fee rate

**Returns**

- `Promise` - `string`: txid

**Example**

```js
try {
  let txid = await window.tapwallet.sendBitcoin("tb1qrn7tvhdf6wnh790384ahj56u0xaa0kqgautnnz",1000);
  console.log(txid)
} catch (e) {
  console.log(e);
}
```

### sendInscription

```js
tapwallet.sendInscription(address, inscriptionId, options)
```

Send an inscription.

**Parameters**

- `address` - `string`: the receiver address
- `inscriptionId` - `string`: the id of the inscription
- `options` - `Object`: (optional)
  - `feeRate` - `number`: the network fee rate

**Returns**

- `Promise` - `Object`:
  - `txid` - `string`: the txid

**Example**

```js
try {
  let {txid} = await window.tapwallet.sendInscription("tb1q8h8s4zd9y0lkrx334aqnj4ykqs220ss7mjxzny","e9b86a063d78cc8a1ed17d291703bcc95bcd521e087ab0c7f1621c9c607def1ai0",{feeRate:15});
  console.log("send Inscription 204 to tb1q8h8s4zd9y0lkrx334aqnj4ykqs220ss7mjxzny",{txid})
} catch (e) {
  console.log(e);
}
```

### inscribeTransfer

```js
tapwallet.inscribeTransfer(ticker, amount)
```

Inscribe a BRC-20 TRANSFER inscription.

**Parameters**

- `ticker` - `string`: BRC-20 ticker
- `amount` - `string`: the amount to inscribe

**Returns**

- `Promise` - `void`

**Example**

```js
window.tapwallet.inscribeTransfer("ordi","100");
```

### signMessage

```js
tapwallet.signMessage(msg[, type])
```

Sign a message. The user sees the message text in the wallet and approves the signature there.

**Parameters**

- `msg` - `string`: a string to sign
- `type` - `string`: (optional) `"ecdsa"` | `"bip322-simple"`. Default is `"ecdsa"`

**Returns**

- `Promise` - `string`: the signature

**Example**

```js
// sign by ecdsa
try {
  let res = await window.tapwallet.signMessage("abcdefghijk123456789");
  console.log(res)
} catch (e) {
  console.log(e);
}

> G+LrYa7T5dUMDgQduAErw+i6ebK4GqTXYVWIDM+snYk7Yc6LdPitmaqM6j+iJOeID1CsMXOJFpVopvPiHBdulkE=

// verify by ecdsa
import { verifyMessage } from "@unisat/wallet-utils";
const pubkey = "026887958bcc4cb6f8c04ea49260f0d10e312c41baf485252953b14724db552aac";
const message = "abcdefghijk123456789";
const signature = "G+LrYa7T5dUMDgQduAErw+i6ebK4GqTXYVWIDM+snYk7Yc6LdPitmaqM6j+iJOeID1CsMXOJFpVopvPiHBdulkE=";
const result = verifyMessage(pubkey,message,signature);
console.log(result);

> true


// sign by bip322-simple
try {
  let res = await window.tapwallet.signMessage("abcdefghijk123456789","bip322-simple");
  console.log(res)
} catch (e) {
  console.log(e);
}

> AkcwRAIgeHUcjr0jODaR7GMM8cenWnIj0MYdGmmrpGyMoryNSkgCICzVXWrLIKKp5cFtaCTErY7FGNXTFe6kuEofl4G+Vi5wASECaIeVi8xMtvjATqSSYPDRDjEsQbr0hSUpU7FHJNtVKqw=
```

### pushTx

```js
tapwallet.pushTx(options)
```

Push a transaction.

**Parameters**

- `options` - `Object`:
  - `rawtx` - `string`: rawtx to push

**Returns**

- `Promise` - `string`: txid

**Example**

```js
try {
  let txid = await window.tapwallet.pushTx({
    rawtx:"0200000000010135bd7d..."
  });
  console.log(txid)
} catch (e) {
  console.log(e);
}
```

### signPsbt

```js
tapwallet.signPsbt(psbtHex[, options])
```

Sign a PSBT. This method will traverse all inputs that match the current address to sign.

**Parameters**

- `psbtHex` - `string`: the hex string of psbt to sign
- `options`
  - `autoFinalized` - `boolean`: whether to finalize the psbt after signing, default is true
  - `toSignInputs` - `array`:
    - `index` - `number`: which input to sign
    - `address` - `string`: (at least specify either an address or a publicKey) which corresponding private key to use for signing
    - `publicKey` - `string`: (at least specify either an address or a publicKey) which corresponding private key to use for signing
    - `sighashTypes` - `number[]`: (optional) sighashTypes
    - `disableTweakSigner` - `boolean`: (optional) when signing and unlocking Taproot addresses, the `tweakSigner` is used by default for signature generation. Enabling this allows for signing with the original private key.

**Returns**

- `Promise` - `string`: the hex string of the signed psbt

**Example**

```js
try {
  let res = await window.tapwallet.signPsbt(
    "70736274ff01007d....",
    {
        autoFinalized:false,
        toSignInputs:[
          {
            index: 0,
            address: "tb1q8h8....mjxzny",
          },
          {
            index: 1,
            publicKey: "tb1q8h8....mjxzny",
            sighashTypes: [1]
          },
          {
            index: 2,
            publicKey: "02062...8779693f",
          }
        ]
    }
  );
  console.log(res)
} catch (e) {
  console.log(e);
}

tapwallet.signPsbt("xxxxxxxx",{toSignInputs:[{index:0,publicKey:"xxxxxx",disableTweakSigner:true}],autoFinalized:false})
```

### signPsbts

```js
tapwallet.signPsbts(psbtHexs[, options])
```

Sign multiple PSBTs at once. This method will traverse all inputs that match the current address to sign.

**Parameters**

- `psbtHexs` - `string[]`: the hex strings of psbts to sign
- `options` - `object[]`: the options of signing each psbt
  - `autoFinalized` - `boolean`: whether to finalize the psbt after signing, default is true
  - `toSignInputs` - `array`:
    - `index` - `number`: which input to sign
    - `address` - `string`: (at least specify either an address or a publicKey) which corresponding private key to use for signing
    - `publicKey` - `string`: (at least specify either an address or a publicKey) which corresponding private key to use for signing
    - `sighashTypes` - `number[]`: (optional) sighashTypes

**Returns**

- `Promise` - `string[]`: the hex strings of the signed psbts

**Example**

```js
try {
  let res = await window.tapwallet.signPsbts(["70736274ff01007d...","70736274ff01007d..."]);
  console.log(res)
} catch (e) {
  console.log(e);
}
```

### pushPsbt

```js
tapwallet.pushPsbt(psbtHex)
```

Push a transaction from a psbt.

**Parameters**

- `psbtHex` - `string`: the hex string of psbt to push

**Returns**

- `Promise` - `string`: txid

**Example**

```js
try {
  let res = await window.tapwallet.pushPsbt("70736274ff01007d....");
  console.log(res)
} catch (e) {
  console.log(e);
}
```

## Events

Subscribe with `on` and clean up with `removeListener` when your component unmounts, or handlers pile up across renders.

### accountsChanged

```js
tapwallet.on('accountsChanged', handler: (accounts: Array<string>) => void);
tapwallet.removeListener('accountsChanged', handler: (accounts: Array<string>) => void);
```

`accountsChanged` is emitted whenever the user's exposed account address changes.

### networkChanged

```js
tapwallet.on('networkChanged', handler: (network: string) => void);
tapwallet.removeListener('networkChanged', handler: (network: string) => void);
```

`networkChanged` is emitted whenever the user's network changes.

## Next

- [Connections](../using-wallet/connections.md): what the user grants when they connect, and how access expires
- [Reviewing a transaction](../using-wallet/reviewing-a-transaction.md): the approval screen your requests land on
- [Signing a message](../using-wallet/signing-a-message.md): how message-signing requests are shown and gated
