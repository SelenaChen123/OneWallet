import CardLayout from "../components/CardLayout"
import { TransactionData } from "../types";
import { IconContext } from "react-icons";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";

interface Props {
    dailyTransactions: TransactionData[];
}

function Transactions({ dailyTransactions }: Props) {
    return (
        <CardLayout width="40vw">
            <div className="heading">
                <IconContext.Provider value={{ className: "icon" }}><HiOutlineArrowsRightLeft /></IconContext.Provider>
                <h2>Transactions</h2>
            </div>
            <div className="padding">
                <hr />
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
