import {InventoryContext} from "../context/InventoryContext";
import { useContext } from "react";

export function useInventoryContext() {
    const context = useContext(InventoryContext);

    if (!context) {
        throw Error('not within scope of InventoryContextProvider')
    }
    return context;
}