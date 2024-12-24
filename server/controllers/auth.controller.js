
import Errorhandler from '../utils/utility-class.js';
import generateToken from '../helper/jwt.js';
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
export const Signup = async (req, res, next) => {

	try {		
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			throw new Errorhandler("Please Enter all the Feilds",400);
		}

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			throw new Errorhandler("user already exits", 409)
		}
		const salt = await bcrypt.genSalt(5);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword
		});

 res.status(201).json({ message: "User has been created", user: newUser });
	}
	catch (err) {
		next(err);
	}
}

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log("user",email);
		const allUsers = await User.findAll();

		const user = await User.findOne({ where: { email } });
		
		
		if(!user){
			throw new Errorhandler("user does not exist",401)
		}
		const matchedPassword= await bcrypt.compare(password,user.password);
		if(!matchedPassword){
			throw new Errorhandler("invalid password",401)

		}
		console.log("The token is : ||", generateToken(user.id));
		
			res
			.status(200)
			.json({
				name: user.username,
				email: user.email,
				token: generateToken(user.id),
			 });
		

	} catch (err) {
		next(err);
	}
}




export const logout=()=>{
	try{

		res.status(200).json({success:true,message:"Successfully logout"})


	}catch(err){
		next(err);
	}
}