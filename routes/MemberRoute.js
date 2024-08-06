import express from "express";
import {
  getMembers,
  getMemberById,
  updateMember,
  deleteMember
} from "../controllers/Members.js"; 
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/members', verifyUser, getMembers); 
router.get('/members/:id', verifyUser, getMemberById); 
router.patch('/members/:id', updateMember);
router.delete('/members/:id', deleteMember);

export default router;
