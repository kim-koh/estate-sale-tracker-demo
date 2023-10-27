import { useInventoryContext } from '../../hooks/useInventoryContext';
import { useTransactionContext } from '../../hooks/useTransactionContext';
import SaleItem from '../inventory components/SaleItemCard'
import TransactionCard from '../transaction components/TransactionCard'

function CardsContainer(props) {
    const view = props.view; 
    const inventory = props.inventory
    const {transactions} = useTransactionContext(); 
    
    
    //different array loaded if state = inventory, if state = transaction, if state = holds
    if (view === "inventory") {
        return(
            <div className="scroll cards-container">
                {(inventory.length === 0 || !inventory) ? <p>loading...</p> : inventory.map((item) => (
                    <SaleItem 
                        key = {item._id}
                        item = {item}
                    />
                ))}
            </div>    
        )     
    } else if (view === "transactions") {
        return(
            <div className="scroll cards-container">
                {(transactions.length === 0 || !transactions) ? <p>loading...</p> : transactions.map((transaction, index) => {
                    return<TransactionCard 
                        key = {transaction._id}
                        transactionIndex = {index}
                    /> 
                 })}
            </div>    
        )   
    }
    
}

export default CardsContainer;