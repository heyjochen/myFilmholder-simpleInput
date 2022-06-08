const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
require("dotenv").config();

MongoClient.connect(process.env.DB_STRING, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to Database`);

    const db = client.db("myFilmHolder");
    const photosCollection = db.collection("photos");

    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/", (req, res) => {
      photosCollection
        .find()
        .toArray()
        .then((data) => {
          res.render("index.ejs", { photo: data });
        })
        .catch((error) => console.error(error));
    });

    app.post("/addPhoto", (req, res) => {
      photosCollection
        .insertOne({
          title: req.body.title,
          camera: req.body.camera,
          lens: req.body.lens,
          film: req.body.film,
          date: req.body.date,
          color: req.body.color,
          notes: req.body.notes,
          color: req.body.color,
        })
        .then((result) => {
          console.log("Photo Added");
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/deletePhoto", (req, res) => {
      db.collection("myFilmHolder")
        // .deleteOne({ stageName: request.body.stageNameS })
        .then((result) => {
          console.log("Photo Deleted");
          response.json("Photo Deleted");
        })
        .catch((error) => console.error(error));
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Listening to Port ${PORT}`);
    });
  }
);
