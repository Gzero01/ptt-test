const fs = require("fs");
const Picture = require("../models/picture.model");


exports.additem = function (req, res) {
  const { name } = req.body;
  const fileType = req.file.mimetype.split("/")[1];
  const newFileName = req.file.filename + "." + fileType;
console.log("name",name)
console.log("fileType",fileType)
console.log("newFileName",newFileName)


  fs.rename(
    `../public/images/${req.file.filename}`,
    `../public/images/${newFileName}`,
    // function () {
    //   // console.log("CallBack");
    //   Picture.create({ name: name, image: `/images/${newFileName}` });
    //     console.log("req.file.filename", req.file.filename);
    // }
  )
  res.json({status:'ok',text:'Photo upload Successfully'}).send(200)
};



exports.getitem = async function (req, res) {
  const itemData = await Picture.find().lean().exec();

  res.send(200, itemData);
};


