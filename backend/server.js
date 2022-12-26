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
import calendarRoutes from "./routes/calenderRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import appealRoutes from "./routes/appealRoutes.js";
import refereeRoutes from "./routes/refereeRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import matchDetailRoutes from "./routes/matchDetailRoutes.js";
import TopScorersRoutes from "./routes/topScorersRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json" assert { type: "json" };

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(cors());

app.use(express.json()); // to accept json data
app.use("/api/users", userRoutes);
app.use("/app", googleDrive); //-> /app is the base path and routeUrls will be appemded to it
app.use("/api/matches", matchRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/referees", refereeRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/matchdetail", matchDetailRoutes);
app.use("/api/appeal", appealRoutes);
app.use("/api/topscorers", TopScorersRoutes);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
