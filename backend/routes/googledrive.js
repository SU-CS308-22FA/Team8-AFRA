//google drive stuff
import express from "express";
const router = express.Router();

import multer from "multer";
const upload = multer({ dest: "public/files" });

import uploadSingleFile from "../googledrive/upload.js";
import deleteDriveFile from "../googledrive/delete.js";
import fs from "fs"

const deleteFile = (filePath) => { //delete file from local directory
    fs.unlink(filePath, () => {
      console.log("file deleted");
    });
  };

  router.post("/google-drive", upload.single("file"), async (req, res, next) => {
    try {
        if (!req.file) {
          res.send("No file uploaded.");
          return;
        }
        const response = await uploadSingleFile(req.file);
        deleteFile(req.file.path);
        console.log(response.data.id);
        res.json({ id: response.data.id });
      } catch (err) {
        console.log(err);
  }
});

router.post('/drivedelete', (req, res) => {
    var fileId = req.body.licence; // Desired file id to download from  google drive
    var index = fileId.lastIndexOf("/")
    fileId = fileId.substring(index+1)
    console.log("This is drive delete");
    console.log(fileId)
    const response = deleteDriveFile(fileId);
    res.send(response.data);
  });


export default router;