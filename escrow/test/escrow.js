const { expectRevert } = require('@openzeppelin/test-helpers');
const Escrow = artifacts.require('Escrow');

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('Escrow', (accounts) => {
    let escrow;
    const [lawyer, payer, recipient] = accounts;

    // by default the contract is deployed by the first account (lawyer here) 
    // who will become the admin of the contract
    beforeEach(async () => {
      escrow = await Escrow.new(payer, recipient, 1000);
    });

    it('should deposit', async () => {
      await escrow.deposit({from: payer, value: 900});
      const escrowBalance = parseInt(await web3.eth.getBalance(escrow.address));
      assert(escrowBalance === 900);
    });

    it('should NOT deposit if transfer exceed total escrow amount', async () => {
      await expectRevert(
        escrow.deposit({from: payer, value: 1001}),
        'Cannot send more than the escrow amount'
      );
    });

    it('should NOT release since releaser is not lawyer', async () => {
      await escrow.deposit({from: payer, value: 1000});
      await expectRevert(
        escrow.release({from: recipient}),
        'Only lawyer can release'
      );
    });

    it('should NOT release since balance is too low', async () => {
      await escrow.deposit({from: payer, value: 900});
      const escrowBalance = parseInt(await web3.eth.getBalance(escrow.address));
      assert(escrowBalance === 900);
      await expectRevert(
        escrow.release({from: lawyer}),
        'Cannot send the funds before full amount is reached'
      );
    });

    it('should release the funds', async () => {
      await escrow.deposit({from: payer, value: 1000});
      const initialRecipientBalance = web3.utils.toBN(
        await web3.eth.getBalance(recipient)
      );
      await escrow.release({from: lawyer});
      const finalRecipientBalance = web3.utils.toBN(
        await web3.eth.getBalance(recipient)
      );
      assert(finalRecipientBalance.sub(initialRecipientBalance).toNumber() === 1000);
    });

    it('should deposit in multiple transactions and the release the funds', async () => {
      await escrow.deposit({from: payer, value: 300});
      await escrow.deposit({from: payer, value: 400});
      await escrow.deposit({from: payer, value: 300});
      const initialRecipientBalance = web3.utils.toBN(
        await web3.eth.getBalance(recipient)
      );
      await escrow.release({from: lawyer});
      const finalRecipientBalance = web3.utils.toBN(
        await web3.eth.getBalance(recipient)
      );
      assert(finalRecipientBalance.sub(initialRecipientBalance).toNumber() === 1000);
    });
});