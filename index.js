const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const url = process.env.MONGODB_URL;

const client = new MongoClient(url);

async function getCollection() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to Database");

    return client.db("MyCV").collection("CVData");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

app.get("/",async (req,res)=> {
  var data = await getCollection();
    const aboutData = await db.collection('CVData').findOne({}, { projection: { about: 1, resume: 1, projects: 1 } });

    if (!aboutData) {
      return res.status(404).send('Data not found');
    }

    // Pass data to EJS template
    res.render('index.ejs', {
      about: aboutData.about.about_me,
      resume: aboutData.resume,
      projects: aboutData.projects,
    });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000.`);
});
