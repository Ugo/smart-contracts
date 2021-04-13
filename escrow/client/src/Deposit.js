import React, {useState} from 'react';

function Deposit({deposit}) {
    const [amount, setAmount] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        deposit(amount);
    }

    return (
    <form id="deposit" className="form-inline" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group mb-2">
            <label htmlFor="amount" className="col-sm-1 col-form-label">Amount to deposit</label>
        </div>

        <div class="form-group mx-sm-3 mb-2">
            
            <label for="amountDeposit" class="sr-only">To deposit</label>
            <input 
                id="amount" 
                type="text" 
                className="form-control" 
                onChange={(e) => setAmount(e.target.value)}
            />
        </div>
            
        <button type="submit" className="btn btn-primary mb-2">Deposit</button>
        
    </form>

        

  );
}

export default Deposit;