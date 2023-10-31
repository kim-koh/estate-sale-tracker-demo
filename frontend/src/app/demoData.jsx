const demoInventory = [
    {
        "_id":"651eea4e4abe5d74d7be36f5",
        "code":"A1",
        "type":"Misc.",
        "name":"Book",
        "description":"Any book, hardcover or softcover. Stock number is an estimate",
        "stickerPrice":0.25,
        "stock":97,
        "productOwner":"Sarah",
        "saleStatus":"Available",
        "__v":0
    },
    {
        "_id":"651eea694abe5d74d7be36f8",
        "code":"A2",
        "type":"Misc.",
        "name":"Spiral Notebook",
        "description":"Unused, 100 page count",
        "stickerPrice":2,
        "stock":4,
        "productOwner":"Eric",
        "saleStatus":"Available",
        "__v":0
    },
    {
        "_id":"651f0b7a15ecbb28dff7c72b",
        "code":"A3",
        "type":"Misc.",
        "name":"Picture Frame (each)",
        "description":"Stock is just an estimation",
        "stickerPrice":2,
        "stock":10,
        "productOwner":"Sarah",
        "saleStatus":"Available",
        "__v":0
    },
    {
        "_id":"651f071615ecbb28dff7c70c",
        "code":"B1",
        "type":"Clothes",
        "name":"Green Sweater",
        "description":"XL - Brown patch on left elbow",
        "stickerPrice":10,
        "stock":1,
        "productOwner":"Sarah",
        "saleStatus":"Available",
        "__v":0
    },
    {
        "_id":"651eff474abe5d74d7be3736",
        "code":"C1",
        "type":"Furniture",
        "name":"Wooden Chair",
        "description": "Scratch on the bottom left leg. A little wobbly.",
        "stickerPrice":15,
        "stock":2,
        "productOwner":"Sarah",
        "saleStatus":"Available",
        "__v":0
    },
    {
        "_id":"651f09ca15ecbb28dff7c718",
        "code":"D1",
        "type":"Kitchen",
        "name":"Pots & Pans",
        "description":"Price is per pot or pan",
        "stickerPrice":2.5,
        "stock":20,
        "productOwner":"Sarah",
        "saleStatus":"Available",
        "__v":0
    },
    {
        "_id":"651f0a6715ecbb28dff7c71f",
        "code":"E1",
        "type":"Electronics",
        "name":"Digital Camera",
        "description":"No SD Card",
        "stickerPrice":35,
        "stock":1,
        "productOwner":"Eric",
        "saleStatus":"Available",
        "__v":0
    },
    {
        "_id":"651f0b1515ecbb28dff7c726",
        "code":"E2",
        "type":"Electronics",
        "name":"Bluetooth speaker",
        "description":"Not charged",
        "stickerPrice": 25,
        "stock":1,
        "productOwner":"Eric",
        "saleStatus":"Available",
        "__v":0
    },
]

const demoTransactions = [
    {
        "_id":"6529bab02b27f9a70caa549b",
        "purchaseInfo":[
            {
                "itemID":"651eea4e4abe5d74d7be36f5",
                "quantity":3,
                "price": 0.25,
                "_id":"6529bab02b27f9a70caa549c"
            },
            {
                "itemID":"651eff474abe5d74d7be3736",
                "quantity":1,
                "price": 10,
                "_id":"6529bab02b27f9a70caa549c"
            }
        ],
        "totalPrice": 10.75,
        "formOfPayment":"Cash",
        "createdAt":"Tue Oct 31 2023 12:26:16 GMT-0500 (Central Daylight Time)",
        "__v":0
    },
    {
        "_id":"6529b9ae2b27f9a70caa5496",
        "purchaseInfo":[
            {
                "itemID":"651f09ca15ecbb28dff7c718",
                "quantity":2,
                "price":2,
                "_id":"6529b9ae2b27f9a70caa5497"
            }
        ],
        "totalPrice":4.0,
        "formOfPayment":"Venmo",
        "createdAt":"Tue Oct 31 2023 13:21:00 GMT-0500 (Central Daylight Time)",
        "__v":0
    },
]

const categories = ['Misc.', 'Clothes', 'Furniture', 'Kitchen', 'Electronics'];

const productOwners = ['Sarah', 'Eric'];

export {
    demoInventory,
    demoTransactions,
    categories,
    productOwners
}