import { MongoClient } from "mongodb";

async function run() {
    const uri =
        "mongodb+srv://ssheedy:WZqgjWWHnZU4BsTl@vsv.wcf72.mongodb.net/?retryWrites=true&w=majority";


    const client = new MongoClient(uri);

    try{
        await client.connect();
        console.log('Connected to database');
    }
    catch{
        console.log('Could not connect to database');
    }
    
    const dbName = "Leaderboard";
    const collectionName = "Leaderboard";

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
}

async function saveScore(name, score) { // create, post
    run();
    await this.collection.insertOne({'name': name, 'score': score});
    client.close();
  }

  async function loadScore(name) { // read, get
    run();
    const data = await this.collection.findOne({'name': name});
    return data;
    client.close();
  }

  async function editScore(name, score){ // update, put
    run();
    await this.collection.updateOne({'name': name}, {$set:{'score':score}});
    client.close();
  }

  async function deleteScore(name){ // delete, delete
    run();
    await this.collection.deleteOne({'name': name});
    client.close();
  }
