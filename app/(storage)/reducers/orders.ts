import { random } from "@/app/assets/functions";
import { OrderType } from "@/app/assets/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: {
        unallocated: [{color:'#c82e2e', orderNumber: '1H23456'}] as OrderType[],
        inCar: [] as OrderType[],
        atGatherer: [] as OrderType[],
        inCart: [] as OrderType[]
    },
    availableColors: ['#c82e2e', '#ef9117', '#7b9f38', '#239bb0']
}

const reducer = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        addNewOrder: (state, action) => {

            const newOrder = {
                color: state.availableColors[random(state.availableColors.length)],
                orderNumber: action.payload
            } as OrderType

            state.orders.unallocated = [...state.orders.unallocated, newOrder]
        }
    }
})

export const { addNewOrder } = reducer.actions

export const OrderReducer = reducer.reducer