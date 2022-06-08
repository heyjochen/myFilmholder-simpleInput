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
        })
        .then((result) => {
          console.log("Photo Added added to DB");
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/deletePhoto", (req, res) => {
      const { id } = req.params;
      console.log(id);
      photosCollection
        .deleteOne({id})
        .then((result) => {
          console.log("Photo Deleted");
          res.json("Photo Deleted");
        })
        .catch((error) => console.error(error));
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Listening to Port ${PORT}`);
    });
  }
);
