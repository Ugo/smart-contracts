import React, {useEffect, useState} from 'react';
import {getWeb3, getEscrow} from './utils.js';
import Footer from './Footer.js';
import Actors from './Actors.js';
import Values from './Values.js';
import Deposit from './Deposit.js';
import Release from './Release.js';

function App({web3, accounts, escrow}) {
  
  
  // const [escrow, setEscrow] = useState(undefined);
  
  const [lawyerAddress, setLawyerAddress] = useState(undefined);
  const [payerAddress, setPayerAddress] = useState(undefined);
  const [recipientAddress, setRecipientAddress] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [neededAmount, setNeededAmount] = useState(undefined);


  const getBalance = async () => {
    const balance = await escrow.methods.balanceOf().call();
    setBalance(balance);
  }

  const deposit = async amount => {
    await escrow.methods
      .deposit()
      .send({from: accounts[0], value: amount});
    getBalance();
  }

  const release = async amount => {
    await escrow.methods
      .release()
      .send({from: accounts[0]});
  }

  useEffect(() => {
    const init = async () => {
      const escrow = await getEscrow(web3);

      // read the values from the smart contract
      const lawyerAddress = await escrow.methods.lawyer().call();
      const payerAddress = await escrow.methods.payer().call();
      const recipientAddress = await escrow.methods.recipient().call();
      const balance = await escrow.methods.balanceOf().call();
      const neededAmount = await escrow.methods.amount().call();
      
      setLawyerAddress(lawyerAddress);
      setPayerAddress(payerAddress);
      setRecipientAddress(recipientAddress);
      setBalance(balance);
      setNeededAmount(neededAmount);
      
    };
    init();
  }, []);

  return (
    <div>
     
      <div className="text-center">
        <h1>Escrow contract</h1>
      </div>
      
      <div class="container">
        <div class="row align-items-start">
          <div class="col">
            <Actors 
              lawyerAddress={lawyerAddress} 
              payerAddress={payerAddress} 
              recipientAddress={recipientAddress}
              currentUser={accounts}
            />
          </div>
          <div class="col">
            <Values 
              balance={balance}
              neededAmount={neededAmount}
            />
          </div>
        </div>
      </div>

      <br/>
      {accounts == payerAddress ? (
        <Deposit 
          deposit={deposit}
        />
        ) : null }
      

      {accounts == lawyerAddress ? (
        <Release
          release={release}
          balance={balance}
          neededAmount={neededAmount}
        />
        ) : null }

      <br />
      <Footer />
    </div>
  );
}

export default App;
