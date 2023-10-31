'use client'
import { useState } from "react";

import styles from '../../styles/Form.module.css'
import { useInventoryContext } from "../../hooks/useInventoryContext";
import { useNewItemModalContext } from "../../hooks/useNewItemModalContext";
import { addCategory, categories } from '../../demoData';

function NewItemForm() {
    const {inventory, dispatch} = useInventoryContext();
    const { modalDispatch} = useNewItemModalContext(); 
    const [error, setError] = useState(null); 

    const [types, setTypes] = useState([...categories])
    
    const [code, setCode] = useState('');
    const [type, setType] = useState('Misc.');
    const [name, setName] = useState(''); 
    const [owner, setOwner] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const productOwner = "Anson"; 
    //onHold = null, transaction = null;

    const [newCategoryOpen, setNewCategoryOpen] = useState(false); 

    function capitalizeFirst(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null); 

        let ans = ''; 
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
        for (let i = 24; i >0; i--) {
            ans +=
                chars[(Math.floor(Math.random() * chars.length))];
        }

        const newItem = {
            "_id": ans, 
            "code": code.toUpperCase().trim(),
            "type": capitalizeFirst(type), 
            "name": name, 
            "description": description, 
            "stickerPrice": price, 
            "stock": stock, 
            "productOwner": productOwner,
            "saleStatus":"Available", 
        }
                
        dispatch({type: 'CREATE_NEW_ITEM', payload: newItem})
        modalDispatch({type: 'CLOSE_MODAL', payload: newItem})
        
        setCode('');
        setType('Misc.'); 
        setName('');
        setDescription('');
        setPrice(0);
        setStock(1);
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
            <div>

            <div className={styles.newCategoryContainer}>
                {newCategoryOpen && 
                <form 
                    className={styles.newCategoryForm}
                    onSubmit={(e) => {
                        e.preventDefault
                        setTypes(prevState => {
                            const newTypes = [...prevState]
                            newTypes.push(e.target[0].value); 
                            return newTypes; 
                        })
                    }}
                >
                    <input type="text"/>
                    <button>+</button>
                </form>    
            }
            </div>
            

            <form className={styles.createNew} onSubmit={handleSubmit}>
                <h3>Add New Item</h3>

                <div>
                    <label>Category:</label>
                    <select name="types" id="types" required
                        onChange={(e) => {
                            if (e.target.value === "Add") {
                                setNewCategoryOpen(true)
                            } else {
                                setType(e.target.value)
                            }
                            ; 
                        }}
                        value={type}
                        className={styles.formInput}>
                            {console.log(types)}; 
                        {types.map(type => {
                            return(<option key={type} value={type}>{type}</option>)
                        })}
                        <option value="Add">+ Add Category TODO: GET THIS FUNCTIONING</option>
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
            
            </div>
    )
    
}

export default NewItemForm;