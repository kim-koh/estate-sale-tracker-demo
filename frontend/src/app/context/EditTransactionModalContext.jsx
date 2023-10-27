'use client'

import { createContext, useReducer } from "react";

export const EditTransactionModalContext = createContext(null); 

export function editTransactionModalReducer(prevState, action) {
    switch(action.type) {
        case 'OPEN_MODAL':
            return{
                ETModalOpen: true,
                transactionData: action.payload
            };
        case 'CLOSE_MODAL':
            return {
                ETModalOpen: false,
                transactionData: {
                    purchaseInfo: [
                        {
                            itemID: '',
                            quantity: 0,
                            price: 0
                        }
                    ],
                    totalPrice: 0,
                    formOfPayment: 'Cash',
                    notes: ''
                }
            }
        default:
            return prevState;
    }
}

export function EditTransactionModalContextProvider({children}) {
    const [state, ETModalDispatch] = useReducer(editTransactionModalReducer, {
        ETModalOpen: false, 
        transactionData: {
            purchaseInfo: [
                {
                    itemID: '',
                    quantity: 0,
                    price: 0
                }
            ],
            totalPrice: 0,
            formOfPayment: 'Cash',
            notes: ''
        }
    })

    return (
        <EditTransactionModalContext.Provider value={{state, ETModalDispatch}}>
            {children}
        </EditTransactionModalContext.Provider>
    )
}