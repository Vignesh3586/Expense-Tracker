import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const url=process.env.SERVER_URL

export const fetchTransactions=createAsyncThunk('transactions/fetchTransactions',async(email,thunkAPI)=>{
    try{
        const options={
            method:"get",
            headers:{
                "Content-Type":"application/json"
            }
        }
        const finalURL=`${url}/${email}`
        const response=await fetch(finalURL,options)
        const result=await response.json()
        return result
    }catch(error){
        thunkAPI.rejectWithValue(error.message)
    }
})

export const addTransaction=createAsyncThunk('transactions/addTransaction',async(email,transactionData,thunkAPI)=>{
    try{
        const options={
            method:"post",
            parms:{
             email:email
            },
            body:JSON.stringify(transactionData),
            headers:{
                "Content-Type":"application/json"
            }
        }
        const response=await fetch(`${url}/transactions`,options)
        const result=await response.json()
        return result
    }catch(error){
        thunkAPI.rejectWithValue(error.message)
    }
})

 const initialState={
    userdata:null,
    data:null,
    transactions:[],
    loading:false,
    error:null
 }



const transactionsSlice=createSlice({
    name:'transactions',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTransactions.pending,(state)=>{
            state.loading="true"
        })
        .addCase(fetchTransactions.fulfilled,(state)=>{
            state.loading="false"
            state.transactions=action.payload.transactions;
            state.data=action.payload.data;
            state.userdata=action.payload.userDetails;
        })
        .addCase(fetchTransactions.rejected,(state)=>{
            state.loading="false"
            state.error=action.error.message;
        })
        .addCase(addTransaction.pending,(state)=>{
            state.loading="true"
        })
        .addCase(addTransaction.fulfilled,(state)=>{
            state.loading="false"
            state.transactions={...state.transactions,...action.payload};
        })
        .addCase(addTransaction.rejected,(state)=>{
            state.loading="false"
            state.error=action.error.message;
        })

    }
    
})

export default  transactionsSlice.reducer
export const selectAllTransactions=(state)=> state.transactions.transactions
export const selectUserDetails=(state)=>state.transactions.userdata
export const selectData=(state)=>state.transactions.data
