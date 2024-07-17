import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Table from '../Table/Table';

export default function TransactionGraph(){
  
  let location = useLocation();
  let dates = location.state? location.state.dates:[];
  let uniqueDates = [...new Set(dates)];
  // console.log(uniqueDates);

  let amounts = location.state? location.state.totalAmount:[];
  let uniqueAmounts = [...new Set(amounts)];
  // console.log(uniqueAmounts);

  let name = location.state? location.state.customerName:"unknown";
  // console.log(name);

  let id = location.state? location.state.customerId:null;
  // console.log(id);

  let customers= location.state? location.state.customers:[];
  let transactions = location.state? location.state.transactions:[];

  let finalFilteredTransactions = transactions.filter((transaction)=>transaction.customer_id == id);

  // console.log("++ "+c);
  // console.log("++qq "+t);

  const labels = uniqueDates;
  const total = uniqueAmounts;
  const data = {
    labels: labels,
    datasets: [{
      label: 'Transactions Amount',
      data: total,
      backgroundColor: [
        'rgba(32, 179, 153, 0.4)',
        'rgba(70, 232, 203, 0.5)', //	252	245	184
        'rgba(255	,234	,165, 0.5)', //255	234	165
        'rgba(253,172,97, 0.5)',
        'rgba(251,242,124, 0.5)',
        'rgba(255,216,0, 0.5)',
        'rgba(201, 203, 207, 0.6)'
        
      ],
      borderColor: [
        'rgb(180, 205, 147)', //	180	205	147
        'rgb(252	,245,	184)',
        'rgb(255	,234	,165)',
        'rgb(253,172,97)',
        'rgb(251,242,124)',
        'rgb(255,216,0)',
        'rgb(201, 203, 207)'
      ],
      // borderWidth: 1
    }]
  };
  // const options = {
  //   scales: {
  //     x: {
  //       grid: {
  //         color: '#e6d780', // Color of grid lines
  //       },
  //       ticks: {
  //         color: '#e6d780', // Color of axis labels
  //       }
  //     },
  //     y: {
  //       grid: {
  //         color: '#e6d780', // Color of grid lines
  //       },
  //       ticks: {
  //         color: '#e6d780', // Color of axis labels
  //       }
  //     }}}
  // #478c80
  // #649a94
  return<>
  <div className="p-10 text-center relative">
    <Link to={'/'} className='absolute right-0'>  <i className="fa-solid fa-xmark text-amber-100 fa-xl "></i> </Link>
    <h2 className='text-4xl mb-10  font-semibold text-amber-200'>Transaction Graph..</h2> 
    <h3 className=' text-3xl font-semibold text-amber-100'>Customer Name: {name}</h3>

    <Table finalFilteredTransactions={finalFilteredTransactions} customers={customers} transactions={transactions} showActonCol={false}/>
    
    <Bar data = {data} />
  </div>
  </>
}

