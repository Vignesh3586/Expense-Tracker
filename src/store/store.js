import { configureStore } from "@reduxjs/toolkit";
import transactionsSliceReducer from "../slices/transctionSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionsSliceReducer,
    }
})