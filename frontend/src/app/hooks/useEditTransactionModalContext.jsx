import {EditTransactionModalContext} from '../context/EditTransactionModalContext'; 
import { useContext } from 'react';

export function useEditTransactionModalContext() {
    const context = useContext(EditTransactionModalContext); 

    if (!context) {
        throw Error('not within the scope of EditTransactionModalContextProvider')
    }
    return context; 
}