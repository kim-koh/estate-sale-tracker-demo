import {NewItemModalContext} from '../context/NewItemModalContext';
import { useContext } from 'react';

export function useNewItemModalContext() {
    const context = useContext(NewItemModalContext);

    if (!context) {
        throw Error('not within the scope of NewItemModalContextProvider')
    }
    return context; 
}