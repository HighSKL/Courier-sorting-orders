export const formatNumber = (phoneNumber: string) => {

    if(phoneNumber.length > 10)
        phoneNumber = phoneNumber.slice(0, 10)

    let formatNum = '+ 7 ('
    
    if(phoneNumber == '')
        return formatNum

    if (phoneNumber.length > 3) {
        formatNum += phoneNumber.substring(0, 3) + ') '
        if (phoneNumber.length > 3 && phoneNumber.length < 6) {
            const cutPN = phoneNumber.slice(3)
            formatNum += cutPN
        }
        else if (phoneNumber.length >= 6) {
            const cutPN = phoneNumber.slice(3, 6)
            formatNum += cutPN
            formatNum += cutPN.substring(3, 3) + '-'
        }
        if (phoneNumber.length >= 7 && phoneNumber.length < 8) {
            const cutPN = phoneNumber.slice(6,8)
            formatNum += cutPN
        }
        else if (phoneNumber.length >= 8) {
            const cutPN = phoneNumber.slice(6,8)
            formatNum += cutPN
            formatNum += cutPN.substring(6, 2) + '-'
        }
        if (phoneNumber.length >= 9 && phoneNumber.length < 11) {
            const cutPN = phoneNumber.slice(8)
            formatNum += cutPN
        }
    }
    else
        formatNum += phoneNumber

    return formatNum
}

export const random = (max: number = 9999) => Math.floor(Math.random()*max)