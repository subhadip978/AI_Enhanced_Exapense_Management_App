
import { Op } from "sequelize";
import Expense from "../models/expense.model.js";
import Errorhandler from "../utils/utility-class.js";

import{ S3Client,PutObjectCommand,GetObjectCommand }from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";



export const addExpense = async (req, res,next) => {
	try {
	  const userId = req.user.id; 
	  console.log("user id is:",userId);
	  const {title,category,description,amount}=req.body;
	  const currentDate = new Date().toISOString().slice(0, 10); 
	 console.log(currentDate);
	  const newExpense = await Expense.create({
		title,
		category,
		description,
		amount,
		userId: userId,
		date: currentDate,
	  });
  
	 
	  res.status(201)
	  .json({ success: true, newExpense });
	} catch (err) {
	 
	  next(err);
	}
  };

  export const getExpense = async (req, res,next) => {
	try {
	  const userId = req.user.id; 
	  console.log("userId is",userId);
	  const pageSize = parseInt(req.query.pageSize) || 3; 
	  const currentPage = parseInt(req.query.page) || 1;
	  const offset = (currentPage - 1) * pageSize; 
  
	 
	  const expenses = await Expense.findAll({
		where: { userId },
		limit: pageSize, 
		offset: offset, 
	  });
    
	 res.status(200).json({
		
		currentPage,
		expenses,
	  });
	} catch (err) {
	 next(err) 
	}
  };




  export const singleExpense=async(req,res,next)=>{
	try{

		const {id}=req.params;
		console.log(id);
		const expense=await Expense.findOne({where:{id}});
		res.status(200).json({success:true,expense});


	}catch(err){
		next(err);

	}
  }
  

  const allexpenses = async (userId) => {
	try {
	  console.log(userId);
  	
	  const expenses = await Expense.findAll({
		where: { userId: userId },
	  });
  
	  return expenses;
	} catch (err) {
	  console.log('Error fetching expenses: ', err);
	}
  };

  
  export const deleteExpense = async (req, res,next) => {
	
	const expenseId = req.params.id; 
	try {	 
	  const result = await Expense.destroy({
		where: {
		   id: expenseId, 		
		},
	  });
 
	  res.status(200).json("Successfully deleted");
	} catch (err) {
		console.log(err)
	  next(err); 
	}
  };
  


export const updateExpense =async(req,res,next)=>{
	const expenseId = req.params.id; 

	try{
		const updatedExpense = {
			title: req.body.title,
			category: req.body.category,
			description: req.body.description,
			amount: req.body.amount,
		  };
		  const [updatedRecord] = await Expense.update(updatedExpense, {
			where: {
			  id: expenseId,
			 
			},returning:true})


		res.status(200).json({ message: "Successfully updated",  updatedRecord });
	}catch(err){
		next(err);

	}
}


export const searchExpense=async(req,res,next)=>{

	try{
		const {startdate, lastdate}=req.query ;
		const userId=req.user.id ;
		console.log("startdate",startdate);
		console.log("lastdate",lastdate);
		if(!startdate || ! lastdate){
			throw new Errorhandler("Both date required",400);
		}

		const expense =await Expense.findAll({where:
			{ userId:userId,
			
			date:{
				[Op.gte]: new Date(startdate), 
				[Op.lte]: new Date(lastdate),
			}
		}})
		
		res.status(200).json({success:true,expense});

	}catch(err){
		next(err);
	}

}



export const downloadExpense=async(req,res,next)=>{
	const data = await allexpenses(req.user.id);
	console.log(data);
	try{
		
		console.log("SECRET_KEY",process.env.AWS_KEYID);
		console.log(process.env.SECRET_ACCESSKEY)
		const s3Client = new S3Client({
			region: "ap-south-1",
			credentials: {
				accessKeyId: process.env.AWS_KEYID,
				secretAccessKey: process.env.SECRET_ACCESSKEY
			}

		})
		const stringidata = JSON.stringify(data);
		const filename = `expense_${Date.now()}.txt`
		const command = new PutObjectCommand({
			Bucket: "expense-tracker7",
			Key: filename,
			Body: stringidata,
		})
		await s3Client.send(command);
		const command2 = new GetObjectCommand({
			Bucket: "expense-tracker7",
			Key: filename
		})

		 s3Client.send(command2);

		const url = await getSignedUrl(s3Client, command2);

		console.log("THE URL IS || ",url)

		res.status(200).json(url);

	}catch(err){
		console.log(err);
		next(err);
	}

}