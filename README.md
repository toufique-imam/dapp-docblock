# Document Verification on blockchain network

This is a DApp example on Ethereum Ropsten testnet using Truffle Framework. It is deployed in Heroku: https://doc-block.herokuapp.com/

We develop a DApp where the users can verify/upload a document.


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

* Fix IPFS bug

# Donation Address

* ETH: 0x801126Bf113Cc43941DC26D043508508948f9127

