import React from 'react';

function Values({balance, neededAmount}) {

  return (
    <div>
      <h2>Current value locked in contract</h2>
      {balance}

      <h2>Amount needed in the escrow</h2>
      {neededAmount}

      <h2>Remaining amount needed</h2>
      {neededAmount - balance}
    </div>
  );
}

export default Values;
