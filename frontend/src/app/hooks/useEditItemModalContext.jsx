import {EditItemModalContext } from "../context/EditItemModalContext";
import { useContext } from "react";

export function useModalContext() {
    const context = useContext(EditItemModalContext);

    if (!context) {
        throw Error('not within the scope of EditItemModalContextProvider');
    }
    return context; 
}