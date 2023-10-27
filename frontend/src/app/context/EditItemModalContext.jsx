'use client'
import {createContext, useReducer} from 'react';

export const EditItemModalContext = createContext(null); 

export function editItemModalReducer(prevState, action) {
    switch(action.type) {
        case 'OPEN_MODAL':
            return ({
                openModal: true,
                itemData: action.payload,
            });
        case 'CLOSE_MODAL':
            return {
                openModal: false,
                itemData: {
                    type: '', 
                    name: '',
                    description: '', 
                    stickerPrice: {$numberDecimal: "0"},
                    stock: 0
                }
            }; 
        default: 
            return prevState;
    } 
}

export function EditItemModalContextProvider({children}) {
    const [state, modalDispatch] = useReducer(editItemModalReducer, {
        openModal: false,
        itemData: {
            type: '', 
            name: '',
            description: '', 
            stickerPrice: {$numberDecimal: "0"},
            stock: 0
        }
    })

    return (
        <EditItemModalContext.Provider value={{state, modalDispatch}}>
            {children}
        </EditItemModalContext.Provider>
    )
};