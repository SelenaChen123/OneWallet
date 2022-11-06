import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { AuthButton } from './AuthButton';
import './styles/App.css';
import { AppData, BillData, CreditScoreData, RawAppData, RawBillData, RawCreditScoreData, RawTransactionData, TransactionData, RawScheduledPaymentData, ScheduledPaymentData } from './types';
import SideBar from './SideBar';
import Balance from './widgets/Balance';
import Bills from './widgets/Bills';
import Transactions from './widgets/Transactions';
import CreditScores from './widgets/CreditScores';
import FinancialAdvisors from './widgets/FinancialAdvisors';
import ScheduledPayments from './widgets/ScheduledPayments';

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
  function processPayment(scheduledPaymentsData: RawScheduledPaymentData[]): ScheduledPaymentData[] {
    return scheduledPaymentsData.map(scheduledPaymentData => ({ ...scheduledPaymentData, dueDate: new Date(scheduledPaymentData.dueDate) }));
  }

  const billData = processBill(data.billData);
  const transactionData = processTransaction(data.transactionData);
  const creditScoreData = processCreditScore(data.creditScoreData);
  const scheduledPaymentData = processPayment(data.scheduledPaymentData);
  return { ...data, billData, transactionData, creditScoreData, scheduledPaymentData };
}

export type Section = "Balances" | "Transactions" | "Bills" | "Scheduled Payments" | "Credit Scores" | "Financial Advisors";
export const allSections = ["Balances", "Transactions", "Bills", "Scheduled Payments", "Credit Scores", "Financial Advisors"];
const allActive: Record<Section, boolean> = {
  "Balances": true,
  "Transactions": true,
  "Bills": true,
  "Scheduled Payments": true,
  "Credit Scores": true,
  "Financial Advisors": true,
}

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [data, setData] = useState<AppData | null>(null)
  const [darkMode, setDarkMode] = useState(false);
  const [activeSections, setActiveSections] = useState(allActive);
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

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = "radial-gradient(#2A5470, #4C4177)"
    } else {
      document.body.style.background = "radial-gradient(#77EED8, #9EABE4)"
    }
  }, [darkMode])

  if (!isAuthenticated) {
    return (
      <div style={{ margin: "auto", marginTop: "3em", textAlign: "center" }}>
        <div style={{ fontSize: "1.5em", marginBottom: "1em" }}>Welcome to OneWallet! Please log in to access the site:</div>
        <AuthButton isLogin={true} />
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data === null) {
    return <div>Loading...</div>
  }

  const accountData = [
    {
      bankName: "Bank of America",
      accounts: [
        { accountNumber: "12341234", accountType: "Checking Account", balance: 20000 },
        { accountNumber: "12341243", accountType: "Savings Account", balance: 10000 },
      ]
    },
    {
      bankName: "Wells Fargo",
      accounts: [
        { accountNumber: "fdasasdf", accountType: "Checking Account", balance: 50000 },
      ]
    },
  ]

  const transactionData = [
    {
      date: new Date("2022-11-05T17:00:00"),
      transactions: [
        {
          accountNumber: "asdffdsa",
          bankName: "Bank of America",
          description: "Deposit",
          isWithdrawal: false,
          amount: 100000
        },
        {
          accountNumber: "123476134",
          bankName: "PNC",
          description: "Withdrawal",
          isWithdrawal: true,
          amount: 20000
        }
      ]
    },
    {
      date: new Date("2022-11-06T17:00:00"),
      transactions: [
        {
          accountNumber: "asdf7890",
          bankName: "Wells Fargo",
          description: "Withdrawal",
          isWithdrawal: true,
          amount: 10000
        }
      ]
    }
  ]

  const billData = [
    {
      dueDate: new Date("2022-12-01T17:00:00"),
      bills: [
        { description: "Rent", amountDue: 20000, isPaid: false }
      ]
    },
    {
      dueDate: new Date("2023-01-01T17:00:00"),
      bills: [
        { description: "Groceries", amountDue: 8000, isPaid: true },
        { description: "Netflix Subscription", amountDue: 1000, isPaid: false },
        { description: "Dinner", amountDue: 2000, isPaid: true },
      ]
    }
  ]

  const creditScoreData = [
    {
      reportDate: new Date("2022-11-05T17:00:00"),
      creditScore: 850,
      reportingAgency: "FICO"
    },
    {
      reportDate: new Date("2022-12-06T17:00:00"),
      creditScore: 350,
      reportingAgency: "VantageScore"
    },
  ]

  const financialAdvisorData = [
    {
      bankName: "Wells Fargo",
      advisor: {
        name: "Selena Chen",
        phone: "(539)-874-2196",
        email: "selena.chen@email.com"
      }
    },
    {
      bankName: "PNC",
      advisor: {
        name: "Alex Snezhko",
        phone: "(987)-236-4244",
        email: "alex.snezhko@email.com"
      }
    },
    {
      bankName: "Bank of America",
      advisor: {
        name: "Tyrone Wu",
        phone: "(139)-286-5817",
        email: "tyrone.wu@email.com"
      }
    }
  ]

  const scheduledPaymentData = [
    {
      dueDate: new Date("2022-12-01T17:00:00"),
      bills: [
        { description: "Credit Card Autopay", amountDue: 32600, isPaid: false }
      ]
    },
    {
      dueDate: new Date("2023-01-01T17:00:00"),
      bills: [
        { description: "Rent", amountDue: 2000, isPaid: false },
        { description: "Netflix Subscription", amountDue: 1000, isPaid: false }
      ]
    }
  ]

  return (
    <>
      <SideBar setDarkMode={setDarkMode} darkMode={darkMode} isAuthenticated={isAuthenticated} activeSections={activeSections} setActiveSections={setActiveSections} editMode={editMode} setEditMode={setEditMode} />
      {/* <SideBar setDarkMode={setDarkMode} darkMode={darkMode} isAuthenticated={true} activeSections={activeSections} setActiveSections={setActiveSections} editMode={editMode} setEditMode={setEditMode} /> */}
      <div className="main">
        {activeSections["Balances"] &&
          <Balance darkMode={darkMode} accountData={data.accountData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Balances": false })} />}
        {activeSections["Transactions"] &&
          <Transactions darkMode={darkMode} dailyTransactions={data.transactionData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Transactions": false })} />}
        {activeSections["Scheduled Payments"] &&
          <ScheduledPayments darkMode={darkMode} scheduledPayments={data.scheduledPaymentData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Scheduled Payments": false })} />}
        {activeSections["Bills"] &&
          <Bills darkMode={darkMode} billsTimeline={data.billData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Bills": false })} />}
        {activeSections["Credit Scores"] &&
          <CreditScores darkMode={darkMode} creditScores={data.creditScoreData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Credit Scores": false })} />}
        {activeSections["Financial Advisors"] &&
          <FinancialAdvisors darkMode={darkMode} financialAdvisors={data.financialAdvisorData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Financial Advisors": false })} />}

        {/* {activeSections["Balances"] &&
          <Balance darkMode={darkMode} accountData={accountData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Balances": false })} />}
        {activeSections["Transactions"] &&
          <Transactions darkMode={darkMode} dailyTransactions={transactionData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Transactions": false })} />}
        {activeSections["Scheduled Payments"] &&
          <ScheduledPayments darkMode={darkMode} scheduledPayments={scheduledPaymentData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Scheduled Payments": false })} />}
        {activeSections["Bills"] &&
          <Bills darkMode={darkMode} billsTimeline={billData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Bills": false })} />}
        {activeSections["Credit Scores"] &&
          <CreditScores darkMode={darkMode} creditScores={creditScoreData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Credit Scores": false })} />}
        {activeSections["Financial Advisors"] &&
          <FinancialAdvisors darkMode={darkMode} financialAdvisors={financialAdvisorData} editMode={editMode} closeSection={() => setActiveSections({ ...activeSections, "Financial Advisors": false })} />} */}

      </div>
    </>
  );
}

export default App;