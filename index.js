const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

// middleware//
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.PP_PASS}@cluster0.jfgqsm5.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // database//

        const postDatabase = client.db("Medical-camp").collection("user-post");
        const JoinDatabase = client.db("Medical-camp").collection("join");
        const JoinAddedDatabase = client.db("Medical-camp").collection("join-added");
        //   add to confiorm data//
        app.post('/add', async (req, res) => {
            const addbody = req.body;
            console.log(addbody);
            const result = await JoinAddedDatabase.insertOne(addbody)
            res.send(result)
        })


        // add to card / join data//
        app.post('/join', async (req, res) => {
            const bodyy = req.body;
            console.log(bodyy);
            const result = await JoinDatabase.insertOne(bodyy)
            res.send(result)
        })

        app.get('/join', async (req, res) => {
            const result = await JoinDatabase.find().toArray()
            res.send(result)
        })
        // addPost//
        app.post('/post', async (req, res) => {
            const body = req.body;
            console.log(body);
            const result = await postDatabase.insertOne(body);
            res.send(result)
        })

        app.get('/post', async (req, res) => {
            const result = await postDatabase.find().toArray()
            res.send(result)
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);








app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/bal', (req, res) => {
    res.send('bal World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})