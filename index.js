// Food_Masala
// NmfHVC9X7YpuH5bR
// mongodb+srv://<username>:<password>@cluster0.med0q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://Food_Masala:NmfHVC9X7YpuH5bR@cluster0.med0q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('Food_Masala');
        const allfoodCollection = database.collection('AllFood');
        const ordersCollection = database.collection('orders');
        const reviewsCollection = database.collection('reviews');



        // app.get('/burgers', async (req, res) => {
        //     const cousor = burgerCollection.find({});
        //     const burgers = await cousor.toArray();
        //     res.send(burgers);
        // });
        app.get('/allfood', async (req, res) => {
            const cousor = allfoodCollection.find({});
            const allfood = await cousor.toArray();
            res.send(allfood);
        });



        app.get('/allfood/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: ObjectId(id) };
            const food = await allfoodCollection.findOne(query);
            res.json(food);
        })
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order)


            res.json(result)
        })
        app.get('/orders', async (req, res) => {
            const email = req.query.email;


            const query = { email: email }


            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.json(orders);
        })
        app.post('/reviews', async (req, res) => {
            const reviews = req.body;


            const result = await reviewsCollection.insertOne(reviews);

            res.json(result)
        });

        app.get('/reviews', async (req, res) => {
            const cursor = reviewsCollection.find({});
            const reviews = await cursor.toArray();
            res.send(reviews);
        });



    }
    finally {
        // await client.close()
    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is running');
})

app.listen(port, () => {
    console.log('Server running at port', port)
})

// app.get('/pizzas', async (req, res) => {
//     const cousor = pizzaCollection.find({});
//     const pizzas = await cousor.toArray();
//     res.send(pizzas);
// });
// app.get('/icecream', async (req, res) => {
//     const cousor = iceCreamCollection.find({});
//     const iceCream = await cousor.toArray();
//     res.send(iceCream);
// });
// app.get('/sandwich', async (req, res) => {
//     const cousor = sandwichCollection.find({});
//     const sandwich = await cousor.toArray();
//     res.send(sandwich);
// });
// app.get('/colddrinks', async (req, res) => {
//     const cousor = coldDrinksCollection.find({});
//     const coldDrinks = await cousor.toArray();
//     res.send(coldDrinks);
// });

// app.get('/sweets', async (req, res) => {
//     const cousor = sweetsCollection.find({});
//     const sweets = await cousor.toArray();
//     res.send(sweets);
// });