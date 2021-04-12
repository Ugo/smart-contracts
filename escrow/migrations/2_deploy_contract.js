const Escrow = artifacts.require("Escrow");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(Escrow, accounts[1], accounts[2], 10);
  const escrow = await Escrow.deployed();
  // await web3.eth.sendTransaction({from: accounts[0], to: wallet.address, value: 10000});
};
