import { random } from "@/app/assets/functions";
import { OrderType } from "@/app/assets/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [] as OrderType[],
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
                orderNumber: action.payload.orderNumber,
                orderType: action.payload.orderType
            } as OrderType

            state.orders = [...state.orders, newOrder]
        },
        changeOrderType: (state, action) => {
            state.orders = [...state.orders.map((element)=>{
                if(element.id == action.payload.id){
                    const newElement = {
                        ...element,
                        orderType: action.payload.orderType
                    }
                    return newElement
                } else
                    return element                
            })]
        },
    }
})

export const { addNewOrder, changeOrderType } = reducer.actions

export const OrderReducer = reducer.reducer