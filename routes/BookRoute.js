import express from "express";
import {
    getBooks,
    getBooksByCategory,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../controllers/Books.js";
import { adminOnly, verifyToken } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', verifyToken, getBookById);
router.get('/books/category/:category', getBooksByCategory);
router.post('/books', verifyToken, adminOnly, createBook);
router.patch('/books/:id', verifyToken, updateBook);
router.delete('/books/:id', verifyToken, deleteBook);

export default router;
