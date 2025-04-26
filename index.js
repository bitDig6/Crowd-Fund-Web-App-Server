require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpi5bfv.mongodb.net/?appName=Cluster0`;

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
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("crowdfundingDB");
    const runningCampaignsCollection = database.collection("runningCampaigns");
    const campaignsCollection = database.collection("campaigns");
    const donatedCollection = database.collection("donated");


    app.get('/runningCampaigns', async (req, res) => {
      const cursor = runningCampaignsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/runningCampaigns/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await runningCampaignsCollection.findOne(query);
      res.send(result);
    })

    app.get('/campaigns', async(req, res) => {
      const cursor = campaignsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/campaigns/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await campaignsCollection.findOne(query);
      res.send(result);
    })

    app.post('/campaigns', async(req, res) => {
      const newCampaign = req.body;
      const result = await campaignsCollection.insertOne(newCampaign);
      res.send(result);
    })

    app.post('/donations', async(req, res) => {
      const donation = req.body;
      const result = await donatedCollection.insertOne(donation);
      res.send(result);
    })

    app.delete('/campaigns/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)};
      const result = await campaignsCollection.deleteOne(query);
      res.send(result);
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/', (req, res) => {
  res.send('Crowd Funding Web App Server');
})

app.listen(port, (req, res) => {
  console.log('Server Started at Port: ', port);
})