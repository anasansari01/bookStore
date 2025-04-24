import express from "express"
import mongoose from "mongoose";
import router from "./routes/bookRouters.js";
import cors from 'cors';
import dotenv from "dotenv"

const app = express();
dotenv.config();

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
  .connect(process.env.DB_URL)
  .then(() => {
    console.log(`App connected to Database.`);
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to PORT: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    throw error;
  });