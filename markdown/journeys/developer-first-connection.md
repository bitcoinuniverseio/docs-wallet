# Complete a first developer connection using the simulated provider | Universe Wallet

A working integration path: detect, connect, read capabilities, handle rejection - all against the simulated provider, with a downloadable starter.

# Complete a first developer connection using the simulated provider

 ← All journeys 

# Complete a first developer connection using the simulated provider
 About 20 minutes Standard care Wallet 1.7.5.8 · unpublished 
 Outcome: A working integration path: detect, connect, read capabilities, handle rejection - all against the simulated provider, with a downloadable starter.
 Before you start: Basic JavaScript
 Completion looks like: Your code detects the provider, handles connection and rejection, and renders unavailable states from capabilities.
 If something goes wrong: Simulation only; no wallet is touched, nothing to recover.
 
 
## All steps
 
- 
### Detect the provider
 You are trying to Find the wallet's injected namespace. You should see Provider aliases are known: universe, tapwallet, and variants. You do Check for window.universe in the Integration Studio doctor or your code. Before you continue, check Detection says nothing about connection. It only found a candidate provider. What can go wrong Assuming detection implies consent leads to connecting without asking. Reversible? Yes. 
- 
### Simulate connect and rejection
 You are trying to See both outcomes. You should see The studio's fake provider answers requestAccounts with a simulated account, or a rejection. You do Run requestAccounts in the success and rejection scenarios. Before you continue, check Rejection is a normal state your UI must render, not an exception to swallow. What can go wrong Auto-retrying connection prompts train users to approve blindly. Reversible? Yes. 
- 
### Read capabilities and render unavailable states
 You are trying to Gate every feature on what the wallet reports. You should see getCapabilities reports this release authorizes no protocol operations. You do Call getCapabilities in the simulation and render the unavailable branch. Before you continue, check Your UI shows the unavailable state as a first-class outcome, not a disabled button. What can go wrong Promising a send the wallet refuses is a broken product and a support fire. Reversible? Yes. 
- 
### Download the starter and keep the loop
 You are trying to Leave with runnable code. You should see A minimal starter reflecting the contract. You do Download it from the studio and wire it into your app. Before you continue, check The starter runs without any wallet installed. What can go wrong Testing only against a real wallet hides the refusal paths your users will meet. Reversible? Yes. 

 Something wrong on this page? Open a prefilled issue in the documentation repository. What travels: the page path, the release this site describes, and your own words. Nothing about your wallet, transactions, or this browser is included or stored by this site.
 Page not helpful Stale screenshot Version mismatch Unsafe or unclear wording Broken journey 

 
 
 
## Where this page comes from
 Owning repository bitcoinuniverseio/wallet 
 Applicable release Universe Wallet 1.7.5.8 
 Lifecycle Experimental 
 
- Bitcoin Universe documentation portal 
- Report a documentation error
