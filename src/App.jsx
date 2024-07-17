import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import CustomerTablee from './Components/CustomerTable/CustomerTablee';
import  TransactionGraph  from './Components/TransactionGraph/TransactionGraph';
import {PropagateLoader } from 'react-spinners'
// to run the db.json => npx json-server --watch db.json --port 5000

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    const customersResponse = await axios.get('http://localhost:5000/customers');
    const transactionsResponse = await axios.get('http://localhost:5000/transactions');

    setCustomers(customersResponse.data);
    setTransactions(transactionsResponse.data);

    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <CustomerTablee customers={customers} transactions={transactions} /> },
        { path: 'transactiongraph', element: <TransactionGraph  /> },
        // transactions={transactions}
      ],
    },
  ]);

  return <>
  {isLoading?
  <div className="mx-auto h-lvh flex justify-center items-center"><PropagateLoader  color='#f9f194'/></div>
  // #f9f194
  : <RouterProvider router={router} />
  }
      

  </>
  
};

export default App;
