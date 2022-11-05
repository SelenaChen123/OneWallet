import React, { useState } from 'react';
import '../styles/Balance.css';

interface Props {
    balance: number
}

function Balance({ balance }: Props) {
    const [bal, setBal] = useState(0)

    return(
        <div className="card">
            <a>Balance: {balance}</a>
            <button onClick={() => setBal(bal + 1)}>{bal}</button>
        </div>
    )
}

export default Balance;
