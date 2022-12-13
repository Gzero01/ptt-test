// import mongoose from "mongoose";
const mongoose  = require("mongoose")


const picture = new mongoose.Schema(
  {
    id: {
        type: String,
    },
},
{
    strict: false,
}
);

module.exports = mongoose.model("picture", picture, "picture")