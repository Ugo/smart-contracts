import React, {useState} from 'react';

function Deposit({deposit}) {
    const [amount, setAmount] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        deposit(amount);
    }

    return (
    <form id="deposit" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group row">
            <label htmlFor="amount" className="col-sm-4 col-form-label">Amount</label>
            <div className="col-sm-8">
            <div className="input-group mb-3">
                <input 
                id="amount" 
                type="text" 
                className="form-control" 
                onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            </div>
        </div>
        <div className="text-right">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    </form>
  );
}

export default Deposit;