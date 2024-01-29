'use client'
import withModalWindow from '@/app/assets/HOCs/ModalWindow/withModalWindow';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss'
import { addNewOrder } from '@/app/(storage)/reducers/orders';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersType } from '@/app/assets/enums';
import { RootState } from '@/app/(storage)/store';
import { WindowType } from '@/app/assets/types';

type PropsType = {
    closeWindowHandler: any
}

function AddOrder(props: PropsType) {

    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const windows = useSelector((state: RootState) => state.initData.windows)
    const unallocatedWindow = { name: 'Нераспре-деленные&nbsp;заказы', orderType: OrdersType.unallocated, iconRender: () => { } }
    const [activeWindow, setActiveWindow] = useState<WindowType>(unallocatedWindow)
    const [isInputEmpty, setIsInputEmpty] = useState(true)

    const changeIsInputEmpty = () => {
        const inputEmpty = inputRef.current && inputRef.current['value'] == '' ? true : false
        //memo
        if (!(inputEmpty === true && isInputEmpty === true) && !(inputEmpty === false && isInputEmpty === false))
            setIsInputEmpty(inputEmpty)
    }

    const addOrder = (event: any) => {
        props.closeWindowHandler(event)
        if (inputRef.current)
            dispatch(addNewOrder({ orderNumber: inputRef.current['value'], orderType: activeWindow.orderType }))
    }

    const changeActiveWindow = (window: WindowType) => {
        if (activeWindow.orderType == window.orderType)
            setActiveWindow(unallocatedWindow)
        else
            setActiveWindow(window)
    }

    return (
        <div className={style.wrapper}>
            <input type="text" placeholder='Введите номер заказа' className={style['order-number-input']}
                ref={inputRef} onChange={changeIsInputEmpty} />

            <div className={style['windows_container']}>
                <div className={`${style['window']} ${activeWindow.orderType == unallocatedWindow.orderType ? style['active'] : ''}`}
                    onClick={() => changeActiveWindow(unallocatedWindow)}
                >
                    <p style={{ textAlign: 'center' }}>Нераспред заказы</p>
                </div>
                {
                    windows.map((window) => (
                        <div className={`${style['window']} ${activeWindow.orderType == window.orderType ? style['active'] : ''}`}
                            onClick={() => changeActiveWindow(window)}
                        >
                            {window.iconRender(style)}
                            <p>{window.name}</p>
                        </div>
                    ))
                }
            </div>
            <button className={style['add-order-button']} onClick={addOrder} disabled={isInputEmpty}>Добавить</button>
        </div>
    );
}

export default withModalWindow(AddOrder);