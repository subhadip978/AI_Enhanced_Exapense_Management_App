
import express from 'express'
import { checkOut, updateTransection } from '../controllers/premium.controller.js';
import { protect } from '../middleware/auth.js';
// protect

const router=express.Router();


router.route("/premium").get(protect,checkOut);
router.route("/premium").post(protect,updateTransection);


export default router