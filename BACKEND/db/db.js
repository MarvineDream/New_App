import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.15'; // l'URL dU serveur MongoDB
const client = new MongoClient(url);

async function run() {
    try {
        // Connexion au client
        await client.connect();
        console.log("Connecté au serveur MongoDB");

        const database = client.db('MoukelaDB'); 
        const collection = database.collection('client'); 

        // Créer un document
        const doc = {
            nom: "John Doe",
            age: 30,
            email: "johndoe@example.com"
        };

        // Insérer le document
        const result = await collection.insertOne(doc);
        console.log(`Document inséré avec l'ID : ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

run().catch(console.error);