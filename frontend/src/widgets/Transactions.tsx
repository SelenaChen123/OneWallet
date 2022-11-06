import { useState } from "react";
import CardLayout from "../components/CardLayout"
import { TransactionData } from "../types";

interface Props {
    dailyTransactions: TransactionData[];
}

function Transactions({ dailyTransactions }: Props) {
    // dailyTransactions = [
    //     {
    //         date: new Date("2022-11-05T17:00:00"),
    //         transactions: [
    //             {
    //                 bankName: "Bank of America",
    //                 description: "Deposit",
    //                 withdrawal: 0,
    //                 amount: "1000.00"
    //             },
    //             {
    //                 bankName: "PNC",
    //                 description: "Withdrawal",
    //                 withdrawal: 1,
    //                 amount: "200.00"
    //             }
    //         ]
    //     },
    //     {
    //         date: new Date("2022-11-06T17:00:00"),
    //         transactions: [
    //             {
    //                 bankName: "Wells Fargo",
    //                 description: "Withdrawal",
    //                 withdrawal: 1,
    //                 amount: "100.00"
    //             }
    //         ]
    //     }
    // ]

    return (
        <CardLayout width="25vw">
            <div className="heading">
                <h2>Transactions</h2>
                <div className="padding">
                    <hr />
                </div>
            </div>
            <div className="content">
                {dailyTransactions !== null && dailyTransactions.map(dailyTransaction => (
                    <div className="row">
                        <div className="subsubheading">
                            <p>{dailyTransaction.date.toLocaleDateString()}</p>
                        </div>
                        <div style={{ flexGrow: '99' }}>
                            {dailyTransaction.transactions.map(transaction => (
                                <div className="col">
                                    <div>
                                        <div>
                                            <p>{transaction.description}</p>
                                        </div>
                                        <div className="subsubsubheading">
                                            <p>{transaction.bankName}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {transaction.isWithdrawal ? <div className="green"><p>+ ${transaction.amount}</p></div> : <div className="red"><p>- ${transaction.amount}</p></div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </CardLayout>
    )
}

export default Transactions;
