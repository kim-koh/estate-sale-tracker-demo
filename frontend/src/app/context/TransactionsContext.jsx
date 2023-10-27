'use client'
import { createContext, useReducer } from "react";

export const TransactionContext = createContext(null); 

export function transactionReducer(prevState, action) {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            const formattedTransactions = action.payload.map((transaction) => ({
                ...transaction, 
                totalPrice: parseFloat(transaction.totalPrice.$numberDecimal),
                purchaseInfo: transaction.purchaseInfo.map((lineItem) => ({
                    ...lineItem,
                    price: parseFloat(lineItem.price.$numberDecimal)
                }))
            }))
            return {transactions: formattedTransactions};
        case 'CREATE_NEW_TRANSACTION':
            return {transactions: [action.payload, ...prevState.transactions]}
        case 'EDIT_TRANSACTION': 
            const formattedUpdate = {
                ...action.payload, 
                totalPrice: parseFloat(action.payload.totalPrice.$numberDecimal),
                purchaseInfo: action.payload.purchaseInfo.map((lineItem) => ({
                    ...lineItem, 
                    price: parseFloat(lineItem.price.$numberDecimal)
                }))
            }
            const updatedTransactions  = [...prevState.transactions];
            const searchIndex = updatedTransactions.findIndex((t) => t._id === action.payload._id);
            updatedTransactions[searchIndex] = formattedUpdate; 
            return {transactions: updatedTransactions}
        default:
            return prevState;
    }
}

export function TransactionContextProvider({children}) {
    const [state, transactionDispatch] = useReducer(transactionReducer, {
        transactions: []
    });

    return <TransactionContext.Provider value={{...state, transactionDispatch}}>
        {children}
    </TransactionContext.Provider>
}