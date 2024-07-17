import React, {  useState } from 'react';
import { Link } from 'react-router-dom';

export default function Table({finalFilteredTransactions, customers, transactions , showActonCol}) {
    

  return <>
  <div className="p-7 ">
    
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-amber-200  bg-opacity-90 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Customer ID
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Date
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Amount
            </th>
            {showActonCol?
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            :null
            }
          </tr>
        </thead>
        <tbody >
          {finalFilteredTransactions.map((transaction) => {
            console.log(typeof(transaction.customer_id));
            let customer = customers.find((customer)=>customer.id == transaction.customer_id);

            return (
              <tr
                key={transaction.id}
                className="bg-white  border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 ">{transaction.id}</td>
                <td className="px-6 py-4  ">{transaction.customer_id}</td>
                <td className="px-6 py-4 ">{customer.name}</td>
                <td className="px-6 py-4 ">{transaction.date}</td>
                <td className="px-6 py-4 ">{transaction.amount}</td>
                {showActonCol?
                <td className="px-6 py-4 ">
                  <Link to={'/transactiongraph'} state={
                    {dates:transactions.filter((t)=>t.customer_id === transaction.customer_id).map(t=>t.date),
                      totalAmount:transactions.filter((t)=>t.customer_id === transaction.customer_id).map(t=>t.amount),
                      customerName: customer?customer.name:"unKnown",
                      customerId: customer?customer.id:null,
                      transactions:transactions,
                      customers:customers
                      
                    }
                    
                    } className="font-medium text-teal-600 dark:text-teal-500 hover:underline">
                    Details
                  </Link>
                </td>
                :null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    
  </div>
  </>
}
