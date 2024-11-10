import { createSlice } from "@reduxjs/toolkit";

const existingTransactions=localStorage.getItem('Transactions')
const transactions=(existingTransactions)?JSON.parse(existingTransactions): []
const existingMoneyDetils=localStorage.getItem('moneyDetails')
const moneydetails=(existingMoneyDetils)?JSON.parse(existingMoneyDetils):{
    balance:0.00,
    income:0.00,
    expense:0.00
}


const initialState={
    Transactions:transactions,
    moneyDetails: moneydetails,
}

const transactionsSlice=createSlice({
    name:'transactions',
    initialState,
    reducers:{
        addTransction:(state,action)=>{
        const newTransaction=action.payload
        newTransaction.Id=(state.Transactions.length)
        if(newTransaction.Type=='Income'){
            state.moneyDetails.balance+=Number(newTransaction.Amount)
            state.moneyDetails.income+=Number(newTransaction.Amount)
        }else{
            state.moneyDetails.balance-=Number(newTransaction.Amount)
            state.moneyDetails.expense+=Number(newTransaction.Amount)
        }
        state.Transactions.push(newTransaction)
        localStorage.setItem('Transactions',JSON.stringify(state.Transactions))
        localStorage.setItem('moneyDetails',JSON.stringify(state.moneyDetails))
        }
    }
})

export const {addTransction}=transactionsSlice.actions
export default  transactionsSlice.reducer
export const selectAllTransactions=(state)=> state.transactions.Transactions
export const selectMoneyDetails=(state)=>state.transactions.moneyDetails
