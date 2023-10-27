import itemModel from "../models/itemForSale.js";

//get all items
const getAllItems = async(req, res) => {
    try {
        const result = await itemModel.find({})
        const inventory = result.sort((a, b) => {
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
        });  
        res.status(200).json(inventory); 
    } catch (err) {
        res.status(400).json({error: err.message});
    }
    
};

// //get all items of a type
// const getItemsInCategory = async(req, res) => {
//     const type = req.query.type.toLowerCase(); 
//     try {
//         const result = await itemModel.find({type: type}).sort({code: 1})
//         res.status(200).json(result); 
//     } catch (error) {
//         res.json({error: error.message}); 
//     }
    
// }

// //get a single item
// const getOneItem = async(req, res) => {
//     const code = req.params.code.toUpperCase();
//     try {
//         const item = await itemModel.find({code:code}); 
//         if (!item) {res.json({error: "No item with this code in the database"})}
//         res.status(200).json(item);  
//     } catch (err) {
//         res.status(400).json({error: err.message});
//     }
    
// }

//post a new item
const createItem = async(req, res) => {
    const {code, type, name, description, stickerPrice, stock, productOwner} = req.body;
    const saleStatus = "Available"; //onHold and transaction are both null at this point
    try {
        const duplicate = await itemModel.find({code: code})
        if (!duplicate.length) {
            const item = await itemModel.create({code, type, name, description, stickerPrice, stock, productOwner, saleStatus});
            res.status(200).json(item);
        } else {
            throw new Error(`There is already an item with code ${code} in the database. Please choose a different code.`) 
        }
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

//patch or edit an exisiting item
const editItem = async(req, res) => {
    const code = req.params.code.toUpperCase();
    try {
        const updatedItem = await itemModel.findOneAndUpdate({code: code}, {...req.body}, {new: true});
        if (!updatedItem) {
            res.status(400).json({error: `No item with code ${code} in the database`});
        } else {
            res.status(200).json(updatedItem)
        };
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//delete an item
const deleteItem = async(req, res) => {
    const code = req.params.code.toUpperCase(); 
    try {
        const item = await itemModel.findOneAndDelete({code: code});
        if (!item) {
            res.status(400).json({error: "No such item in the database"})
        } else {
            res.status(200).json(item); 
        }
    } catch (err) {
        res.json({error: err.message});
    }
}

export {
    getAllItems,
    // getItemsInCategory,
    // getOneItem,
    createItem,
    editItem, 
    deleteItem
}