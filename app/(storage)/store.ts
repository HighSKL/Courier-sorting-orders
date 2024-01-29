import { configureStore } from "@reduxjs/toolkit";
import { OrderReducer } from "./reducers/orders";
import { initDataReducer } from "./reducers/initData";

export const store = configureStore({
    reducer: {
        orders: OrderReducer,
        initData: initDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch