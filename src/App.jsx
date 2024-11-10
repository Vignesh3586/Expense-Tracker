import './App.css'
import Header from './components/Header'
import MoneyDeatils from './components/MoneyDeatils'
import NewTransaction from './components/NewTransaction'
import Transactions from './components/Transactions'

function App() {

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

export default App
