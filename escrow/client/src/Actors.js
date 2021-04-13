import React, {useState} from 'react';

function Actors({lawyerAddress, payerAddress, recipientAddress, currentUser}) {

  return (
    <div>
      <h2>Actors</h2>
      <br/>
      <b>Lawyer address:</b> {lawyerAddress}
      <br/>
      <b>Payer address:</b> {payerAddress}
      <br/>
      <b>Recipient address:</b> {recipientAddress}
      <br/><br/>
      <b>Your address:</b> {currentUser}
    </div>
  );
}

export default Actors;
