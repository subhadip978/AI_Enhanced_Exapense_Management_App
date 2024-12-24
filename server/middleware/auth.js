import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Errorhandler from '../utils/utility-class.js';

export const protect = async(req, res, next) => {
	try {
		let token ;
			if (req.headers.authorization &&
				req.headers.authorization.startsWith("Bearer")) {
			    console.log("i am in protect");

			token = req.headers.authorization.split(" ")[1] ;
			if (!token) {
		
				throw new Errorhandler("Not authorized, no token",401);
			  }
			console.log("token:",token);
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findOne({ where: { id: decoded.id } });
			console.log("INSIDE AUTH MIDDLEWARE __ req.user ||",req.user.id);;
			next();

		}
	}
		catch (err) {
			next(err);
		}
	}
	
	
	


//bearer token -->  is normally used in api authentication which is provided the client in http headers for access the protected routes and server will verify the signature and validate the token .