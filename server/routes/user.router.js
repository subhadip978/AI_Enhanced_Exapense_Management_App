

import express from 'express'
import { Signup,login, logout } from '../controllers/auth.controller.js';

const router= express.Router();

 router.post("/signup",Signup);
 router.post("/signin",login);
 router.route("/logout").get(logout);


   export default router ;
