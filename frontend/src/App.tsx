import './styles/App.css';
import Balance from './widgets/Balance';
import Bills from './widgets/Bills';
import Transactions from './widgets/Transactions';

function App() {
  return (
    <div className="center">
      <Balance banks={null} />
      <Bills billsTimeline={null} />
      <Transactions dailyTransactions={null} />
    </div>
  );
}

export default App;
