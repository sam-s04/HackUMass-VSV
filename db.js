import { MongoClient } from "mongodb";

class Database {

async connect() {
    this.uri =
        "mongodb+srv://ssheedy:WZqgjWWHnZU4BsTl@vsv.wcf72.mongodb.net/?retryWrites=true&w=majority";


    this.client = new MongoClient(this.uri);

    try {
        await client.connect();
        console.log('Connected to database');
    }
    catch {
        console.log('Could not connect to database');
    }

    this.dbName = "Leaderboard";
    this.collectionName = "highscores";

    this.database = this.client.db(this.dbName);
    this.collection = this.database.collection(this.collectionName);
}

async close(){
    this.client.close();
  }

async saveScore(name, score) { // create, post
    this.connect();
    await this.collection.insertOne({ 'name': name, 'score': score });
}

async loadScore(name) { // read, get
    this.connect();
    const data = await this.collection.findOne({ 'name': name});
    return data;
}

async editScore(name, score) { // update, put
    this.connect();
    await this.collection.updateOne({ 'name': name }, { $set: { 'score': score } });
}

async deleteScore(name) { // delete, delete
    this.connect();
    await this.collection.deleteOne({ 'name': name});
}
}

const database = new Database();
export { database };