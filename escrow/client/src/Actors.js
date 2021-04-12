import React, {useState} from 'react';

function Actors({lawyerAddress, payerAddress, recipientAddress}) {

  return (
    <div>
      <h2>List of actors</h2>
      <br/>
      Lawyer address: {lawyerAddress}
      <br/>
      Payer address: {payerAddress}
      <br/>
      Recipient address: {recipientAddress}
    </div>
  );
}

export default Actors;
