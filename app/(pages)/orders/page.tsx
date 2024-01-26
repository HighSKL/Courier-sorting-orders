'use client'
import { useState } from 'react';
import style from './style.module.scss'
import { FaAngleDown } from "react-icons/fa6";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";

function Orders() {

    const windows = [
        {name: 'Сборка', icon: <FaPeopleCarryBox className={style['header__icon']} />},
        {name: 'В корзине', icon: <FaShoppingCart className={style['header__icon']} />},
        {name: 'В машине', icon: <FaCar className={style['header__icon']} />}
    ]

    const renderWindows = windows.map((element)=>{

        const [dropMenuOpen, setDropMenuOpen] = useState(false)

        return(
            <div className={style['window']}>
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

    return (
        <main className={style.wrapper}>
            {renderWindows}
        </main>
    );
}

export default Orders;