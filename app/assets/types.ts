export type OrderType = {
    id: number;
    color: string;
    orderNumber: string|number;
}

export type WindowType = {
    name: string;
    icon: any;
    setOrder: any;
    ordersArr: OrderType[];
    deleteValueFunc: any;
}