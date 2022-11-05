import CardLayout from '../components/CardLayout';
import '../styles/CardLayout.css';

interface Account {
    accountType: string
    balanceAmount: number
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
                { accountType: "Checking Account", balanceAmount: 200.00 }, 
                { accountType: "Savings Account", balanceAmount: 100.00 }, 
            ]
        },
        { 
            bankName: "Wells Fargo",
            accounts: [
                { accountType: "Checking Account", balanceAmount: 500.00 }, 
            ]
        },
    ]

    return(
        <div>
            <CardLayout width={500}>
                <div className="heading">
                    <h2>Balances</h2>
                </div>
                {banks !== null && banks.map(bank => (
                    <div>
                        <h3>{bank.bankName}</h3>
                        {bank.accounts !== null && bank.accounts.map(account => (
                            <div>
                                <a>{account.accountType}</a> 
                                <a>${account.balanceAmount}</a>
                            </div>
                        ))}
                    </div>
                ))}
            </CardLayout>
        </div>
    )
}

export default Balance;
