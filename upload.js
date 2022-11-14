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



const uploadToGoogleDrive = async (file) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ["10YG6q4AfFVEneYJhXTS_eH1mjKfPJMg5"], // Change it according to your desired parent folder id
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  auth = authenticateGoogle();
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


module.exports = uploadToGoogleDrive;