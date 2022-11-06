import CardLayout from '../components/CardLayout';
import { AccountData } from '../types';
import { IconContext } from "react-icons";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import CloseWidget from '../components/CloseWidget';
import { showMoney } from "../utils";

interface Props {
    accountData: AccountData[];
    darkMode: boolean;
    editMode: boolean;
    closeSection: () => void;
}

function Balance({ accountData, darkMode, editMode, closeSection }: Props) {
    return (
        <div>
            <CardLayout width="40vw" darkMode={darkMode}>
                <div className="heading">
                    <IconContext.Provider value={{ className: "icon" }}><MdOutlineAccountBalanceWallet /></IconContext.Provider>
                    <h2>Balances</h2>

                    {editMode && <CloseWidget closeSection={closeSection} />}
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
                                        <p>{showMoney(account.balance)}</p>
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
