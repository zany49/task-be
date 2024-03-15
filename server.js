import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDb } from "./config/database.js";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoutes.js";
import orgRoutes from "./routes/orgRoutes.js";
import adminRoutes from "./routes/adminRoute.js";
import passport from "passport";


const app = express();
const PORT = process.env.PORT || 6001;
connectDb();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// configurePassport(passport);
app.use(passport.initialize());

var corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  // origin: '*'
};
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
  res.send("Welcome to nter view backend api");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/org", orgRoutes);
app.use("/api/admin", adminRoutes);



app.get(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("You have accessed a protected route!");
  }
);

app.all("*", (req, res) => {
  res.send("You tried to reach a route that doesn't exist!");
});

mongoose.connection.once("open", () => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
