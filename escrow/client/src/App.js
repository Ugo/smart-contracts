import React, {useEffect, useState} from 'react';
import {getWeb3, getEscrow} from './utils.js';
import Footer from './Footer.js';
import Actors from './Actors.js';
import Values from './Values.js';
import Deposit from './Deposit.js';
import Release from './Release.js';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [escrow, setEscrow] = useState(undefined);
  
  const [lawyerAddress, setLawyerAddress] = useState(undefined);
  const [payerAddress, setPayerAddress] = useState(undefined);
  const [recipientAddress, setRecipientAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [neededAmount, setNeededAmount] = useState(undefined);

  const deposit = async amount => {
    await escrow.methods
      .deposit()
      .send({from: accounts[0], value: amount});
  }

  const release = async amount => {
    await escrow.methods
      .release()
      .send({from: accounts[0]});
  }

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const escrow = await getEscrow(web3);

      // read the values from the smart contract
      const lawyerAddress = await escrow.methods.lawyer().call();
      const payerAddress = await escrow.methods.payer().call();
      const recipientAddress = await escrow.methods.recipient().call();
      const balance = await escrow.methods.balanceOf().call();
      const neededAmount = await escrow.methods.amount().call();
      
      setWeb3(web3);
      setAccounts(accounts);
      setEscrow(escrow);
      setLawyerAddress(lawyerAddress);
      setPayerAddress(payerAddress);
      setRecipientAddress(recipientAddress);
      setBalance(balance);
      setNeededAmount(neededAmount);
      
    };
    init();
  }, []);

  return (
    <div id="app">
     <div>
       Header
      </div>
      <div>
        Main part
      </div>

      <Actors 
        lawyerAddress={lawyerAddress} 
        payerAddress={payerAddress} 
        recipientAddress={recipientAddress}
      />

      <Values 
        balance={balance}
        neededAmount={neededAmount}
      />

      <Deposit 
        deposit={deposit}
      />

      <Release
        release={release}
      />

      <Footer />
    </div>
  );
}

export default App;
