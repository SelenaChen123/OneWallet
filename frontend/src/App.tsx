import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { AuthButton } from './AuthButton';
import './styles/App.css';
import { AppData, BillData, CreditScoreData, RawAppData, RawBillData, RawCreditScoreData, RawTransactionData, TransactionData } from './types';
import SideBar from './SideBar';
import Balance from './widgets/Balance';
import Bills from './widgets/Bills';
import Transactions from './widgets/Transactions';
import CreditScores from './widgets/CreditScores';
import FinancialAdvisors from './widgets/FinancialAdvisors';

export function preprocessData(data: RawAppData): AppData {
  function processBill(billsData: RawBillData[]): BillData[] {
    return billsData.map(billData => ({ ...billData, dueDate: new Date(billData.dueDate) }));
  }
  function processTransaction(transactionsData: RawTransactionData[]): TransactionData[] {
    return transactionsData.map(transactionData => ({ ...transactionData, date: new Date(transactionData.date) }));
  }
  function processCreditScore(creditScoresData: RawCreditScoreData[]): CreditScoreData[] {
    return creditScoresData.map(creditScoreData => ({ ...creditScoreData, reportDate: new Date(creditScoreData.reportDate) }));
  }

  const billData = processBill(data.billData);
  const transactionData = processTransaction(data.transactionData);
  const creditScoreData = processCreditScore(data.creditScoreData)
  return { ...data, billData, transactionData, creditScoreData };
}

export const allSections = ["Balances", "Transactions", "Bills", "Scheduled Payments", "Credit Scores", "Financial Advisors"];

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [data, setData] = useState<AppData | null>(null)
  const [darkMode, setDarkMode] = useState(false);
  const [activeSections, setActiveSections] = useState(allSections);
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://hacknc2022ast-api`,
          scope: "read:bankinfo",
        });
        console.log('2')

        const response = await fetch(`http://localhost:5000/api/info`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        console.log(data);
        setData(preprocessData(data));
      } catch (e) {
        console.log((e as any).message);
      }
    };
    if (isAuthenticated) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, isLoading, isAuthenticated])

  if (!isAuthenticated) {
    return <AuthButton isLogin={true} />
  }

  if (isLoading || data === null) {
    return <div>Loading...</div>
  }

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = "radial-gradient(#2A5470, #4C4177)"
    } else {
      document.body.style.background = "radial-gradient(#77EED8, #9EABE4)"
    }
  }, [darkMode])

  if (!isAuthenticated) {
    return <AuthButton isLogin={true} />
  }

  // const accountData = [
  //   {
  //     bankName: "Bank of America",
  //     accounts: [
  //       { accountNumber: "12341234", accountType: "Checking Account", balance: 20000 },
  //       { accountNumber: "12341243", accountType: "Savings Account", balance: 10000 },
  //     ]
  //   },
  //   {
  //     bankName: "Wells Fargo",
  //     accounts: [
  //       { accountNumber: "fdasasdf", accountType: "Checking Account", balance: 50000 },
  //     ]
  //   },
  // ]

  // const dailyTransactions = [
  //   {
  //     date: new Date("2022-11-05T17:00:00"),
  //     transactions: [
  //       {
  //         accountNumber: "asdffdsa",
  //         bankName: "Bank of America",
  //         description: "Deposit",
  //         isWithdrawal: false,
  //         amount: 100000
  //       },
  //       {
  //         accountNumber: "123476134",
  //         bankName: "PNC",
  //         description: "Withdrawal",
  //         isWithdrawal: true,
  //         amount: 20000
  //       }
  //     ]
  //   },
  //   {
  //     date: new Date("2022-11-06T17:00:00"),
  //     transactions: [
  //       {
  //         accountNumber: "asdf7890",
  //         bankName: "Wells Fargo",
  //         description: "Withdrawal",
  //         isWithdrawal: true,
  //         amount: 10000
  //       }
  //     ]
  //   }
  // ]

  // const billsTimeline = [
  //   {
  //     dueDate: new Date("2022-12-01T17:00:00"),
  //     bills: [
  //       { description: "Rent", amountDue: 20000, isPaid: false }
  //     ]
  //   },
  //   {
  //     dueDate: new Date("2023-01-01T17:00:00"),
  //     bills: [
  //       { description: "Groceries", amountDue: 8000, isPaid: true },
  //       { description: "Netflix Subscription", amountDue: 1000, isPaid: false },
  //       { description: "Dinner", amountDue: 2000, isPaid: true },
  //     ]
  //   }
  // ]

  // const creditScores = [
  //   {
  //     reportDate: new Date("2022-11-05T17:00:00"),
  //     creditScore: 850,
  //     reportingAgency: "FICO"
  //   },
  //   {
  //     reportDate: new Date("2022-12-06T17:00:00"),
  //     creditScore: 350,
  //     reportingAgency: "VantageScore"
  //   },
  // ]

  // const financialAdvisors = [
  //   {
  //     bankName: "Wells Fargo",
  //     advisor: {
  //       name: "Selena Chen",
  //       phone: "(539)-874-2196",
  //       email: "selena.chen@email.com"
  //     }
  //   },
  //   {
  //     bankName: "PNC",
  //     advisor: {
  //       name: "Alex Snezhko",
  //       phone: "(987)-236-4244",
  //       email: "alex.snezhko@email.com"
  //     }
  //   },
  //   {
  //     bankName: "Bank of America",
  //     advisor: {
  //       name: "Tyrone Wu",
  //       phone: "(139)-286-5817",
  //       email: "tyrone.wu@email.com"
  //     }
  //   }
  // ]

  return (
    <>
      <SideBar setDarkMode={setDarkMode} darkMode={darkMode} isAuthenticated={isAuthenticated} activeSections={activeSections} setActiveSections={setActiveSections} editMode={editMode} setEditMode={setEditMode} />
      <div className="main">
        {activeSections.includes("Balances") &&
          <Balance darkMode={darkMode} accountData={data.accountData} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Balances"))} />}
        {activeSections.includes("Bills") &&
          <Bills darkMode={darkMode} billsTimeline={data.billData} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Bills"))} />}
        {activeSections.includes("Transactions") &&
          <Transactions darkMode={darkMode} dailyTransactions={data.transactionData} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Transactions"))} />}
        {activeSections.includes("Credit Scores") &&
          <CreditScores darkMode={darkMode} creditScores={data.creditScoreData} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Credit Scores"))} />}
        {activeSections.includes("Financial Advisors") &&
          <FinancialAdvisors darkMode={darkMode} financialAdvisors={data.financialAdvisorData} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Financial Advisors"))} />}

        {/* <div><Balance darkMode={darkMode} accountData={accountData} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Balances"))} /></div>
        <div><Bills darkMode={darkMode} billsTimeline={billsTimeline} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Bills"))} /></div>
        <div><Transactions darkMode={darkMode} dailyTransactions={dailyTransactions} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Transactions"))} /></div>
        <div><CreditScores darkMode={darkMode} creditScores={creditScores} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Credit Scores"))} /></div>
        <div><FinancialAdvisors darkMode={darkMode} financialAdvisors={financialAdvisors} editMode={editMode} closeSection={() => setActiveSections(activeSections.filter(x => x !== "Financial Advisors"))} /></div> */}
      </div>
    </>
  );
}

export default App;