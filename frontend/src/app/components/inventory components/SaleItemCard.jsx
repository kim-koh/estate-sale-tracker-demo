import axios from "axios";

import styles from "../../styles/Card.module.css";
import Image from "next/image";
import editIcon from '../../public/icons8-edit-24 (1).png';
import trashIcon from '../../public/icons8-trash-24.png';
import { useInventoryContext } from "../../hooks/useInventoryContext";
import { useModalContext } from "../../hooks/useEditItemModalContext";

function SaleItem({item}) {
    const {modalDispatch} = useModalContext();
    const {dispatch} = useInventoryContext(); 

    function editItem() {
        modalDispatch({type: 'OPEN_MODAL', payload: item})
    };

    function deleteItem() {
        const shouldDelete = confirm("Are you sure you want to delete this item?")

        if (shouldDelete) {
            axios.delete(`/api/inventory/${item.code}`)
                .then(response => {
                    console.log(`Deleted ${item.code} ${item.name} from inventory.`)
                    dispatch({type: 'DELETE_ITEM', payload: item});
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return(
        <div className={styles.card}>
            
            <div className={`${styles.primaryInfo}`}>
                <div >
                    <h3 style={{marginBottom: 0}}>{item.code}</h3>
                </div>
                <div>
                    <h4>{item.name}</h4>
                </div> 
            </div>
            
            <div className={`${styles.secondaryInfo}`}>
                <p>Category: {item.type}</p>
                <p style={{color: item.saleStatus === "Available"? "green": "red"}}>Status: {item.saleStatus}</p>
                {item.onHold != null ? <p>item.onHold</p>: null}
                <p>{item.stock} units | ${item.stickerPrice.$numberDecimal}</p>
            </div>

            <div className={styles.tertiaryInfo}>
                <p>{item.description}</p> 
            </div>

            <div className={`${styles.edit}`}>
                    <button 
                        className={`btn ${styles.btnSecondary}`}
                        onClick={editItem}
                    >
                        <Image src={editIcon} alt="pencil icon, edit item"/>
                    </button> 
                    <button
                        className={`btn ${styles.btnSecondary} ${styles.lowerBtn}`}
                        onClick={deleteItem}
                    >
                        <Image src={trashIcon} alt="trash bin icon, delete item"/>
                    </button>
            </div>

        </div>
    )
};

export default SaleItem;