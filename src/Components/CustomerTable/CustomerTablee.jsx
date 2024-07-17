import React, {  useState } from 'react';
import Table from '../Table/Table';

export default function CustomerTablee({ customers, transactions }) {
    const [searcQuery, setSearcQuery] = useState('');

    function filteredTransactions(){
      return transactions.filter((transaction)=>{
        let customer = customers.find((customer)=>customer.id == transaction.customer_id);
        let customerName = customer ? customer.name.toLowerCase():'Unknown';
        let transactionAmount = transaction.amount.toString();
        return customerName.includes(searcQuery.toLowerCase()) || transactionAmount.includes(searcQuery)

      })
    }
    let finalFilteredTransactions = filteredTransactions();
    

  return <>
    <div className="p-10 pb-0">
      <h2 className='text-5xl mb-10 text-center font-semibold text-amber-200'>Customer Table..</h2>
      
      <input type="search" onChange={(event)=>{setSearcQuery(event.target.value)}} value={searcQuery} name="search" id="search" 
      className=' w-3/4 rounded py-2 px-5 outline-none transition-all duration-500 focus:outline-amber-200 mx-auto block' 
      placeholder='Search By Name or Amount'
      autoComplete='off'/>
      
      <div className="h-lvh">
        <Table finalFilteredTransactions={finalFilteredTransactions} customers={customers} transactions={transactions} showActonCol={true} /> 
      </div>
    </div>
  </>
}
