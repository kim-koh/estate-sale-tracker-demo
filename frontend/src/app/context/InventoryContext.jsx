'use client'
import {createContext, useReducer} from 'react';

export const InventoryContext = createContext(null);

export function inventoryReducer(prevState, action) {
    switch (action.type) {
        case 'SET_INVENTORY':
            return {inventory: action.payload};
        case 'SORT_INVENTORY': 
            const inventory = [...prevState.inventory]
            const sortedInventory = inventory.sort((a, b) => {
                if (a.code.charAt(0) < b.code.charAt(0)) {
                    return -1; 
                } else if (a.code.charAt(0) === b.code.charAt(0)) {
                    const numA = parseInt(a.code.substring(1));
                    const numB = parseInt(b.code.substring(1)); 
                    if (numA < numB) {
                        return -1;
                    } else if (numA === numB) {
                        return 0;
                    } else { //numA > numB
                        return 1; 
                    }
                }
            })
            return {inventory: sortedInventory};
        case 'CREATE_NEW_ITEM':
            return {inventory:[action.payload.data, ...prevState.inventory]};
        case 'EDIT_ITEM':
            const updateInventory = [...prevState.inventory];
            const searchIndex = [...updateInventory].findIndex((item) => item.code === action.payload.code);
            const itemToEdit = updateInventory[searchIndex];
            const updatedItem = {
                ...itemToEdit,
                ...action.payload
            }
            updateInventory[searchIndex] = updatedItem;
            return {inventory: updateInventory}
        case 'DELETE_ITEM':
            const updatedInventory = [...prevState.inventory].filter((item) => item.code != action.payload.code)
            return {inventory: updatedInventory}
        case 'UPDATE_STOCK':
            const newStockInventory = [...prevState.inventory]
            action.payload.forEach(item => {
                const searchIndex = [...prevState.inventory].findIndex(i => i._id === item.id);
                newStockInventory[searchIndex].stock = item.newStock
            })
        default:
            return prevState; 
    }
}

export function InventoryContextProvider({children}) {
    const [state, dispatch] = useReducer(inventoryReducer, {
        inventory: []
    });

    return(
        <InventoryContext.Provider value={{...state, dispatch}}>
            {children}
        </InventoryContext.Provider>
    )
};
