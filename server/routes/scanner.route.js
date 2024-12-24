import { receiptScanner } from "../controllers/scanner.controller.js";
import express from 'express'

import multer from 'multer'
 const upload=multer({
	dest:'uploads/'
})
const route=express.Router();

route.post("/scanner",upload.single("file"),receiptScanner);

export default route