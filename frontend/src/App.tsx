import './App.css';
import React from 'react';
import logo from './logo.svg';
import Balance from './widgets/Balance';
import Bills from './widgets/Bills';

function App() {
  return (
    <div className="center">
      <Balance accounts={null}/>
      <Bills />
    </div>
  );
}

export default App;
