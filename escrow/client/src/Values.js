import React from 'react';

function Values({balance, neededAmount}) {

  return (
    <div class="alert alert-success" role="alert">
      <h3 class="alert-heading">Values in contract</h3>

      <b>Current value locked in contract: </b> {balance}<br/>
      <b>Amount needed in the escrow: </b> {neededAmount}<br/>
      <b>Remaining amount needed: </b> {neededAmount - balance}
    </div>
  );
}

export default Values;
