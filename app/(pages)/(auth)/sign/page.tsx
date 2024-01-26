'use client'
import { useRef, useState } from 'react';
import style from './style.module.scss'
import { formatNumber } from '@/app/assets/functions';

function Sign() {

    const [phoneNumber, setPhoneNumber] = useState('+ 7 (')

    const [requestSended, setRequestSended] = useState(false)

    const phoneNumberRef = useRef(null)
    const passwordFieldRef = useRef(null)

    const validatePhoneNumberInput = () => {
        if (phoneNumberRef.current) {
            const value = phoneNumberRef.current['value'] as string
            let formatted = value.replace('+ 7 ', '').replace('(', '').replace(')', '').replace(/\-/g, '').replace(' ', '').replace('+7', '')
            if(formatted == phoneNumber.replace('+ 7 ', '').replace('(', '').replace(')', '').replace(/\-/g, '').replace(' ', ''))
                formatted = formatted.slice(0, formatted.length-1)
            if(formatted == '')
                setPhoneNumber(formatNumber(''))
            if (parseInt(formatted) as number && formatted != '')
                setPhoneNumber(formatNumber(formatted))
        }
    }

    const sendRequest = () => {
        setRequestSended(true)
    }

    return (
        <main className={style.wrapper}>
            <h1 className={style['header-text']}>Вход</h1>
            <form className={style['auth-form']}>
                <p className={style['auth-form__field-text']}>Номер телефона</p>
                <input type="tel" name='phoneNumber' className={style['auth-form__filed']}
                    value={phoneNumber}
                    ref={phoneNumberRef}
                    onChange={validatePhoneNumberInput}
                />
                <p className={style['auth-form__field-text']}>Пароль</p>
                <input ref={passwordFieldRef} type="password" name='password' className={style['auth-form__filed']} />
                <button onClick={sendRequest} disabled={requestSended} type="button" className={style['auth-form__button']}>Войти</button>
            </form>
        </main>
    );
}

export default Sign;