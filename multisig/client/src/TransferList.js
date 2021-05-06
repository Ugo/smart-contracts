import React from 'react';

function TransferList({transfers, approveTransfer}) {
  return(
    <div>
      <h2>Transfers</h2>
      <table class='table'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Amount</th>
            <th scope='col'>To</th>
            <th scope='col'>approvals</th>
            <th scope='col'>sent</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map(transfer => (
            <tr key={transfer.id}>
              <td>{transfer.id}</td>
              <td>{transfer.amount}</td>
              <td>{transfer.to}</td>
              <td>
                {transfer.approvals}  
                  <button class="btn btn-primary" onClick={() => approveTransfer(transfer.id)}>Approve</button>
              </td>
              <td>{transfer.sent ? 'yes' : 'no'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransferList;
