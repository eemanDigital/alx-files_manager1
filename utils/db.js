const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    await this.connect();
    const collection = this.client.db().collection('users');
    const count = await collection.countDocuments();
    return count;
  }

  async nbFiles() {
    await this.connect();
    const collection = this.client.db().collection('files');
    const count = await collection.countDocuments();
    return count;
  }

  async connect() {
    if (!this.client.isConnected()) {
      await this.client.connect();
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
