import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Header from './Header';
import { LoginButton } from './LoginButton';
import './styles/App.css';
import { AppData, BillData, CreditScoreData, RawAppData, RawBillData, RawCreditScoreData, RawTransactionData, TransactionData } from './types';
import Balance from './widgets/Balance';
import Bills from './widgets/Bills';
import Transactions from './widgets/Transactions';
import CreditScores from './widgets/CreditScores';
import FinancialAdvisors from './widgets/FinancialAdvisors';

function preprocessData(data: RawAppData): AppData {
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

function App() {
  // const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [data, setData] = useState<AppData | null>(null)

  const accountData = [
      {
          bankName: "Bank of America",
          accounts: [
              { accountNumber: "12341234", accountType: "Checking Account", balance: 200.00 },
              { accountNumber: "12341243", accountType: "Savings Account", balance: 100.00 },
          ]
      },
      {
          bankName: "Wells Fargo",
          accounts: [
              { accountNumber: "fdasasdf", accountType: "Checking Account", balance: 500.00 },
          ]
      },
  ]

  const billsTimeline = [
      {
          dueDate: new Date("2022-12-01T17:00:00"),
          bills: [
              { description: "Rent", amountDue: 200.00, isPaid: false }
          ]
      },
      {
          dueDate: new Date("2023-01-01T17:00:00"),
          bills: [
              { description: "Groceries", amountDue: 80.00, isPaid: true },
              { description: "Netflix Subscription", amountDue: 10.00, isPaid: false },
              { description: "Dinner", amountDue: 20.00, isPaid: true },
          ]
      }
  ]

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     // console.log({ isAuthenticated, isLoading, })
  //     try {
  //       // console.log('1')
  //       // const accessToken = await getAccessTokenSilently({
  //       //   audience: `https://hacknc2022ast-api`,
  //       //   scope: "read:bankinfo",
  //       // });
  //       console.log('2')

  //       const response = await fetch(`http://localhost:5000/api/info`, {
  //         // headers: {
  //         //   Authorization: `Bearer ${accessToken}`,
  //         // },
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //       setData(preprocessData(data));
  //     } catch (e) {
  //       console.log((e as any).message);
  //     }
  //   };
  //   // if (isAuthenticated) {
  //   //   getUserMetadata();
  //   // }
  // }, [getAccessTokenSilently, isLoading, isAuthenticated])

  // if (!isAuthenticated) {
  //   return <LoginButton />
  // }

  // if (isLoading || data === null) {
  //   return <div>Loading...</div>
  // }

  return (
    <>
      {/* <Header isAuthenticated={isAuthenticated} /> */}
      <div className="center">
        {/* <Balance accountData={data.accountData} />
        <Bills billsTimeline={data.billData} />
        <Transactions dailyTransactions={data.transactionData} /> */}
        <Balance accountData={accountData} />
        <Bills billsTimeline={billsTimeline} />
      </div>
    </>
  );
}

export default App;
