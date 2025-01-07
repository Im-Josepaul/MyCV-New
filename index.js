const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
const url = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

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
  if(data){
    console.log("Collection recieved from database.");
  }
  const aboutData = await data.findOne({}, { projection: { about: 1, resume: 1, projects: 1 } });
  if (!aboutData) {
    return res.status(404).send('Data not found');
  }

  // Pass data to EJS template
  res.render("index.ejs", {
    about: aboutData.about.about_me,
    resume: aboutData.resume,
    projects: aboutData.projects,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
  // console.log("Visit: http://localhost:3000");
});
