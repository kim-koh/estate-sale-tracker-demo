'use client'
import { createContext, useReducer } from "react";
import { demoTransactions } from "../demoData";

export const TransactionContext = createContext(null); 

export function transactionReducer(prevState, action) {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            const formattedTransactions = action.payload.map((transaction) => ({
                ...transaction, 
                totalPrice: parseFloat(transaction.totalPrice),
                purchaseInfo: transaction.purchaseInfo.map((lineItem) => ({
                    ...lineItem,
                    price: parseFloat(lineItem.price)
                }))
            }))
            return {transactions: formattedTransactions};
        case 'CREATE_NEW_TRANSACTION':
            return {transactions: [action.payload, ...prevState.transactions]}
        case 'EDIT_TRANSACTION': 
            const updatedTransactions  = [...prevState.transactions];
            const searchIndex = updatedTransactions.findIndex((t) => t._id === action.payload._id);
            const itemToUpdate = updatedTransactions[searchIndex]
            updatedTransactions[searchIndex] = {
                ...itemToUpdate,
                ...action.payload}; 
            return {transactions: updatedTransactions}
        case 'DELETE_TRANSACTION':
            const index = action.payload; 
            const newTransactions = [...prevState.transactions];
            newTransactions.splice(index, 1); 
            return {transactions: newTransactions}
        default:
            return prevState;
    }
}

export function TransactionContextProvider({children}) {
    const [state, transactionDispatch] = useReducer(transactionReducer, {
        transactions: [...demoTransactions]
    });

    return <TransactionContext.Provider value={{...state, transactionDispatch}}>
        {children}
    </TransactionContext.Provider>
}