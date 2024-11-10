import React from 'react'
import {useSelector} from 'react-redux'
import { selectAllTransactions } from '../slices/transctionSlice'

const Transactions = () => {
    const transactions=useSelector(selectAllTransactions)
    const sign=(type)=>{
      if(type=='Income'){
        return '+'
      }else{
        return '-'
      }
    }
    return (
      <>
      <section className="transactions">
        {(transactions) && transactions.length>0 ?
          <ul>
          {transactions.map((transaction)=>(
             <li key={transaction.Id}>
              <label htmlFor="transaction">{transaction.Name}</label>
              <span id='transction'>{`${sign(transaction.Type)}${transaction.Amount}`}</span>
             </li>
          ))
          }
          </ul>:
          <div className='description'>No Transactions</div>}
      </section>
      </>
      )
}

export default Transactions