'use client'
import { useState } from 'react';
import style from './style.module.scss'
import { FaAngleDown } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import AddOrder from '@/app/(components)/addOrder/addOrder';
import { OrderType, WindowType } from '@/app/assets/types';
import { changeOrderType } from '@/app/(storage)/reducers/orders';
import { OrdersType } from '@/app/assets/enums';

function Orders() {

    const { ordersType, windows } = useSelector((state: RootState) => ({
        ordersType: state.orders,
        windows: state.initData.windows
    }))

    const dispatch = useDispatch()

    const [addOrderWindowOpen, setAddOrderWindowOpen] = useState(false)

    const [activeOrder, setActiveOrder] = useState<OrderType>()
    const [changeOrderTypeMode, setChangeOrderTypeMode] = useState(false)

    const unallocatedWindow = { name: 'Нераспределенные заказы', orderType: OrdersType.unallocated, iconRender: () => { } }


    const renderOrders = (orderType: OrdersType) => (ordersType.orders.filter(element => element.orderType == orderType).map((order) => (
        <div className={style.order}
            style={{ background: order.color, transform: changeOrderTypeMode && activeOrder?.id == order.id ? 'scale(1.1)' : 'scale(1)' }}
            onClick={() => changeOrderPlace(order)}
        >
            <p>{order.orderNumber}</p>
        </div>
    )))

    const renderWindows = windows.map((element) => {

        const [dropMenuOpen, setDropMenuOpen] = useState(false)

        return (
            <div className={`${style['window']} ${changeOrderTypeMode ? style['active-mode'] : ''}`} key={element.name} onClick={() => relocateOrder(element)}>
                <header className={style['widow__header']} onClick={() => setDropMenuOpen(prev => prev ? changeOrderTypeMode ? true : false : true)}>
                    <div className={style['header__info']}>
                        {element.iconRender(style)}
                        <p>{element.name}</p>
                    </div>
                    <FaAngleDown className={style['header__drop-menu']} style={{ transform: dropMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </header>
                <div className={style['drop-menu']} style={{ height: dropMenuOpen ? '20vh' : '0', minHeight: dropMenuOpen ? '20vh' : '0' }} onClick={() => changeOrderTypeMode && relocateOrder(element)}>
                    <div className={style['orders-container']}>
                        {renderOrders(element.orderType)}
                    </div>
                </div>
            </div>
        )
    })

    const changeOrderPlace = (order: OrderType) => {
        setActiveOrder(order)
        setChangeOrderTypeMode(true)
    }

    const relocateOrder = (window: WindowType) => {
        if (changeOrderTypeMode) {
            dispatch(changeOrderType({ id: activeOrder?.id, orderType: window.orderType }))
            setActiveOrder(undefined)
            setChangeOrderTypeMode(false)
        }
    }

    return (
        <main className={style.wrapper}>
            {changeOrderTypeMode && <div className={style['edit-mode_background']}></div>}
            {addOrderWindowOpen && <AddOrder closeWindow={() => setAddOrderWindowOpen(false)} />}
            <div className={style['add-order']}>
                <button className={style['add-order__button']} onClick={() => setAddOrderWindowOpen(true)}>Добавить номер заказа</button>
            </div>
            <div className={`${style['unallocated-orders']} ${changeOrderTypeMode ? style['active-mode'] : ''}`}
                onClick={() => relocateOrder(unallocatedWindow)}
                style={{ cursor: changeOrderTypeMode ? 'pointer' : 'default' }}
            >
                <div className={style['window-unll-orders']}>
                    <p className={'unallocated-orders__title'}>Нераспределенные заказы</p>
                    <div className={style['orders-container']}>{renderOrders(OrdersType.unallocated)}</div>
                </div>
            </div>
            {renderWindows}
        </main>
    )
}

export default Orders;