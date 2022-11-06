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
                </div>
                <div className="content">
                    {banks !== null && banks.map(bank => (
                        <div>
                            <div className="subheading">
                                <h3>{bank.bankName}</h3>
                            </div>
                            {bank.accounts !== null && bank.accounts.map(account => (
                                <div className="subsubheading">
                                    <a>{account.accountType}</a>
                                    <a>${account.balanceAmount}</a>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </CardLayout >
        </div>
    )
}

export default Balance;
