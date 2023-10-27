'use client' 
import { createContext, useReducer } from "react";

export const NewItemModalContext = createContext(null); 

export function newItemModalReducer(prevState, action) {
    switch(action.type) {
        case 'OPEN_MODAL':
            return {openModal: true, rowIndex: action.payload};
        case 'CLOSE_MODAL':
            let item; 
            if (!action.payload) {item = {
                code: '', 
                name: '', 
                price: 0
            }} else {
                item = {
                    id: action.payload._id,
                    code: action.payload.code,
                    name: action.payload.name,
                    price: action.payload.stickerPrice.$numberDecimal
                }
            }
            return {
                openModal: false,
                rowIndex: prevState.rowIndex,
                newItem: item
            };
        case 'RESET_MODAL': 
            return {
                openModal: false, 
                rowIndex: 0, 
                newItem: {
                id: '',
                code: '', 
                name: '', 
                price: 0
            }}
        default: 
            return prevState;
    }
}

export function NewItemModalContextProvider({children}) {
    const [state, modalDispatch] = useReducer(newItemModalReducer, {
        openModal: false,
        rowIndex: 0,
        newItem: {
            id: '',
            code: '', 
            name: '', 
            price: 0
        }
    })

    return(
        <NewItemModalContext.Provider value={{state, modalDispatch}}>
            {children}
        </NewItemModalContext.Provider>
    )
}
