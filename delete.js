// upload.js
const fs = require('fs');
const { google } = require('googleapis');

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}/key.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};


const deleteFromGoogleDrive = async (fileId) => {

  auth = authenticateGoogle();
  const driveService = google.drive({ version: "v3", auth});
  const response = await driveService.files.delete({
    fileId: fileId,})
  console.log('File deleted from drive');
  console.log(response);
  return response;
};


module.exports = deleteFromGoogleDrive;