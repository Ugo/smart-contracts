import React, {useState} from 'react';

function Deposit({deposit}) {
    const [amount, setAmount] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        deposit(amount);
    }

    return (
    <form id="deposit" className="form-inline" onSubmit={(e) => onSubmit(e)}>
        <div className="form-row align-items-center mx-auto">

            <div className="col-auto">
                <label htmlFor="amount" >Amount to deposit</label>
            </div>

            <div className="col-auto">
                
                <label for="amountDeposit" class="sr-only">To deposit</label>
                <input 
                    id="amount" 
                    type="text" 
                    className="form-control" 
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div class="col-auto">    
                <button type="submit" className="btn btn-primary">Deposit</button>
            </div>
        </div>
    </form>

        

  );
}

export default Deposit;