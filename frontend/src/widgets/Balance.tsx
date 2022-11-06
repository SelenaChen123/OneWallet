import '../styles/CardLayout.css';
import CardLayout from '../components/CardLayout';
import { AccountData } from '../types';
import { IconContext } from "react-icons";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

interface Props {
    accountData: AccountData[];
}

function Balance({ accountData }: Props) {
    // banks = [
    //     {
    //         bankName: "Bank of America",
    //         accounts: [
    //             { accountType: "Checking Account", balanceAmount: "200.00" },
    //             { accountType: "Savings Account", balanceAmount: "100.00" },
    //         ]
    //     },
    //     {
    //         bankName: "Wells Fargo",
    //         accounts: [
    //             { accountType: "Checking Account", balanceAmount: "500.00" },
    //         ]
    //     },
    // ]

    return (
        <div>
            <CardLayout width="25vw">
                <div className="heading">
                    <IconContext.Provider value={{ className: "icon" }}><MdOutlineAccountBalanceWallet /></IconContext.Provider>
                    <h2>Balances</h2>
                </div>
                <div className="padding">
                    <hr />
                </div>
                <div className="content">
                    {accountData.map(bank => (
                        <div>
                            <div className="subheading">
                                <p>{bank.bankName}</p>
                            </div>
                            <div style={{ marginTop: "5%" }}>
                                {bank.accounts !== null && bank.accounts.map(account => (
                                    <div className="col">
                                        <p>{account.accountType}</p>
                                        <p>${account.balance}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </CardLayout >
        </div>
    )
}

export default Balance;
