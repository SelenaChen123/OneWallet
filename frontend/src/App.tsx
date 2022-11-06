import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Header from './Header';
import { AuthButton } from './AuthButton';
import './styles/App.css';
import { AppData, BillData, CreditScoreData, RawAppData, RawBillData, RawCreditScoreData, RawTransactionData, TransactionData } from './types';
import SideBar from './SideBar';
import Balance from './widgets/Balance';
import Bills from './widgets/Bills';
import Transactions from './widgets/Transactions';

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

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const [data, setData] = useState<AppData | null>(null)

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

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <div className="center">
        <Balance accountData={data.accountData} />
        <Bills billsTimeline={data.billData} />
        <Transactions dailyTransactions={data.transactionData} />
      </div>
    </>
  );
}

export default App;