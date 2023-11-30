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
        

        // database//

        const postDatabase = client.db("Medical-camp").collection("user-post");
        const JoinDatabase = client.db("Medical-camp").collection("join");
        const JoinAddedDatabase = client.db("Medical-camp").collection("join-added");
        const SignupDatapro = client.db("Medical-camp").collection("signup-data");
        const FeedbackDatapro = client.db("Medical-camp").collection("Feedback-data");




        // feedbackdata//

        app.post('/feedback', async (req, res) => {
            const Feedback = req.body;
            console.log(Feedback);
            const result = await FeedbackDatapro.insertOne(Feedback)
            res.send(result)
        })
        app.get('/feedback' , async (req, res ) =>{
            const result = await FeedbackDatapro.find().toArray()
            res.send(result);
        })

        //   Create users data//
        app.post('/signup', async (req, res) => {
            const Signup = req.body;
            console.log(Signup);
            const result = await SignupDatapro.insertOne(Signup)
            res.send(result)
        })
        app.get('/signup' , async (req, res ) =>{
            const result = await SignupDatapro.find().toArray()
            res.send(result);
        })

        app.delete('/signup/:id', async (req, res) => {
            const id = req.params.id;
            const cursor = { _id: new ObjectId(id) }
            const result = await SignupDatapro.deleteOne(cursor);
            res.send(result)
        })


        //   add to confiorm data//
        app.post('/add', async (req, res) => {
            const addbody = req.body;
            console.log(addbody);
            const result = await JoinAddedDatabase.insertOne(addbody)
            res.send(result)
        })

        app.get('/add', async (req, res) => {
            const result = await JoinAddedDatabase.find().toArray()
            res.send(result)
        })

        app.delete('/add/:id', async (req, res) => {
            const id = req.params.id;
            const cursor = { _id: new ObjectId(id) }
            const result = await JoinAddedDatabase.deleteOne(cursor);
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

        app.delete('/join/:id', async (req, res) => {
            const id = req.params.id;
            const cursor = { _id: new ObjectId(id) }
            const result = await JoinDatabase.deleteOne(cursor);
            res.send(result)
        })

        app.get('/join/:id', async (req, res) => {
            const id = req.params.id;
            const cursor = { _id: new ObjectId(id) }
            const result = await JoinDatabase.findOne(cursor)
            res.send(result)

        })

        app.patch('/join/:id', async (req, res) => {
            const UpdateId = req.params.id;
            const UPdate = req.body;
            const updated = {
                $set: {
                    ...UPdate
                }
            }
            const filter = { _id: _id(UpdateId) }
            const result = await JoinDatabase.updateOne(filter, updated);
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
        // await client.db("admin").command({ ping: 1 });
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