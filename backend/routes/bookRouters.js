import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// Route for save a new Book
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }

    const book = await Book.create(newBook);
    return res.status(201).send(book);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

//Route for Get All Books from the database.
router.get("/", async (req, res) => {
  try {

    const books = await Book.find({});
    return res.status(201).json({
      count: books.length,
      data: books
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

//Route for Get Books by id from the database.
router.get("/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(201).json(book);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

//Route for Get Books by id from the database.
router.put("/:id", async (req, res) => {
  try {

    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      })
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(401).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book updated successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

// Route to delete the BOok by ID
router.delete("/:id", async (req, res) => {
  try {

    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(401).json({ message: "Book not found" });
    }

    return res.status(200).send({ message: "Book Deleted successfully" });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
})

export default router;