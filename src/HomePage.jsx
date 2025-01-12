import React from 'react'
import Header from './components/Header'
import MoneyDeatils from './components/MoneyDeatils'
import NewTransaction from './components/NewTransaction'
import Transactions from './components/Transactions'

const HomePage = () => {
  return (
     <>
    <div className="container">
    <Header/>
    <MoneyDeatils/>
    <Transactions/>
    <NewTransaction/> 
    </div>  
     </>
  )
}

export default HomePage