import { configureStore } from "@reduxjs/toolkit";
import { OrderReducer } from "./reducers/orders";

export const store = configureStore({
    reducer: {
        orders: OrderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch