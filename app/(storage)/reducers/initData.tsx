import { random } from "@/app/assets/functions";
import { OrderType } from "@/app/assets/types";
import { createSlice } from "@reduxjs/toolkit";
import { WindowType } from '@/app/assets/types';

import { FaAngleDown } from "react-icons/fa6";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { OrdersType } from "@/app/assets/enums";

const initialState = {
    windows: [
        { name: 'Сборка', iconRender: (style: any) => <FaPeopleCarryBox className={style['header__icon']} />, orderType: OrdersType.atGatherer },
        { name: 'В корзине', iconRender: (style: any) => <FaShoppingCart className={style['header__icon']} />, orderType: OrdersType.inCart },
        { name: 'В машине', iconRender: (style: any) => <FaCar className={style['header__icon']} />, orderType: OrdersType.inCar}
    ] as WindowType[]
}

const reducer = createSlice({
    name: 'initData',
    initialState,
    reducers: {
        
    }
})

export const {  } = reducer.actions

export const initDataReducer = reducer.reducer