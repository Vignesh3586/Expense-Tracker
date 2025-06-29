import React, { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction, selectLoading, fetchEmailWithData } from '../slices/transctionSlice'
import { useLocation } from 'react-router-dom'

const NewTransaction = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [option, setOption] = useState('Income')
  const incomeRef = useRef(null)
  const expenseRef = useRef(null)
  const location = useLocation()
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)

  const onNameChange = (e) => setName(e.target.value)
  const onAmountChange = (e) => setAmount(e.target.value)



  const onOptionChange = (option) => {
    setOption(option)
    if (option === 'Income') {
      incomeRef.current?.classList.add("hover-income-btn")
      expenseRef.current?.classList.remove("hover-expense-btn")
    } else {
      incomeRef.current?.classList.remove("hover-income-btn")
      expenseRef.current?.classList.add("hover-expense-btn")
    }
  }

  useEffect(() => {
    onOptionChange("Income")
  }, [])

  const handleClick = async (e) => {
    e.preventDefault()
    if (!isNaN(amount)) {
      const data = {
        transactionType: option,
        transactionName: name,
        transactionAmount: amount,
      }
      dispatch(addTransaction({ email: location.state.email, transactionData: data }))

    } else {
      alert("Transaction amount should be number")
    }
    setName('')
    setAmount('')
  }

  return (
    <>
      <section className="new-transction">
        <h1>New Transaction</h1>
        <form id="submit" action="submit" onSubmit={handleClick}>
          <div className="option-btn">
            <ul name="selectoption" id="transaction-option">
              <li ref={expenseRef} onClick={(e) => onOptionChange(e.target.innerText)}>Expense</li>
              <li ref={incomeRef} onClick={(e) => onOptionChange(e.target.innerText)}>Income</li>
            </ul>
          </div>
          <label htmlFor="input-name">Transaction Name</label>
          <input required type="text" id='input-name' value={name} onChange={onNameChange} />
          <label htmlFor="input-amount">Transaction Amount</label>
          <input required type="text" id='input-amount' value={amount} onChange={onAmountChange} />
          <button type='submit' className='submit-btn' >{loading ? "Adding" : "Add Transaction"}</button>
        </form>
      </section>
    </>
  )
}

export default NewTransaction
