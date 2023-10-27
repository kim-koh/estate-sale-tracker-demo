import NewItemForm from "../inventory components/NewItemForm";
import NewTransactionForm from '../transaction components/NewTransactionForm'
import NewReservationForm from '../reservation components/NewReservationForm'

function Form({view}) {
    if (view === 'inventory') {
        return(<div className="form-container"><NewItemForm/></div>);
    } else if (view === 'transactions') {
        return(<NewTransactionForm/>);
    } else if (view === 'reservations') {
        return(<NewReservationForm/>);
    }
}

export default Form; 