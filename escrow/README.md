# escrow

Simple smart contract acting as an escrow. 
The contract is deployed with the amount that should be locked in the contract. There are three actors involved:
- the lawyer: he deployed the contract and will be the only one able to release the funds
- the payer: he will be the only one who can deposit money in the contract
- the recipient: he will be the only one to receive the amount once the funds are released.

Depending on who is connected and the roles, some actions will be available or not to the user.

This is what the payer will see in the dapp when he connects:
![payer dashboard](https://raw.githubusercontent.com/Ugo/smart-contracts/main/escrow/images/escrow2.png)
He can only deposit more money.

And this is what the lawyer will see in the dapp. He cannot deposit any money, just release the money if the required amount is reached.
![lawyer dashboard](https://raw.githubusercontent.com/Ugo/smart-contracts/main/escrow/images/escrow1.png)

