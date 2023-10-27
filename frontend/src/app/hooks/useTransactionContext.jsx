import { TransactionContext } from "../context/TransactionsContext";    
import { useContext } from "react";

export function useTransactionContext() {
    const context = useContext(TransactionContext); 

    if (!context) {
        throw Error('not within scope of TransactionContextProvider')
    }
    return context;
}