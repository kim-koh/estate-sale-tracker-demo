import NewTransactionRow from './NewTransactionRow';
import styles from '../../../styles/LineItemsInput.module.css'
import formStyles from '../../../styles/Form.module.css'
import { useEditTransactionModalContext } from '../../../hooks/useEditTransactionModalContext'

function LineItemsInput(props) {
    const {state, ETModalDispatch} = useEditTransactionModalContext();
    const {ETModalOpen, transactionData} = state; 
    const purchaseInfo = props.purchaseInfo;
    const totalPrice = props.totalPrice; 
    
    return(
        <div className={styles.lineItemsContainer}>
            <table>
                <thead>
                    <tr>
                        <th width='60%'>Item</th>
                        <th width='15%'>Quantity</th>
                        <th width='20%'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {purchaseInfo.map((lineItem, index) => {
                        return(<NewTransactionRow
                            key = {`${index} ${lineItem.itemID}`}
                            index = {index}
                            itemID = {lineItem.itemID}
                            name = {lineItem.name}
                            quantity = {lineItem.quantity}
                            price = {lineItem.price}
                            handleAdd = {props.addLineItem}
                            updatePurchaseInfo = {props.updatePurchaseInfo}
                            isLastRow = {index == purchaseInfo.length -1}
                            itemsAreFinalized = {props.itemsAreFinalized}
                            submitted = {props.submitted}
                        />)
                    })}
                    
                </tbody>
            </table>
            
            <div className={styles.totalContainer}>
                <button 
                    className={`${styles.totalBtn} btn`}
                    type = "button"
                    onClick={props.showTotalPrice}
                >Calculate Total:</button>
                <input 
                    className={`${styles.totalInput} ${formStyles.formInput}`}
                    placeholder="Total"
                    value={`$${totalPrice}`}
                    readOnly={true}
                />
                <div className={styles.discountsContainer}>
                    {/* in the future, allow client to customize and display discount logic from a variable/state/database */}
                    {(totalPrice >= 50 && (purchaseInfo.length > 2 || (purchaseInfo.length > 1 && purchaseInfo.slice(-1)[0].itemID != ''))) && 
                        <button 
                            type = "button"
                            className={styles.discount}
                            onClick={(event) => {
                                props.applyDiscount()
                                event.target.disabled = true; 
                                event.target.style.pointerEvents = 'none'; 
                            }}
                        >APPLY 10% OFF</button>
                    }
                </div>
            </div>

            {ETModalOpen ? null : 
                <button 
                    className={`${styles.contBtn}`}
                    type="button"
                    onClick={props.completeSection}
                >↓ Continue ↓</button>
            }
            
            
        </div>
    )
}

export default LineItemsInput;