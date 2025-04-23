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
    const usersCollection = database.collection("currentUsers");
    // const campaignsCollection = database.runningCampaigns.renameCollection("campaigns", { dropTarget: true });
    const campaignsCollection = database.collection("runningCampaigns");

    const insertCampaigns = [

      {
        "title": "Blankets for Cold Nights",
        "description": "Distributing blankets to underprivileged families in rural areas",
        "details": "This campaign focuses on rural villages in northern Bangladesh where temperatures drop drastically. Funds will help purchase and deliver blankets.",
        "image": "https://i.ibb.co.com/9k0DFt59/crowfunding-1.webp",
        "deadline": "30 November, 2025",
        "category": "Winter Relief",
        "location": "Rangpur, Bangladesh",
        "isRunning": "true"
      },

      { "title": "Necessary Food Packages", "description": "Providing essential food items to the poor and unprevileged people in need of food.", "details": "Each package contains rice, lentils, oil, and some nutricious dry foods. The goal is to support the people unable to get food. This campaign is held every year with 3 months interval.\",", "image": "https://i.ibb.co.com/x8F78rSR/crowdfunding-2.png", "deadline": "30 April, 2025", "category": "Food Support", "location": "Rajshahi, Bangladesh", "isRunning": "true" },

      { "title": "School Supplies for slum kids.", "description": "Help children start their school year with the right tools.", "details": "Providing school bags, notebooks, and stationery to 300 children living in urban slums.", "image": "https://i.ibb.co.com/xSpKmHV9/crowdfund-3.png", "deadline": "15 June, 2025", "category": "Education", "location": "Khulna, Bangladesh", "isRunning": "true" },

      { "title": "Clean Water for All", "description": "Install tube wells in remote areas suffering from water shortages.", "details": "Lack of clean water leads to health issues in remote regions. This campaign will install 10 deep tube wells in water-scarce areas.", "image": "https://i.ibb.co.com/V7mvv7H/crowdfund-4.jpg", "deadline": "08 March, 2026", "category": "Health", "location": "Barisal, Bangladesh", "isRunning": "true" },

      { "title": "Eficient Mobile Banking Project", "description": "Help me build my project and showcase to the big stage just by giving  a small fund.", "details": "I am Ether, a final year university student pursuing my CSE degree. I am developing a mobile banking system which I believe to be very efficient and can create a big revolution in the mobile banking system.", "image": "https://i.ibb.co.com/tM54HQtm/crowdfund-5.png", "deadline": "12 December, 2025", "category": "Development", "location": "Bangladesh", "isRunning": "true" },

      { "title": "Documentary on Mental Health of Students in Bangladesh", "description": "My first documentary to become an aspiring filmmaker that can be impactful to the society and create awareness among people on cruicial matters.", "details": "I am a final year filmography student at DU. I am creating this documentary to shed some light on the importance of mental wellbeing of the students while pursuing studies which is often ignored by this society.", "image": "https://i.ibb.co.com/v6P3mQ9Q/crowdfund-6.png", "deadline": "15 July, 2025", "category": "Films and Culture", "location": "Bangladesh", "isRunning": "true" },
    ];

    const insertResult = campaignsCollection.insertMany(insertCampaigns);





    app.get('/runningCampaigns', async (req, res) => {
      const cursor = campaignsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.get('/runningCampaigns/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await campaignsCollection.findOne(query);
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