import { random } from "@/app/assets/functions";
import { OrderType } from "@/app/assets/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: {
        unallocated: [{id: 1, color:'#c82e2e', orderNumber: '1H23456'}] as OrderType[],
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
                id: random(999999),
                color: state.availableColors[random(state.availableColors.length)],
                orderNumber: action.payload
            } as OrderType

            state.orders.unallocated = [...state.orders.unallocated, newOrder]
        },
        deleteValueFromUnallocated: (state, action) => {
            state.orders.unallocated = [...state.orders.unallocated.filter((element)=>element.id != action.payload.id)]
        },
        deleteValueFromGatherer: (state, action) => {
            state.orders.atGatherer = [...state.orders.atGatherer.filter((element:any)=>element.id != action.payload.id)]
        },
        deleteValueFromCar: (state, action) => {
            state.orders.inCar = [...state.orders.inCar.filter((element:any)=>element.id != action.payload.id)]
        },
        deleteValueFromCart: (state, action) => {
            state.orders.inCart = [...state.orders.inCart.filter((element:any)=>element.id != action.payload.id)]
        },
        addInCar: (state, action) => {
            state.orders.inCar = [...state.orders.inCar, action.payload]
        },
        addAtGatherer: (state, action) => {
            state.orders.atGatherer = [...state.orders.atGatherer, action.payload]
        },
        addInCart: (state, action) => {
            state.orders.inCart = [...state.orders.inCart, action.payload]
        }
    }
})

export const { addNewOrder, addInCar, addAtGatherer, addInCart, deleteValueFromUnallocated, deleteValueFromGatherer,
    deleteValueFromCar, deleteValueFromCart} = reducer.actions

export const OrderReducer = reducer.reducer