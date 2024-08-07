import express from "express";
import {Login, logOut, Me} from "../controllers/Auth.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/me', Me); // Tambahkan verifyUser middleware
router.post('/login', Login);
router.delete('/logout', logOut); // Tambahkan verifyUser middleware

export default router;