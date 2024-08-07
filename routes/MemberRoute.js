import express from "express";
import {
  getMembers,
  getMemberById,
  updateMember,
  deleteMember
} from "../controllers/Members.js";
import { verifyToken } from "../middleware/AuthUser.js"; 

const router = express.Router();

router.get('/members', getMembers); 
router.get('/members/:id', getMemberById); 
router.patch('/members/:id', verifyToken, updateMember);
router.delete('/members/:id', verifyToken, deleteMember);

export default router;
