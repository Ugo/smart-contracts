const { expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require("chai");
const { ethers, waffle} = require("hardhat");
const provider = waffle.provider;

describe('Wallet contract', function() {
    let Wallet;

    beforeEach(async function() {
      Wallet = await ethers.getContractFactory("Wallet");
      [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

      // deploy with multiple addresses and a quorum
      wallet = await Wallet.deploy([addr1.address, addr2.address, addr3.address], 2);

      // TODO: learn  how to make a simple transaction here
      // await web3.eth.sendTransaction({from: accounts[0], to: wallet.address, value: 1000});
    });


    describe("Basic tests", function () {
      it('should have correct approvers and quorum', async () => {
        const approvers = await wallet.getApprovers();
        const quorum = await wallet.quorum();

        expect(approvers.length).to.equal(3)
        expect(approvers[0]).to.equal(addr1.address)
        expect(approvers[1]).to.equal(addr2.address)
        expect(approvers[2]).to.equal(addr3.address)
        expect(quorum.toNumber()).to.equal(2)
      });

      it('should create transfers', async () => {
        await wallet.connect(addr1).createTransfer(100, addrs[4].address);
        const transfers = await wallet.getTransfers();
        expect(transfers.length).to.equal(1)
        expect(transfers[0].id).to.equal(0)
        expect(transfers[0].amount).to.equal(100)
        expect(transfers[0].to).to.equal(addrs[4].address)
        expect(transfers[0].approvals).to.equal(0)
        expect(transfers[0].sent).to.equal(false)
      });

      it('should NOT create transfers if sender is not approved', async () => {
        await expect (
          wallet.connect(addrs[4]).createTransfer(100, addrs[5].address)
        ).to.be.revertedWith("Only approver allowed")
      });

      it('should increment approvals', async () => {
        await wallet.connect(addr1).createTransfer(100, addrs[4].address)
        await wallet.connect(addr1).approveTransfer(0)
        const transfers = await wallet.getTransfers();

        // check that all is correct
        expect(transfers[0].approvals).to.equal(1)
        expect(transfers[0].sent).to.equal(false)

        // should be equal to 1000 not 0
        expect(await provider.getBalance(wallet.address)).to.equal(0);
      });


      // TODO: next tests to perform on the contract
      it('should send transfer if quorum reached', async () => {});

      it('should NOT approve transfer if sender is not approved', async () => {});

      it('should NOT approve transfer if transfer is already sent', async () => {});

      it('should NOT approve transfer twice', async () => {});


    });
});
