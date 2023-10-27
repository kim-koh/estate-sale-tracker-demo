import NewItemForm from "../../inventory components/NewItemForm";
import styles from '../../../styles/NewItemModal.module.css'
import { useNewItemModalContext } from "../../../hooks/useNewItemModalContext"

function NewItemModal() {
    const {state, modalDispatch} = useNewItemModalContext(); 

    if (!state.openModal) {
        return null; 
    } else {
        return(
            <div className={`overlay`}>
                <div className={styles.container}>
                    <button
                        onClick={() => modalDispatch({type: 'CLOSE_MODAL'})}
                    >X</button>
                  <NewItemForm/>  
                </div>
                
            </div>
        )
    }
};

export default NewItemModal;