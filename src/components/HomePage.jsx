import React, { useState } from 'react'
import MoneyDeatils from './MoneyDeatils'
import NewTransaction from './NewTransaction'
import Transactions from './Transactions'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchTransactions ,fetchDataByEmail, selectData} from '../slices/transctionSlice'
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import {Pie} from "react-chartjs-2"
import {Chart as chartJS,Legend,ArcElement,Tooltip} from "chart.js"
import { useSelector } from 'react-redux';
import { selectUserDetails } from '../slices/transctionSlice';

chartJS.register(ArcElement,Legend,Tooltip)

const HomePage = () => {
  const location=useLocation()
  const dispatch=useDispatch()
  const email=location.state.email
  const historyRef=useRef(null)
  const userDetails=useSelector(selectData)
  dispatch(fetchTransactions(email))

  const closeHistory=()=>{
    historyRef.current.classList.add("without-history")
    historyRef.current.classList.remove("with-history")
  }
  
  const openHistory=()=>{
    historyRef.current.classList.add("with-history")
    historyRef.current.classList.remove("without-history")
  }
  

  const yearData={
   labels:["Income","Expense"],
   datasets:[{
    label:"first dataset",
    data:[userDetails?.trackByYear?.yearIncome||0,userDetails?.trackByYear?.yearExpense||0],
    backgroundColor:["#14A44D","#DC4C64"]
   }],
  }
  
  const monthData={
    labels:["Income","Expense"],
    datasets:[{
     label:"first dataset",
     data:[userDetails?.trackByMonth?.monthIncome||0,userDetails?.trackByMonth?.monthExpense||0],
     backgroundColor:["#14A44D","#DC4C64"]
    }],
   }
   


  return (
     <>
    
    <div className="container">
    <section className="history-container without-history" ref={historyRef}>
      <div className="history-header" >
        <button aria-label="close-history" onClick={closeHistory}>
      <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <h1>History</h1>
      </div>
      <div className="year-history">
        <label htmlFor="year">Year analysis</label>
       <Pie style={{width:"60%",height:"40%"}} data={yearData}/>
      </div>
      <div className="month-history">
        <label htmlFor="month">Month analysis</label>
        <Pie style={{width:"60%",height:"40%"}} data={monthData}/>
      </div>
    </section>
     <section className='transaction-container'>
    <div className='header'>
      <button type='button' className="history-btn" onClick={openHistory}>
      <FontAwesomeIcon icon={faBars} />
      </button>
       <h1>FinanceFlow</h1>
      </div>
    <MoneyDeatils/>
    <Transactions/>
    <NewTransaction/> 
    </section>
    </div>  
     </>
  )
}

export default HomePage