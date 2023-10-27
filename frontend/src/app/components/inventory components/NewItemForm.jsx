'use client'
import { useState } from "react";
import axios from "axios";

import styles from '../../styles/Form.module.css'
import { useInventoryContext } from "../../hooks/useInventoryContext";
import { useNewItemModalContext } from "../../hooks/useNewItemModalContext";


function NewItemForm() {
    const {inventory, dispatch} = useInventoryContext();
    const { modalDispatch} = useNewItemModalContext(); 
    const [error, setError] = useState(null); 
    
    const [code, setCode] = useState('');
    const [type, setType] = useState('Misc.');
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const productOwner = "Anson"; 
    //onHold = null, transaction = null;

    function capitalizeFirst(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null); 
        const newItem = {
            "code": code.toUpperCase().trim(),
            "type": capitalizeFirst(type), 
            "name": name, 
            "description": description, 
            "stickerPrice": price, 
            "stock": stock, 
            "productOwner": productOwner, 
        }

        await axios.post("/api/inventory", newItem)
            .then ((response) => {
                setCode('');
                setType('Misc.'); 
                setName('');
                setDescription('');
                setPrice(0);
                setStock(1);
                dispatch({type: 'CREATE_NEW_ITEM', payload: response})
                modalDispatch({type: 'CLOSE_MODAL', payload: response.data})
            })
            .catch((error) => {
                const errMessage = error.response.data;
                setError(errMessage.error);  
            })
    };

    function generateCode(type) {
        const x = inventory.filter((item) => item.type === type); 
        const sortedInventory = x.sort((a, b) => {
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
        const codeToUpdate = sortedInventory[sortedInventory.length-1].code; 
        setCode( codeToUpdate.charAt(0) + String(parseInt(codeToUpdate.substring(1)) + 1))
    }

    return(
            <form className={styles.createNew} onSubmit={handleSubmit}>
                <h3>Add New Item</h3>

                <div>
                    <label>Category:</label>
                    <select name="types" id="types" required
                        onChange={(e) => {
                            setType(e.target.value); 
                        }}
                        value={type}
                        className={styles.formInput}>
                        <option value="Misc.">Miscellaneous</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Online Sale">Online Sale</option>
                    </select>  
                </div>

                <div>
                    <label>Item Code: </label>
                    <div className={`${styles.codeInput} ${styles.formInput}`}>
                        
                        <input 
                            style={{border: 'none'}}
                            type="text" 
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                            required
                        /> 
                        <button
                            type="button"
                            onClick={() => generateCode(type)}
                            className={styles.btnSecondary}
                        >Generate code</button>  
                    </div>
                    
                </div>
                
                <div>
                    <label>Item Name:</label>
                    <input 
                        className={styles.formInput}
                        type="text" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>

                <div>
                    <label>Description:</label>
                    <textarea  
                        className={styles.formInput}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>

                <div>
                    <label>Asking Price:</label>
                    <input 
                        className={styles.formInput}
                        type="number"
                        step="0.01"
                        onChange={(e) => {
                            if (e.target.value === '') {
                                setPrice('')
                            } else {
                                setPrice(parseFloat(e.target.value))
                            }
                        }}
                        value={price}
                        required
                    />
                </div>

                <div>
                    <label>How many:</label>
                    <input 
                        className={styles.formInput}
                        type="number" 
                        min={0}
                        onChange={(e) => setStock(parseFloat(e.target.value))}
                        value={stock}
                        required
                    />
                </div>

                <button className={`btn ${styles.completeBtn}`}>Create</button>
                {error && <div className={styles.error}>Error: {error}</div>}
            </form>
    )
    
}

export default NewItemForm;