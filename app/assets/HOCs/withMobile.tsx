'use client'

import { useState, useEffect } from "react"
import DesktopBlockerWindow from "../DesktopBlockerWindow/DesktopBlockerWindow"


type injectedProps = {}

export default function withMobile<T extends injectedProps>(WrappedComponent: React.ComponentType<T>) {
    return (props: T) => {

        const [isBlockWindowOpen, setIsBlockWindowOpen] = useState(false)

        useEffect(() => {
            if (window.innerWidth > 767)
                setIsBlockWindowOpen(true)
        }, [])

        return (
            <>
                {isBlockWindowOpen ? <DesktopBlockerWindow /> : <WrappedComponent {...props} />}
            </>
        )
    }
}