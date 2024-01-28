'use client'
import { useState } from 'react';
import style from './style.module.scss'
import { FaAngleDown } from "react-icons/fa6";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import AddOrder from '@/app/(components)/addOrder/addOrder';
import { OrderType, WindowType } from '@/app/assets/types';
import { addAtGatherer, addInCar, addInCart, deleteValueFromCar, deleteValueFromCart, deleteValueFromGatherer, deleteValueFromUnallocated } from '@/app/(storage)/reducers/orders';

function Orders() {

    const ordersType = useSelector((state: RootState) => state.orders)
    const dispatch = useDispatch()

    const [addOrderWindowOpen, setAddOrderWindowOpen] = useState(false)

    const [activeOrder, setActiveOrder] = useState<OrderType>()
    const [changeOrderMode, setChangeOrderMode] = useState(false)


    const windows = [
        { name: 'Сборка', icon: <FaPeopleCarryBox className={style['header__icon']} />, setOrder: addAtGatherer, ordersArr: ordersType.orders.atGatherer, deleteValueFunc: deleteValueFromGatherer },
        { name: 'В корзине', icon: <FaShoppingCart className={style['header__icon']} />, setOrder: addInCart, ordersArr: ordersType.orders.inCart, deleteValueFunc: deleteValueFromCart },
        { name: 'В машине', icon: <FaCar className={style['header__icon']} />, setOrder: addInCar, ordersArr: ordersType.orders.inCar, deleteValueFunc: deleteValueFromCar}
    ] as WindowType[]

    const renderWindows = windows.map((element) => {

        const [dropMenuOpen, setDropMenuOpen] = useState(false)

        return (
            <div className={style['window']} key={element.name} draggable={false} onClick={() => changeOrderMode && relocateOrder(element)}>
                <header className={style['widow__header']} onClick={() => setDropMenuOpen(prev => prev ? changeOrderMode?true:false : true)}>
                    <div className={style['header__info']}>
                        {element.icon}
                        <p>{element.name}</p>
                    </div>
                    <FaAngleDown className={style['header__drop-menu']} style={{ transform: dropMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </header>
                <div className={style['drop-menu']} style={{ height: dropMenuOpen ? '20vh' : '0', minHeight: dropMenuOpen ? '20vh' : '0' }} onClick={() => changeOrderMode && relocateOrder(element)}>
                    <div className={style['orders-container']}>
                        {

                            element.ordersArr.map((order) => (
                                <div className={style.order}
                                    style={{ background: order.color, transform: changeOrderMode && activeOrder?.id == order.id ? 'scale(1.1)' : 'scale(1)' }}
                                    onClick={() => changeOrderPlace(order)}
                                >
                                    <p>{order.orderNumber}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    })

    const changeOrderPlace = (order: OrderType) => {
        setActiveOrder(order)
        setChangeOrderMode(true)
    }

    const relocateOrder = (window: WindowType) => {
        windows.forEach(element => {
            dispatch(element.deleteValueFunc(activeOrder))
        });
        dispatch(deleteValueFromUnallocated(activeOrder))
        dispatch(window.setOrder(activeOrder))
        setActiveOrder(undefined)
        setChangeOrderMode(false)
    }

    const renderOrdersUnallocated = ordersType.orders.unallocated.map((order) => (
        <div className={style.order}
            style={{ background: order.color, transform: changeOrderMode && activeOrder?.id == order.id ? 'scale(1.1)' : 'scale(1)' }}
            onClick={() => changeOrderPlace(order)}
        >
            <p>{order.orderNumber}</p>
        </div>
    ))

    return (
        <main className={style.wrapper}>
            {addOrderWindowOpen && <AddOrder closeWindow={() => setAddOrderWindowOpen(false)} />}
            <div className={style['add-order']}>
                <button className={style['add-order__button']} onClick={() => setAddOrderWindowOpen(true)}>Добавить номер заказа</button>
            </div>
            <div className={style['unallocated-orders']}>
                <div className={style['window-unll-orders']}>
                    <p className={'unallocated-orders__title'}>Нераспределенные заказы</p>
                    <div className={style['orders-container']}>{renderOrdersUnallocated}</div>
                </div>
            </div>
            {renderWindows}
        </main>
    );
}

export default Orders;