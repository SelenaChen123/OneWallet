import React, { useState } from 'react';
import CardLayout from '../components/CardLayout';
import '../styles/CardLayout.css';

interface Account {
    bankName: string
    accountType: string
    balanceAmount: number
}

interface Props {
    accounts: Account[] | null
}

function Balance({ accounts }: Props) {
    return(
        <div>
            <CardLayout width="1000">
                <div className="heading">
                    <h2 className="card__title">Balances</h2>
                </div>
            </CardLayout>
        </div>
    )
}

export default Balance;
