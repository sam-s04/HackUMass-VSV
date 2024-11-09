const { MongoClient } = require("mongodb");
import { Grid } from './grid'

async function run() {
    const uri =
        "mongodb+srv://ssheedy:WZqgjWWHnZU4BsTl@vsv.wcf72.mongodb.net/?retryWrites=true&w=majority";


    const client = new MongoClient(uri);


    await client.connect();

    const dbName = "myDatabase";
    const collectionName = "recipes";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
}

let g = new Grid()

const grid_element = document.getElementById('grid1')

g.render(grid_element);