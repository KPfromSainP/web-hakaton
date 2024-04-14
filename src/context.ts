import React, { Dispatch, SetStateAction } from "react"

type cont = {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export const Context = React.createContext<any>(null)