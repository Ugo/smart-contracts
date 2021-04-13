import React from 'react';

function Values({balance, neededAmount}) {

  return (
    <div>
      <h2>Current value locked in contract</h2>
      {balance}

      <h2>Amount needed in the escrow</h2>
      {neededAmount}
    </div>
  );
}

export default Values;
