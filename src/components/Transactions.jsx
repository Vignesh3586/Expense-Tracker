import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllTransactions } from '../slices/transctionSlice'

const Transactions = () => {
  const transactions = useSelector(selectAllTransactions)

  const sign = (type) => {
    if (type == 'Income') {
      return '+'
    } else {
      return '-'
    }
  }

  const getStyleOfSpan = (type) => {
    if (type == "Income") {
      return { color: "#23e465" }
    } else {
      return { color: " #ec1d1d" }
    }
  }
  return (
    <>
      <section className="transactions">
        {(transactions) && transactions.length > 0 ?
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction._id}>
                <label htmlFor="transaction">{transaction.transactionName}</label>
                <span id='transction' style={getStyleOfSpan(transaction.transactionType)}>{`${sign(transaction.transactionType)}${transaction.transactionAmount}`}</span>
              </li>
            ))
            }
          </ul> :
          <div className='description'>No Transactions</div>}
      </section>
    </>
  )
}

export default Transactions