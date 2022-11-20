// upload.js
import fs from "fs"
import {google} from "googleapis"

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const uploadToGoogleDrive = async (file) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ["10YG6q4AfFVEneYJhXTS_eH1mjKfPJMg5"], // Change it according to your desired parent folder id
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  let auth =  new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../key.json'),
    scopes: "https://www.googleapis.com/auth/drive",
  });
  const driveService = google.drive({ version: "v3", auth});

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  console.log('File Uploaded');
  console.log(response.data.id);
  return response;
};


export default uploadToGoogleDrive;