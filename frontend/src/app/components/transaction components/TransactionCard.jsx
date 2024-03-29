import styles from '../../styles/Card.module.css';
import Image from 'next/image';
import { useInventoryContext } from '../../hooks/useInventoryContext';
import { useTransactionContext } from '../../hooks/useTransactionContext';
import { useEditTransactionModalContext } from '../../hooks/useEditTransactionModalContext';

import editIcon from '../../public/icons8-edit-24 (1).png';
import trashIcon from '../../public/icons8-trash-24.png';

function TransactionCard({transactionIndex}) {
    const {ETModalDispatch} = useEditTransactionModalContext();
    const {inventory, dispatch} = useInventoryContext(); 
    const {transactions, transactionDispatch} = useTransactionContext(); 
    const thisTransaction = transactions[transactionIndex];

    function editTransaction() {
        ETModalDispatch({type: 'OPEN_MODAL', payload: thisTransaction})
    }

    function deleteTransaction() {
        const shouldDelete = confirm("Are you sure you want to delete this item?")

        if (shouldDelete) {
             transactionDispatch({type: 'DELETE_TRANSACTION', payload: transactionIndex});

             const newStockNums = []; 
             thisTransaction.purchaseInfo.forEach(lineItem => {
                const id = lineItem.itemID
    
                const foundItem = inventory.find(item => item._id === lineItem.itemID);
                const existingStock = foundItem.stock
    
                const qtyToAdd = lineItem.quantity
    
                const newStock = existingStock + qtyToAdd
    
                newStockNums.push({id, newStock});
            })
            dispatch({type: 'UPDATE_STOCK', payload: newStockNums})
        }
    }

    return(
        <div className={styles.card}>
            
        <div className={`${styles.primaryInfo}`}>
            <div >
                <h3 style={{marginBottom: 0}}>Total: ${thisTransaction.totalPrice}</h3>
            </div>
            <div>
                <p>Paid with: {thisTransaction.formOfPayment}</p>
            </div> 
        </div>
        
        <div className={`${styles.secondaryInfo}`}>
            <table className={`${styles.table}`}>
                <thead>
                    <tr>
                        <th width="60%">Item</th>
                        <th width="20%">Quantity</th>
                        <th width='20%'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {thisTransaction.purchaseInfo.map((transactionItem) => {
                        const inventoryItem = inventory.find((saleItem) => transactionItem.itemID === saleItem._id)
                        return(
                            <tr key={`${inventoryItem._id} ${inventoryItem.code}`}>
                                <td>{inventoryItem.code} {inventoryItem.name}</td>
                                <td className={`${styles.quant}`}>{transactionItem.quantity}</td>
                                <td className={`${styles.quant}`}>${transactionItem.price}</td>
                            </tr> 
                        )
                    })}
                </tbody>
            </table>
        </div>

        <div className={styles.tertiaryInfo}>
            <p>{thisTransaction.createdAt}</p> 
        </div>

        <div className={`${styles.edit}`}>
                <button 
                    className={`btn ${styles.btnSecondary}`}
                    onClick={editTransaction}
                >
                    <Image src={editIcon} alt="pencil icon, edit item"/>
                </button> 
                <button
                    className={`btn ${styles.btnSecondary} ${styles.lowerBtn}`}
                    onClick={deleteTransaction}
                >
                    <Image src={trashIcon} alt="trash bin icon, delete item"/>
                </button>
        </div>

    </div>
    )
}

export default TransactionCard; 