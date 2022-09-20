import React from 'react';
import './App.css';
import Table from './components/Table';
import ApiProvider from './context/ApiProvider';

function App() {
  return (
    <main>
      <ApiProvider>
        <span>Hello, Star Wars</span>
        <Table />
      </ApiProvider>
    </main>
  );
}

export default App;
