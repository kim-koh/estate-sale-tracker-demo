import mongoose from "mongoose"; 
import itemSchema from "./itemForSale.js";

const transactionSchema = new mongoose.Schema(
    {
    purchaseInfo: [
        {
            itemID: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
            quantity: {type: Number, required: true},
            price: {type: mongoose.Decimal128, required: true}
        }
    ],
    totalPrice: {type: mongoose.Decimal128, required: true},
    formOfPayment: {type: String, required: true},
    notes: {type:String}
    }, {timestamps: true}
);

const transaction = mongoose.model("Transaction", transactionSchema); 

export default transaction;