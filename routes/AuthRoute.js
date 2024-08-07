import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";
import { verifyToken } from "../middleware/AuthUser.js"; 

const router = express.Router();

//
router.get('/me', verifyToken, Me); // Gunakan verifyToken untuk memverifikasi token
router.delete('/logout', verifyToken, logOut); // Gunakan verifyToken untuk memverifikasi token

// Rute login yang tidak memerlukan autentikasi
router.post('/login', Login);

export default router;
