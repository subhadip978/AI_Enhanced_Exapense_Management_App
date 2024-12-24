import express from 'express'
import { addExpense, deleteExpense, getExpense ,updateExpense,singleExpense, searchExpense, downloadExpense} from '../controllers/expense.controller.js';
import { protect } from '../middleware/auth.js';
// protect

const router= express.Router();

router.get("/add",protect,getExpense);
router.route("/add/single/:id").get(protect,singleExpense);
   
router.route("/add").post(protect,addExpense)
router.route("/delete/:id").delete(deleteExpense);
router.post("/update/:id",updateExpense);
router.route("/search").get(protect,searchExpense);
router.route("/download").get(protect,downloadExpense);
export default router ;

