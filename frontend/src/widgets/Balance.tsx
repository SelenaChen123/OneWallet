import '../styles/CardLayout.css';
import CardLayout from '../components/CardLayout';

interface Account {
    accountType: string
    balanceAmount: string
}

interface Bank {
    bankName: string
    accounts: Account[] | null
}

interface Props {
    banks: Bank[] | null
}

function Balance({ banks }: Props) {
    banks = [
        {
            bankName: "Bank of America",
            accounts: [
                { accountType: "Checking Account", balanceAmount: "200.00" },
                { accountType: "Savings Account", balanceAmount: "100.00" },
            ]
        },
        {
            bankName: "Wells Fargo",
            accounts: [
                { accountType: "Checking Account", balanceAmount: "500.00" },
            ]
        },
    ]

    return (
        <div>
            <CardLayout width="25vw">
                <div className="heading">
                    <h2>Balances</h2>
                    <div className="padding">
                        <hr />
                    </div>
                </div>
                <div className="content">
                    {banks !== null && banks.map(bank => (
                        <div>
                            <div className="subheading">
                                <p>{bank.bankName}</p>
                            </div>
                            <div style={{ marginTop: "5%" }}>
                                {bank.accounts !== null && bank.accounts.map(account => (
                                    <div className="col">
                                        <p>{account.accountType}</p>
                                        <p>${account.balanceAmount}</p>
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
