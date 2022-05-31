// POST /api.new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // const { title, image, address, description } = data;

    // connect to mongo db
    const client = await MongoClient.connect(
      "mongodb+srv://ejim111:Chibuzor121@cluster0.yufrw.mongodb.net/?retryWrites=true&w=majority"
    );

    // connect to database
    const db = client.db();

    // creating and accessing collection
    const meetupCollections = db.collection("meetups");

    const result = await meetupCollections.insertOne(data);

    console.log(result);

    //   close database connection
    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
}

export default handler;
