import fs from "fs"
import {google} from "googleapis"

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const deleteFromGoogleDrive = async (fileId) => {

    let auth =  new google.auth.GoogleAuth({
        keyFile: path.join(__dirname, '../key.json'),
        scopes: "https://www.googleapis.com/auth/drive",
      });
  const driveService = google.drive({ version: "v3", auth});
  const response = await driveService.files.delete({
    fileId: fileId,})
  console.log('File deleted from drive');
  console.log(response);
  return response;
};


export default deleteFromGoogleDrive;