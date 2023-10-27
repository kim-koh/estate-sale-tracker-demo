import { useState, useEffect } from 'react';
import axios from "axios"; 

import styles from '../../styles/EditItemModal.module.css'
import formStyles from '../../styles/Form.module.css'
import { useEditTransactionModalContext } from '../../hooks/useEditTransactionModalContext';
import { useInventoryContext } from '../../hooks/useInventoryContext';
import { useTransactionContext } from '@/app/hooks/useTransactionContext';

import LineItemsInput from './nt form components/LineItemsInput';

function EditTransactionModal() {
    const {state, ETModalDispatch} = useEditTransactionModalContext(); 
    const {ETModalOpen, transactionData} = state; 
    const {inventory, dispatch} = useInventoryContext(); 
    const {transactions, transactionDispatch} = useTransactionContext(); 
    const [error, setError] = useState(null);

    const [purchaseInfo, setPurchaseInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [paymentForm, setPaymentForm] = useState(transactionData.formOfPayment); 
    const [itemsAreFinalized, setItemsFinalized] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => { 
        if (transactionData.purchaseInfo && inventory.length > 0) {
            setPurchaseInfo(() => {
                const formattedPI = transactionData.purchaseInfo
                formattedPI.forEach((lineItem, index) => {
                    const inventoryItem = inventory.find(item => item._id === lineItem?.itemID);
                    if (inventoryItem) {
                        const name = inventoryItem.code + ' ' + inventoryItem.name;
                        formattedPI[index] = {itemID: lineItem.itemID, name: name, quantity: lineItem.quantity, price: parseFloat(lineItem.price)}
                    } 
                })
                return formattedPI;
            })
            setTotalPrice(transactionData.totalPrice);
            setPaymentForm(transactionData.formOfPayment);
        }  
    }, [transactionData])
    
    function addLineItem(event, index, itemID, name, quantity, price) {
        const newLineItem = {itemID: itemID, name: name, quantity: quantity, price: price}
        setPurchaseInfo((prevState) => {
            const newState = [...prevState]
            newState[index] = newLineItem; 
            newState.push({itemID: '', name: '', quantity: 1, price: 0});
            return(newState);
        });
    }

    function updatePurchaseInfo(index, attr, newValue, itemID) {
        let newState = []
        setPurchaseInfo((prevState) => {
            newState = [...prevState];
            let additions = {}
            
            if (attr === 'name') {additions = {itemID: itemID, name: newValue}}
            else if (attr === 'quantity') {additions = {quantity: newValue}}
            else if(attr === 'price') {additions = {price: newValue}};
            
            newState[index] = {...prevState[index], ...additions};
            return(newState);
        })
    };

    function calculateTotalPrice() {
        let total = 0; 
        purchaseInfo.forEach(lineItem => {
            total = total + parseInt(lineItem.quantity)*parseFloat(lineItem.price); 
        })
        setTotalPrice(total); 
    }

    function applyDiscount() {
        setTotalPrice((prevTotal) => {
            const newTotal = Math.round(prevTotal*0.9*100)/100;
            return(newTotal)
        })
    }

    async function handleSave(e) {
        e.preventDefault(); 
        setError(null); 

        //format purchase info
        const formattedPI = purchaseInfo.map(lineItem => ({
            ...lineItem, 
            price: {$numberDecimal: String(lineItem.price)}
        }));
        
        //calculate total 
        let total = 0; 
        purchaseInfo.forEach(lineItem => {
            total = total + parseInt(lineItem.quantity)*parseFloat(lineItem.price); 
        }) 

        //create array of current of relevant item ids and new item stock qty
        const newStockNums = [];                                              
        transactionData.purchaseInfo.forEach(lineItem => {
            const id = lineItem.itemID

            const foundItem = inventory.find(item => item._id === lineItem.itemID);
            const existingStock = foundItem.stock

            const oldQty = lineItem.quantity

            const newQtyItem = purchaseInfo.find(item => item.itemID === lineItem.itemID);
            const newQty = newQtyItem.quantity;

            const newStock = existingStock + oldQty - newQty

            newStockNums.push({id, newStock});
        })

        const body = {
            "newInfo": {
                "purchaseInfo": formattedPI,
                "totalPrice": {$numberDecimal: String(total)},
                "formOfPayment": paymentForm,
            },
            "stockInfo": newStockNums
        }

        await axios.patch(`/api/transaction/${transactionData._id}`, body)
            .then((response) => {
                const updatedTransaction = response.data
                transactionDispatch({type: 'EDIT_TRANSACTION', payload: updatedTransaction})
                dispatch({type: 'UPDATE_STOCK', payload: newStockNums})
                ETModalDispatch({type: 'CLOSE_MODAL'})
            })
            .catch(err => {
                console.log(err); 
                setError(err);
            })
    }


    if (!ETModalOpen) {
        return null; 
    } else {
        return( 
            <div className='overlay'>
                <div className={styles.container}>
                    <form className={styles.edit}>
                        
                    <LineItemsInput
                        purchaseInfo = {purchaseInfo}
                        totalPrice = {totalPrice}
                        addLineItem = {addLineItem}
                        updatePurchaseInfo = {updatePurchaseInfo}
                        showTotalPrice = {calculateTotalPrice}
                        applyDiscount = {applyDiscount}
                        itemsAreFinalized={itemsAreFinalized}
                        submitted = {submitted}
                    />

                        <div>
                            <label>Form of payment: </label>
                            <select 
                                name="paymentForm" 
                                onChange={(e) => setPaymentForm(e.target.value)}
                                value={paymentForm}
                                className={formStyles.formInput}
                            >
                                <option value="Cash">Cash</option>
                                <option value="Credit Card - Square">Credit Card - Square</option>
                                <option value="Zelle">Zelle</option>
                                <option value="Venmo">Venmo</option>
                            </select>  
                        </div>

                        <div >
                            <div className={``}>
                                <button className={`btn`} onClick={handleSave}>Save</button>
                                <button className={`btn`} onClick={() => ETModalDispatch({type: 'CLOSE_MODAL'})}>Cancel</button>  
                            </div>
                        </div>

                        {error && <div className={styles.error}>Error: {error}</div>}
                    </form>
                </div>
            </div>
        )
    }
}

export default EditTransactionModal; 