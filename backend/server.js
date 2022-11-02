const express = require("express");
const app = express();
const mongoose = require('mongoose');
const router = require("./routes/routes");
const routeUrls = require('./routes/routes');
const PORT = process.env.PORT || 4000;
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({path: "./config.env"});

mongoose.connect("mongodb+srv://ghost:ghost@afra.qaclfcn.mongodb.net/myUsers",() => console.log("Database Connected"));

app.use(express.json()); //-> body parser
app.use(cors());
app.use('/app', routeUrls); //-> /app is the base path and routeUrls will be appemded to it
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../build'));
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'build','index.html'));
    });
}

app.listen(PORT, () => console.log(`Server is running ${PORT}`));
