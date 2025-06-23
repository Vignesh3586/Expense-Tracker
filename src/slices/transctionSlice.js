import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://backend-expense-tracker-1-862g.onrender.com"

export const fetchEmailWithData = createAsyncThunk('transactions/fetchDataWithEmail', async (email, thunkAPI) => {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const finalURL = `${url}/${email}`
        const response = await fetch(finalURL, options)
        const result = await response.json()
        if (response.ok) {
            return result;
        } else {
            throw new Error("Failed to addtransaction")
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})


export const addTransaction = createAsyncThunk(
    "transactions/addTransaction",
    async ({ email, transactionData }, thunkAPI) => {
        try {
            const options = {
                method: "POST",
                body: JSON.stringify(transactionData),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const finalURL = `${url}/transactions/${email}`;
            const response = await fetch(finalURL, options);

            if (!response.ok) {
                throw new Error("Failed to add transaction.");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const initialState = {
    data: {},
    transactions: [],
    loading: false,
    error: null
}



const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmailWithData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchEmailWithData.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data;
                state.transactions = action.payload.transactions;
            })
            .addCase(fetchEmailWithData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || "Failed to fetch data";
            })
            .addCase(addTransaction.pending, (state) => {
                state.loading = true
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.loading = false
                state.transactions = (action.payload.transactions).length > 0 ? action.payload.transactions : [];
                state.data = action.payload.data
            })
            .addCase(addTransaction.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload || "Failed to add transaction";
            })

    }

})

export default transactionsSlice.reducer
export const selectAllTransactions = (state) => state.transactions.transactions
export const selectData = (state) => state.transactions.data
export const selectError = (state) => state.transactions.error
export const selectLoading = (state) => state.transactions.loading
