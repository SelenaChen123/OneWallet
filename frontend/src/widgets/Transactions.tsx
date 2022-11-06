import { useState } from "react";
import CardLayout from "../components/CardLayout"

interface Transaction {
    bankName: string
    date: Date
    description: string
    withdrawal: number
    amount: number
}

interface Props {
    transactions: Transaction[] | null
}

function Transactions({ transactions }: Props) {
    transactions = [
        {
            bankName: "Bank of America",
            date: new Date(),
            description: "Account got hacked.",
            withdrawal: 0,
            amount: 400.00
        }
    ]

    return (
        <CardLayout width="25vw">
            <div className="heading">
                <h2>Transactions</h2>
            </div>
            {transactions !== null && transactions.map(transaction => (
                <div>
                    <a>{transaction.date.getMonth()}</a>/<a>{transaction.date.getDay()}</a>
                    <a>{transaction.bankName}</a>
                    <a>{transaction.description}</a>
                    {transaction.withdrawal === 1 ? <a>+</a> : <a>-</a>} <a>{transaction.amount}</a>
                </div>
            ))}
        </CardLayout>
    )
}

export default Transactions;
