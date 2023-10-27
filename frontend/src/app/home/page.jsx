'use client'
import axios from "axios";
import { useEffect, useState } from "react";

import {useInventoryContext} from "../hooks/useInventoryContext.jsx";
import {useTransactionContext} from "../hooks/useTransactionContext.jsx"

import EditItemModal from "../components/inventory components/EditItemModal.jsx";
import EditTransactionModal from '../components/transaction components/EditTransactionModal.jsx'
import NewItemModal from '../components/transaction components/nt form components/NewItemModal.jsx'
import SaleHeader from "../components/main/SaleHeader.jsx";
import SummaryStats from '../components/main/SummaryStats.jsx'
import SearchBar from '../components/main/SearchBar.jsx';
import CardsContainer from '../components/main/CardsContainer.jsx';
import Form from '../components/main/Form.jsx'
import { useNewItemModalContext } from "../hooks/useNewItemModalContext.jsx";

axios.defaults.baseURL = `https://estate-sale-tracker-server.vercel.app`
//axios.defaults.baseURL = 'http://localhost:4000'

function Dashboard() {
    const {inventory, dispatch} = useInventoryContext();
    const {transactions, transactionDispatch} = useTransactionContext();
    const {modalDispatch} = useNewItemModalContext(); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [view, setView] = useState('inventory')
    let inventoryToDisplay = []; 

    //initial GET req for inventory, transactions, and holds
    useEffect(() => {
            async function getData() {
                //get inventory
                const res = await axios.get("/api/inventory"); 
                if (!res) {
                    throw new Error("Failed to fetch inventory data");
                } else {
                    dispatch({type: 'SET_INVENTORY', payload: res.data});
                }
                //get transactions
                const res2 = await axios.get("./api/transaction");
                if (!res2) {
                    throw new Error("Failed to fetch transaction data");
                } else {
                    transactionDispatch({type: 'SET_TRANSACTIONS', payload: res2.data});
                }
                //get holds
                //TODO: INSERT INITIAL GET REQUEST FOR HOLDS HERE
            }
            getData();
        }, [])
    //search feature
    function searchIsValidType() {
        let validType = false;
        const types = 'misc. miscellaneous kitchen electronics furniture entertainment onlinesale';
        if (types.includes(searchTerm)) {validType = true;}
        return validType;
    }

    function searchIsValidName() {
        let validName = false; 
        inventory.forEach(item => { 
            if (item.name.toLowerCase().replace(/\s+/g, '').includes(searchTerm)) {validName = true;}
        });
        return validName;
    }

    function searchIsValidCode() {
        let validCode = false;
        if (searchTerm.length > 4) {return validCode;}
        inventory.forEach(item => {
            if (item.code.toLowerCase().includes(searchTerm)) {validCode = true;}
        });
        return validCode;
    }

    if (searchTerm === '') {
        inventoryToDisplay = inventory; 
    } else if (searchIsValidCode()) {
        console.log("search is code")
        inventoryToDisplay = inventory.filter((item) => item.code.toLowerCase().includes(searchTerm));
    } else if (searchIsValidType()) {
        console.log("search is type")
        inventoryToDisplay = inventory.filter((item) => item.type.toLowerCase().includes(searchTerm))
    } else if (searchIsValidName()) {
        console.log("search is name")
        inventoryToDisplay = inventory.filter((item) => item.name.toLowerCase().replace(/\s+/g, '').includes(searchTerm));
    } else {
        inventoryToDisplay = []; 
    }
    
    //functions to delay appliation of search until user finishes typing
    function debounce(func, timeout = 800) {
        let timer; 
        return (...args) => {
            clearTimeout(timer); 
            timer = setTimeout(() => {func.apply(this, args); }, timeout);
        }
    }
    function filterBySearch(userInput) {
        const flexibleSearchTerm = userInput.toLowerCase().replace(/\s+/g, '');
        setSearchTerm(flexibleSearchTerm); 

    }
    const processInput =  debounce((userInput) => filterBySearch(userInput));

    return( 
        <div className="main-container">
            <EditItemModal/>
            <EditTransactionModal/>
            <NewItemModal/>
            <SaleHeader/>
            <div className="information-container">
                <SummaryStats />

                <div>
                    <button 
                        className="btn"
                        onClick={() => {setView('inventory'); modalDispatch({type: 'RESET_MODAL'})}}
                    >Inventory</button>
                    <button 
                        className="btn"
                        onClick={() => setView('transactions')}
                    >Transactions</button>
                    <button 
                        className="btn"
                        onClick={() => {setView('reservations'); modalDispatch({type: 'RESET_MODAL'})}}
                    >Holds</button>
                </div>

                <SearchBar 
                    //TODO: search should change based on view
                    handleClick={() => dispatch({type: 'SORT_INVENTORY'})}
                    handleSearch={processInput}
                />

                <div className="table-form-container">
                    <CardsContainer 
                        view = {view}
                        inventory = {inventoryToDisplay}
                        transactions = {transactions}/>
                    <Form
                        view = {view}
                    />
                </div>    
            </div> 
        </div>  
    )
};

export default Dashboard;