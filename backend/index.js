import express from "express"
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import router from "./routes/bookRouters.js";
import cors from 'cors';

const app = express();

app.use(express.json());

//Middleware for handling the CORS POLICY
// OPTION 1: Allow all origin with Default  of cors(*)
app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ['Content-Type'],
// }));

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