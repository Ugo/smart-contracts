import React from 'react';

function Values({balance, neededAmount}) {

  return (
    <div>
      <h2>Current value locked in contract</h2>
      <br/>
      {balance}

      <h2>Amount needed in the escrow</h2>
      <br/>
      {neededAmount}
    </div>
  );
}

export default Values;
