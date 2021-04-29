import React, {useState} from 'react';

function Actors({lawyerAddress, payerAddress, recipientAddress, currentUser}) {

  return (
    <div class="alert alert-success" role="alert">
      <h3>Actors</h3>
      <br/>
      <b>Lawyer address:</b> {lawyerAddress}
      <br/>
      <b>Payer address:</b> {payerAddress}
      <br/>
      <b>Recipient address:</b> {recipientAddress}
      <br/><br/>
      <b>Your address:</b> {currentUser}
      <br/><br/>
      <b>You are the </b> 
      {currentUser == lawyerAddress ? (<b>lawyer</b>) : null }
      {currentUser == payerAddress ? (<b>payer</b>) : null }
      {currentUser == recipientAddress ? (<b>recipient</b>) : null }
      
    </div>
  );
}

export default Actors;
