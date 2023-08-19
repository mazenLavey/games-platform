import { createContext } from "react";

type Props = {
    children: React.ReactNode
}

const BlackjackContext = createContext({})


const BlackjackProvider: React.FC<Props> = ({children}) => {
    return(
        <BlackjackContext.Provider value={{}}>
            {children}
        </BlackjackContext.Provider>
    )
}

export {BlackjackContext, BlackjackProvider}