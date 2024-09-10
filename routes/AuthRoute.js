import express from "express";
import { Login, logOut, Me } from "../controllers/Auth.js";
import { verifyToken } from "../middleware/AuthUser.js"; 

const router = express.Router();


router.get('/me', verifyToken, Me); 
router.delete('/logout', verifyToken, logOut); 
router.post('/login', Login);

export default router;
