import withModalWindow from '@/app/assets/HOCs/ModalWindow/withModalWindow';
import React, { useRef } from 'react';
import style from './style.module.scss'
import { addNewOrder } from '@/app/(storage)/reducers/orders';
import { useDispatch } from 'react-redux';

type PropsType = {
    closeWindowHandler: any
}

function AddOrder(props: PropsType) {

    const inputRef = useRef(null)
    const dispatch = useDispatch()

    const addOrder = (event: any) => {
        props.closeWindowHandler(event)
        if(inputRef.current)
            dispatch(addNewOrder(inputRef.current['value']))
    }

    return (
        <div className={style.wrapper}>
            <input type="text" placeholder='Введите номер заказа' className={style['order-number-input']} ref={inputRef} />
            <button className={style['add-order-button']} onClick={addOrder}>Добавить</button>
        </div>
    );
}

export default withModalWindow(AddOrder);