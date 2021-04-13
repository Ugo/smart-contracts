import React, {useState} from 'react';

function Release({release}) {

    const onSubmit = (e) => {
        e.preventDefault();
        release();
    }

    return (
    <form id="release" onSubmit={(e) => onSubmit(e)}>
        <div className="text-left">
            <button type="submit" className="btn btn-primary">Release the escrow</button>
        </div>
    </form>
  );
}

export default Release;