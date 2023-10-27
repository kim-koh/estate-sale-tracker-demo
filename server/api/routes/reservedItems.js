import express from "express"; 

const router = express.Router(); 

router.get("/", (req, res) => {
    res.send("Get all items ever put on hold")
});

router.get("/:id", (req, res) => {
    const itemID = req.params.id; 
    res.send("Get single item that was or is on hold")
});

router.post("/", (req, res) => {
    res.send("Put new item on hold")
});

router.patch("/:id", (req, res) => {
    res.send("Edit reservation on item with given id")
});

router.delete("/:id", (req, res) => {
    res.send ("Delete a hold, made mistakenly")
})

//export the router 
export default router; 