import express from "express"; 
import {
    getAllItems,
    // getItemsInCategory,
    // getOneItem,
    createItem,
    editItem,
    deleteItem
} from "../controllers/itemControllers.js"

const router = express.Router(); 

router.get("/", getAllItems);

// router.get("/category", getItemsInCategory);

// router.get("/:code", getOneItem);

router.post("/", createItem);

router.patch("/:code", editItem);

router.delete("/:code", deleteItem)

//export the router 
export default router; 