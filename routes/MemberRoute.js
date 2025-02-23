import express from "express";
import {
  getMembers,
  getMemberById,
  updateMember,
  deleteMember
} from "../controllers/Members.js";
import { verifyToken , adminOnly} from "../middleware/AuthUser.js"; 

const router = express.Router();

router.get('/members', verifyToken, getMembers); 
router.get('/members/:id', verifyToken,  getMemberById); 
router.patch('/members/:id', verifyToken, adminOnly, updateMember);
router.delete('/members/:id', verifyToken, deleteMember);

export default router;
