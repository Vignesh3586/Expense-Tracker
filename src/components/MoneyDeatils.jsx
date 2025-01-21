import React from 'react'
import { useSelector } from 'react-redux'
import { selectData} from '../slices/transctionSlice'

const MoneyDeatils = () => {
  const userDetails= useSelector(selectData);
  console.log(userDetails)
  return (
    <section className="money-details">
        <div className="money-balance">
            <label htmlFor="balance">Balance</label>
            <div id='balance' style={{fontFamily:"initial"}}>{"\u20B9"}{userDetails?.balance||0}</div>
        </div>
        <div className="money-income-expenses">
        <div className="money-income">
            <label htmlFor="income">Income</label>
            <div id='income' style={{fontFamily:"initial",
              color:"rgba(33,89,109,1)"
            }}>{"\u20B9"}{userDetails?.income||0}</div>
        </div>
        <div className="money-expenses">
            <label htmlFor="expenses">Expenses</label>
            <div id='expenses' style={{fontFamily:"initial",
              color:"rgba(127,86,95,1)"
            }}>{"\u20B9"}{userDetails?.expense||0}</div>
        </div>
        </div>
    </section>
  )
}

export default MoneyDeatils