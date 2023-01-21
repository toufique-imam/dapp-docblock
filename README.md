## Check new repo for document verification which uses new ethereum 2.0 and stacks
- https://github.com/toufique-imam/certificate-verifiation

# Document Verification on blockchain network
---

[![GitHub Stars](https://img.shields.io/github/stars/toufique-imam/dapp-docblock?style=social)](https://github.com/toufique-imam/dapp-docblock)
[![download](https://img.shields.io/github/downloads/toufique-imam/dapp-docblock/total.svg)](https://github.com/toufique-imam/dapp-docblock)
![visitors](https://visitor-badge.glitch.me/badge?page_id=toufique-imam/dapp-docblock)

---
This is a DApp example on Ethereum Ropsten testnet using Truffle Framework. It is deployed in Heroku: https://doc-block.herokuapp.com/

We developed a DApp where the users can verify/upload a document.


# Preconditions to development

This dapp is based on the official tutorial to get start with Truffle Framework: http://truffleframework.com/tutorials/pet-shop and official tutorial to deploy on ropsten network: http://truffleframework.com/tutorials/using-infura-custom-provider.

You need to pay attention to configure MetaMask and make sure you have enough ether in your account to do the deployment and use the dapp.

# Deployment on Heroku

* npm install -g truffle
* npm install
* Configure settings variables to ropsten in truffle.js file:
  * var infura_apikey = "you need to register in Infura for an Access Token.";
  * var mnemonic = "< twelve words you can find in metamask/settings/reveal seed words >";
  * var address = "ropsten address with ether";
* herokudeploy.bat

# Deployment on local
* delete bs-config.js
* npm install -g truffle
* npm install
* npm start

# TODO:

* migrate to goerli
* check functions working

# Donation Address

* ETH: 0x801126Bf113Cc43941DC26D043508508948f9127

