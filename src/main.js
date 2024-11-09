const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ssheedy:WZqgjWWHnZU4BsTl@vsv.wcf72.mongodb.net/?retryWrites=true&w=majority&appName=VSV";

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
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

// let g = new Grid()

// const grid_element = document.getElementById('grid1')

// g.render(grid_element)