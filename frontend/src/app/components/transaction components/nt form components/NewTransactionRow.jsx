import { useState } from 'react';

import styles from '../../../styles/Form.module.css';
import { useInventoryContext } from "../../../hooks/useInventoryContext";
import { useNewItemModalContext} from '../../../hooks/useNewItemModalContext';

function NewTransactionRow(props) {
    const {inventory} = useInventoryContext(); 
    const {modalDispatch} = useNewItemModalContext();

    const [filter, setFilter] = useState('');
    const [itemID, setItemID] = useState(props.itemID);
    const [name, setName] = useState(props.name);
    const [quantity, setQuantity] = useState(props.quantity);
    const [price, setPrice] = useState(props.price);
    let inventoryToSuggest = []; 

    // useEffect(() => {
    //     setFilter(''); 
    //     setItemID(props.itemID); 
    //     setName(props.name); 
    //     setQuantity(props.quantity);
    //     setPrice(props.price); 
    // }, [props.submitted])

    //autosuggestion feature
    function searchIsValidName() {
        let validName = false; 
        inventory.forEach(item => { 
            if (item.name.toLowerCase().replace(/\s+/g, '').includes(filter)) {validName = true;}
        });
        return validName;
    }

    function searchIsValidCode() {
        let validCode = false;
        if (filter.length > 4) {return validCode;}
        inventory.forEach(item => {
            if (item.code.toLowerCase().includes(filter)) {validCode = true;}
        });
        return validCode;
    }

    if (filter === '') {
        inventoryToSuggest = []; 
    } else if (searchIsValidCode()) {
        inventoryToSuggest = inventory.filter((item) => item.code.toLowerCase().includes(filter));
    } else if (searchIsValidName()) {
        inventoryToSuggest = inventory.filter((item) => item.name.toLowerCase().replace(/\s+/g, '').includes(filter));
    } 

    function setRowValue(selected) {
        setItemID(selected._id);
        setName(selected.code + ' ' + selected.name);
        setPrice(parseFloat(selected.stickerPrice.$numberDecimal));
        setFilter(''); 
        props.updatePurchaseInfo(props.index, 'name', selected.code + ' ' + selected.name, selected._id)
        props.updatePurchaseInfo(props.index, 'price', selected.stickerPrice.$numberDecimal, selected._id)
    }

    return(
            <tr>
                <td className={styles.autocompleteInput}> 
                    <input
                        className={`${styles.formInput}`}
                        type="text" 
                        onKeyUp={(e) => {
                            const flexibleFilter = e.target.value.toLowerCase().replace(/\s+/g, ''); 
                            setFilter(flexibleFilter)
                        }}
                        onChange={(e) => {
                            setName(e.target.value)
                            props.updatePurchaseInfo(props.index, 'name', e.target.value, itemID)
                        }}
                        value={name}
                        required
                        readOnly={props.itemsAreFinalized}
                    />
                    <div className={styles.autocomplete}>
                        {filter != '' &&
                            <div className={styles.autocompleteItems}>
                                {inventoryToSuggest.map((suggestion) => {
                                    return(
                                        <p
                                            key = {suggestion._id}
                                            className={styles.autocompleteItem}
                                            onClick={() => setRowValue(suggestion)}
                                        >
                                            {suggestion.code} {suggestion.name}
                                        </p>
                                    )
                                })}
                                <p 
                                    className={styles.autocompleteItem}
                                    onClick={() => {
                                        modalDispatch({type: 'OPEN_MODAL', payload: props.index});
                                        setFilter(''); 
                                    }}
                                >+ Add New Item</p>
                            </div>
                        }
                    </div>
                </td>
                <td>
                    <input
                        className={styles.formInput}
                        type = "number"
                        onChange={(e) => {
                            const quant = parseInt(e.target.value);
                            setQuantity(quant);
                            if (e.target.value != '') {
                                props.updatePurchaseInfo(props.index, 'quantity', quant, itemID);
                            }
                        }}
                        value = {quantity}
                        readOnly={props.itemsAreFinalized}
                    />
                </td>
                <td>
                    <input 
                        className={styles.formInput}
                        type="number"
                        step="0.01"
                        onChange={(e) => {
                            const price = parseFloat(e.target.value)
                            setPrice(price);
                            if (e.target.value != '') {
                                props.updatePurchaseInfo(props.index, 'price', price, itemID);
                            }  
                        }}
                        value={price}
                        readOnly={props.itemsAreFinalized}
                    />
                </td>
                <td>
                    {props.isLastRow ? 
                        <button 
                            className={`btn ${styles.newRow}`}
                            onClick={(event) => props.handleAdd(event, props.index, itemID, name, quantity, price)}
                            type="button"
                            disabled = {props.itemsAreFinalized}
                        >+</button>
                        :null
                    } 
                    
                </td>
            </tr>
    )
}

export default NewTransactionRow; 