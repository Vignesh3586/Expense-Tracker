import React from 'react'
import { useSelector } from 'react-redux'
import { selectMoneyDetails } from '../slices/transctionSlice'

const MoneyDeatils = () => {
  const moneydetails= useSelector(selectMoneyDetails);
  return (
    <section className="money-details">
        <div className="money-balance">
            <label htmlFor="balance">Balance</label>
            <div id='balance'>{"\u20B9"}{moneydetails.balance}</div>
        </div>
        <div className="money-income-expenses">
        <div className="money-income">
            <label htmlFor="income">Income</label>
            <div id='income'>{"\u20B9"}{moneydetails.income}</div>
        </div>
        <div className="money-expenses">
            <label htmlFor="expenses">Expenses</label>
            <div id='expenses'>{"\u20B9"}{moneydetails.expense}</div>
        </div>
        </div>
    </section>
  )
}

export default MoneyDeatils