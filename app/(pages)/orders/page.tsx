'use client'
import { useState } from 'react';
import style from './style.module.scss'
import { FaAngleDown } from "react-icons/fa6";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/(storage)/store';
import AddOrder from '@/app/(components)/addOrder/addOrder';
import { OrderType } from '@/app/assets/types';

function Orders() {

    const orders = useSelector((state: RootState)=> state.orders.orders)

    const [ addOrderWindowOpen, setAddOrderWindowOpen ] = useState(false)

    const [ dragedOrder, setDragedOrder ] = useState()

    const windows = [
        {name: 'Сборка', icon: <FaPeopleCarryBox className={style['header__icon']} />},
        {name: 'В корзине', icon: <FaShoppingCart className={style['header__icon']} />},
        {name: 'В машине', icon: <FaCar className={style['header__icon']} />}
    ]

    const renderWindows = windows.map((element)=>{

        const [dropMenuOpen, setDropMenuOpen] = useState(false)

        return(
            <div className={style['window']} key={element.name} draggable={false} 
                onDragOver={(e)=>dragOverHandler(e, element)}
                onDragLeave={(e)=>dragLeaveHandler(e, element)}
                // onDrop={(e)=>dropHandler(e, element)}
            >
                <header className={style['widow__header']} onClick={()=>setDropMenuOpen(prev=>prev?false:true)}>
                    <div className={style['header__info']}>
                        {element.icon}
                        <p>{element.name}</p>
                    </div>
                    <FaAngleDown className={style['header__drop-menu']} style={{transform: dropMenuOpen?'rotate(180deg)':'rotate(0deg)'}}/>
                </header>
                <div className={style['drop-menu']} style={{height: dropMenuOpen?'20vh':'0', minHeight: dropMenuOpen?'20vh':'0'}}>

                </div>
            </div>
        )
    })

    const dragStartEventHandler = ( event: any, order: OrderType ) => {
        event.target.style.opacity = '50%' 
    }

    const dragEndEventHandler = ( event: any, order: OrderType ) => {
        event.preventDefault()
        event.target.style.opacity = '100%' 
    }


    const dragOverHandler = ( event: any, window: any) => {
        // event.preventDefault()
        event.target.style.background = 'rgb(24, 24, 24)'
        // console.log('drop to:', window)
    }

    const dragLeaveHandler = ( event: any, window: any) => {
        // event.preventDefault()
        event.target.style.background = 'rgb(36, 36, 36)'
        // console.log('drop to:', window)
    }

    const dropHandler = ( event: any, window: any) => {
        // event.preventDefault()
        event.target.style.background = 'rgb(36, 36, 36)'
        // console.log('drop to:', window)
    }


    const renderOrders = orders.unallocated.map((order)=>(
        <div className={style.order} style={{background: order.color}} draggable
            onDragStart={(e)=>dragStartEventHandler(e, order)}
            onDragEnd={(e)=>dragEndEventHandler(e, order)}
        >
            <p>{order.orderNumber}</p>
        </div>
    ))

    return (
        <main className={style.wrapper}>
            {addOrderWindowOpen&&<AddOrder closeWindow={()=>setAddOrderWindowOpen(false)} />}
            <div className={style['add-order']}>
                <button className={style['add-order__button']} onClick={()=>setAddOrderWindowOpen(true)}>Добавить номер заказа</button>
            </div>
            {orders.unallocated.length>0 && 
            <div className={style['unallocated-orders']}>
                <div className={style['window-unll-orders']}>
                    <p className={'unallocated-orders__title'}>Нераспределенные заказы</p>
                    <div className={style['orders-container']}>{ renderOrders }</div>
                </div>
            </div>}
            {renderWindows}
        </main>
    );
}

export default Orders;