import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import path from "path";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import googleDrive from "./routes/googledrive.js";
import commentRoutes from "./routes/commentRoutes.js";
import refereeRoutes from "./routes/refereeRoutes.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/app", googleDrive); //-> /app is the base path and routeUrls will be appemded to it
app.use("/api/matches", matchRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/referees", refereeRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
