import express from "express"
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import router from "./routes/bookRouters.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to MY BOOK STORE.");
})

app.use("/books", router);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App connected to Database.`);
    app.listen(PORT, () => {
      console.log(`App is listening to PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });