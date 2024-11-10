import { MongoClient } from "mongodb";

async function run() {
    const uri =
        "mongodb+srv://ssheedy:WZqgjWWHnZU4BsTl@vsv.wcf72.mongodb.net/?retryWrites=true&w=majority";


    const client = new MongoClient(uri);


    await client.connect();
    const dbName = "Leaderboard";
    const collectionName = "Leaderboard";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
}