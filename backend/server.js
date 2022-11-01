const express = require("express");
const app = express();
const mongoose = require('mongoose');
const router = require("./routes/routes");
const routeUrls = require('./routes/routes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

mongoose.connect("mongodb+srv://ghost:ghost@afra.qaclfcn.mongodb.net/myUsers",() => console.log("Database Connected"));

app.use(express.json()); //-> body parser
app.use(cors());
app.use('/app', routeUrls); //-> /app is the base path and routeUrls will be appemded to it
app.listen(4000, () => console.log("Server is running"));
