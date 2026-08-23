# Speed, media and large portfolios

Universe Wallet is built so the screen you asked for appears at once and fills
in as data arrives.

## What you see

- The home screen shows your wallet, account and network in one row, your
  balance and actions next, then the assets of the selected protocol.
  Receive and Send carry the accent; History and Buy stay neutral. Activity
  and network context follow; on a wide window they move beside the balance.
- The balance expands into Spendable, Protected and Pending. Protected is
  bitcoin held inside outputs that also carry inscriptions, runes or other
  assets. The Portfolio screen repeats the Spendable and Protected split next
  to the BTC total.
- The protocol picker lists the protocols you hold first ("Your assets"),
  then each group; protocols with nothing held stay reachable but step back.
  Search, arrow keys, Enter and Shift+Enter (pin) work from the keyboard.
- Balances and holdings render from the last known state while a refresh
  runs, and the amount dims until the refresh lands. The wallet never presents
  stale spendable state as fresh.
- Inscriptions, collectibles and token cards load an image sized for their
  slot, not the full on-chain file. A 36 px icon does not download a
  multi-megabyte original.
- Text and JSON inscriptions show a typed card. HTML inscriptions show a
  static preview in lists and open as an interactive document on their
  detail screen.
- Galleries with hundreds or thousands of assets render only the rows near
  your scroll position. Arrow keys move between tiles; your scroll position
  stays put.
- On Save-Data or slow connections the wallet requests smaller images and
  loads less ahead of the viewport.

## Where the media comes from

Every image, poster and thumbnail comes from Universe-operated media
infrastructure. Originals stay exact on chain; display derivatives are
content-hashed and cached by your browser for a year. If the optimized
derivative does not exist yet, the wallet shows the original through the
Universe Ord proxy and the derivative is prepared for the next time.

## If something looks wrong

- A tile that says "Media unavailable" means every source failed; other tiles
  keep loading.
- Pull down on the home screen to refresh balances and holdings. A manual
  refresh always asks the network again.
- Counts that come from the last known portfolio while the service is
  unreachable are dimmed and labelled as last known.
- The "Wallet API unreachable" notice appears only after a health check
  failed. Retry it from the notice; it checks again every minute and backs
  off while the service stays down.
- The filters behind the sliders button above an inscription grid control
  density, sort order, sats visibility and the minimum-sats filter.
