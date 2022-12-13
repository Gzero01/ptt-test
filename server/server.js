// import express from "express";

// const router = express.Router();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "../public/images/" });
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const PORT = 4000;
let picture = require("../server/models/picture.model");

const mock = [
  {
    name_th: "name1",
    logo: "logo1",
    province: "province1",
    description_th: "description_th1",
  },
  {
    name_th: "name2",
    logo: "logo2",
    province: "province2",
    description_th: "description_th2",
  },
];

dotenv.config();
mongoose.connect(process.env.ATLAS_URI, () =>
  console.log("MongoDB is Ready To Rock and Roll")
);

// router.route("/test").get(async (req, res) => {
//   const picture = await picture.find().lean().exec();
//   const output = {
//     picture:picture,
// }
// res.send(200, output)
// })

app.get('/test', async (req, res) => {
  const output = mock;
  res.send(200, output);
  console.log("output",output)
  console.log("picture",picture)

});

app.use(express.json()); //bodypasser
app.use(cors());

app.listen(PORT, () => {
    console.log(`Here we go agian on Port:${PORT}`);
  });