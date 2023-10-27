'use client'
import axios from "axios"; 
import { useState, useEffect } from "react";

import Styles from "../../styles/EditItemModal.module.css"
import { useInventoryContext } from "../../hooks/useInventoryContext";
import { useModalContext } from "../../hooks/useEditItemModalContext"

function EditItemModal() {
    const {dispatch} = useInventoryContext(); 
    const {state, modalDispatch} = useModalContext();
    const {openModal, itemData} = state;

    const item = itemData; 

    const [type, setType] = useState(item.type);
    const [name, setName] = useState(item.name); 
    const [description, setDescription] = useState(item.description); 
    const [price, setPrice] = useState(item.stickerPrice.$numberDecimal);
    const [stock, setStock] = useState(item.stock);
    const [error, setError] = useState(null); 

    useEffect(() => {
        setType(item.type);
        setName(item.name); 
        setDescription(item.description);
        setPrice(item.stickerPrice.$numberDecimal); 
        setStock(item.stock); 
    }, [item])

    function capitalizeFirst(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    async function handleSave(e) {
        e.preventDefault();
        setError(null); 
        const newInfo = {
            "code": item.code,
            "type": capitalizeFirst(type), 
            "name": name, 
            "description": description, 
            "stickerPrice": price, 
            "stock": stock, 
        }

        await axios.patch(`/api/inventory/${item.code}`, newInfo)
            .then ((response) => {
                const newItem = response.data;
                dispatch({type: 'EDIT_ITEM', payload: newItem});
                modalDispatch({type: 'CLOSE_MODAL'});
            })
            .catch((err) => {
                const errMessage = err.response.data;
                setError(errMessage.error);  
            })
    }
    
    if (!openModal) {
        return null; 
    } else {
        return( 
            <div className='overlay'>
                <div className={Styles.container}>
                    <form className={Styles.edit}>

                        <h4>{item.code}</h4>
                        
                        <div>
                            <label>Category:</label>
                            <select name="types" id="types" required
                                onChange={(e) => setType(e.target.value)}
                                value={type}
                                className={Styles.formInput}>
                                <option value="Misc.">Miscellaneous</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Online Sale">Online Sale</option>
                            </select>  
                        </div>
                        
                        <div>
                            <label>Item Name:</label>
                            <input 
                                className={Styles.formInput}
                                type="text" 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>

                        <div>
                            <label>Description:</label>
                            <textarea  
                                className={Styles.formInput}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </div>

                        <div>
                            <label>Asking Price:</label>
                            <input 
                                className={Styles.formInput}
                                type="number"
                                step="0.01"
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                value={price}
                                required
                            />
                        </div>

                        <div>
                            <label>How many:</label>
                            <input 
                                className={Styles.formInput}
                                type="number" 
                                min={0}
                                onChange={(e) => setStock(parseFloat(e.target.value))}
                                value={stock}
                                required
                            />
                        </div>

                        <div >
                            <div className={`${Styles.btnContainer}`}>
                                <button className={`btn`} onClick={handleSave}>Save</button>
                                <button className={`btn`} onClick={() => modalDispatch({type: 'CLOSE_MODAL'})}>Cancel</button>  
                            </div>
                        </div>
                        
                        {error && <div className={Styles.error}>Error: {error}</div>}
                    </form>
                </div>
            </div>
        )  
    } 
}

export default EditItemModal; 