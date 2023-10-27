import { useState, useEffect } from "react";
import axios from "axios";

import styles from "../../styles/Form.module.css"
import { useTransactionContext } from "../../hooks/useTransactionContext";
import LineItemsInput from '../transaction components/nt form components/LineItemsInput'
import { useNewItemModalContext } from "@/app/hooks/useNewItemModalContext";

function NewTransactionForm() {
    const [error, setError] = useState(null); 
    const {transactionDispatch} = useTransactionContext(); 
    const {state, modalDispatch} = useNewItemModalContext(); 
    const {openModal, rowIndex, newItem} = state; 

    const [purchaseInfo, setPurchaseInfo] = useState([{itemID: '', name: '', quantity: 1, price: 0.00}]);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [paidAmt, setPaidAmt] = useState(''); 
    const [paymentForm, setPaymentForm] = useState('Cash'); 
    const [itemsAreFinalized, setItemsFinalized] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null); 

        if (purchaseInfo[purchaseInfo.length -1].itemID === '') {
            purchaseInfo.pop()
        }
        const newTransaction = {
            "purchaseInfo": [...purchaseInfo],
            "totalPrice": totalPrice,  
            "formOfPayment": paymentForm,
        }

        await axios.post("/api/transaction", newTransaction)
            .then ((response) => {
                setSubmitted(true);
                setPurchaseInfo([]);
                setTotalPrice(0);
                setPaymentForm('Cash');
                setItemsFinalized(false)
                transactionDispatch({type: 'CREATE_NEW_TRANSACTION', payload: response.data});
                modalDispatch({type: 'RESET_MODAL'})
            })
            .catch((error) => {
                const errMessage = error.response;
                setError(errMessage.error);  
            })

    };

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
        const testArray = [...purchaseInfo]
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

    useEffect(() => { 
        if (newItem) {
            setPurchaseInfo((prevState) => {
                const newState = [...prevState];
                newState[rowIndex] = {itemID: newItem.id, name: newItem.code + ' ' + newItem.name, quantity: 1, price: parseFloat(newItem.price)};
                return newState; 
            })
        }
       
    }, [openModal, rowIndex, newItem])

    function calculateTotalPrice() {
        let total = 0; 
        console.log(purchaseInfo)
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

    function completeSection1() {
        setItemsFinalized(true); 
    }

    return(
        <div className="form-container">
            <form 
                className={styles.createNew} 
                autoComplete="off"
            >
                <h3>New Transaction</h3>

                <LineItemsInput
                    purchaseInfo = {purchaseInfo}
                    totalPrice = {totalPrice}
                    addLineItem = {addLineItem}
                    updatePurchaseInfo = {updatePurchaseInfo}
                    showTotalPrice = {calculateTotalPrice}
                    applyDiscount = {applyDiscount}
                    completeSection = {completeSection1}
                    itemsAreFinalized={itemsAreFinalized}
                    submitted = {submitted}
                />
                
                <div style={itemsAreFinalized ? {visibility: 'visible'}: {visibility: 'hidden'}}>
                    <div >
                        <table className={styles.formInput}>
                            <caption>Change Calculator</caption>
                            <tbody>
                                <tr>
                                    <td width="50%">Total:</td>
                                    <td width="50%">${totalPrice}</td>
                                </tr>
                                <tr>
                                    <td>Customer paid:</td>
                                    <td>$<input
                                        type="number"
                                        step="0.01"
                                        onChange={(e) => setPaidAmt(e.target.value)}
                                        value={paidAmt}
                                    ></input></td>
                                </tr>
                                <tr>
                                    <td>Change due:</td>
                                    {paidAmt != '' && <td>${paidAmt-totalPrice}</td>}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div>
                        <label>Form of payment: </label>
                        <select 
                            name="paymentForm" 
                            onChange={(e) => setPaymentForm(e.target.value)}
                            value={paymentForm}
                            className={styles.formInput}
                            required
                        >
                            <option value="Cash">Cash</option>
                            <option value="Credit Card - Square">Credit Card - Square</option>
                            <option value="Zelle">Zelle</option>
                            <option value="Venmo">Venmo</option>
                        </select>  
                    </div>
                     
                    <button 
                        className={`btn ${styles.completeBtn}`}
                        onClick={handleSubmit}
                    >Complete</button>
                </div>
                {error && <div className={styles.error}>Error: {error}</div>}
            </form>
        </div>
    ) 
}

export default NewTransactionForm;