import mongoose from "mongoose"; 

import reservationSchema from "./reservation.js";

const itemSchema = new mongoose.Schema({
    code: {type: String, required: true},
    type: {type: String},
    name: {type: String, required: true}, 
    description: {type: String},
    stickerPrice: {type: mongoose.Decimal128, required: true},
    stock: {type: Number, required: true},
    productOwner: {type: String, required: true}, 
    saleStatus: {type: String, required: true}, //available, sold,
    onHold: reservationSchema,
    transaction: {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}
});

const item = mongoose.model("Item", itemSchema);

export default item;