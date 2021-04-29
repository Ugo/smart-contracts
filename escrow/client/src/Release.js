import React, {useState} from 'react';

function Release({release, balance, neededAmount}) {

    const onSubmit = (e) => {
        e.preventDefault();
        release();
    }

    return (

    <form id="release" className="form-inline" onSubmit={(e) => onSubmit(e)}>
        <div className="form-row align-items-center mx-auto">
            <button type="submit" className="btn btn-primary">Release the escrow</button>
        </div>
    </form>
  );
}

export default Release;