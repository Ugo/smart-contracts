import React, {useState} from 'react';

function NewTransfer({createTransfer}) {
  const [transfer, setTransfer] = useState(undefined);

  const submit = e => {
    e.preventDefault();
    createTransfer(transfer);
  }

  const updateTransfer = (e, field) => {
    const value = e.target.value;
    setTransfer({...transfer, [field]: value});
  }

  return (
    <div class="alert alert-success">
      <h2>Create transfer</h2>
      <form onSubmit={(e) => submit(e)}>
        <label class="form-label" htmlFor="amount">Amount</label>
        <br />
        <input
          id="amount"
          type="text"
          class="form-control"
          onChange={e => updateTransfer(e, 'amount')}
        />
        <br />
        <label class="form-label" htmlFor="to">To</label>
        <br />
        <input
          id="to"
          type="text"
          class="form-control"
          onChange={e => updateTransfer(e, 'to')}
        />
        <br />
        <button class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default NewTransfer;
