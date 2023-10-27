'use client'

import {InventoryContextProvider} from "./context/InventoryContext.jsx";
import { EditItemModalContextProvider } from "./context/EditItemModalContext";
import { TransactionContextProvider } from "./context/TransactionsContext";
import { EditTransactionModalContextProvider} from './context/EditTransactionModalContext.jsx'
import {NewItemModalContextProvider} from './context/NewItemModalContext';

export function Providers({children}) {
    return (
        <InventoryContextProvider>
            <TransactionContextProvider>
                <EditItemModalContextProvider>
                    <EditTransactionModalContextProvider>
                        <NewItemModalContextProvider>
                            {children}
                        </NewItemModalContextProvider>
                    </EditTransactionModalContextProvider>
                </EditItemModalContextProvider>
            </TransactionContextProvider>
        </InventoryContextProvider>
    )
}