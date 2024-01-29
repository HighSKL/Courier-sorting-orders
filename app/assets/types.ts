import { OrdersType } from "./enums";

export type OrderType = {
    id: number;
    color: string;
    orderNumber: string|number;
    orderType: OrdersType
}

export type WindowType = {
    name: string;
    iconRender: any;
    orderType: OrdersType;
}