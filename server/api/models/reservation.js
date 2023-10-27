import mongoose from "mongoose"; 
import itemSchema from "./itemForSale.js";

const reservationSchema = new mongoose.Schema(
    {
    //saleID: saleID
    //item: itemSchema,
    customerfName: {type: String, required: true},
    customerlName: {type: String},
    contactInfo: {type: String, required: true}, //email or phone
    resolved: {type: Boolean, required: true}
    }, {timestamps: true} //reservation.createdAt or .upatedAt
);

const reservation = mongoose.model("Reservation", reservationSchema); 

export default reservationSchema;