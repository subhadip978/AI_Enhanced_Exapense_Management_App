import { GoogleGenerativeAI } from "@google/generative-ai";
import Errorhandler from "../utils/utility-class.js";

import fs from 'fs'



export const receiptScanner=async(req,res)=>{
	
	try {
		const KEY=process.env.GEMINI_API
		
		const genAI= new GoogleGenerativeAI(KEY) ;
			
			const file=req.file ;
			
			if(!file){
				throw new Errorhandler("no file ",400)
			}
			 const model=genAI.getGenerativeModel({model:"gemini-1.5-flash"})
			
			const base64String = await new Promise((resolve, reject) => {
				fs.readFile(file.path, (err, fileBuffer) => {
					if (err) reject(err);
				
					resolve(fileBuffer.toString('base64'));
				});
			});

			
			 const prompt=`Analyse this receipt image and extract the following information in JSON format:
			 -Total amount (just the number)
			 -Date(in ISO format)
			 -Description  or items purchased (brief summery)
			 -Suggested category(one of: expense,saving)
		 
			 Only respond with valid JSON in this exact format:
			 {
				 "amount":number,
				 "description":"string",
				 "category":"string"
		 
				 }
			 `;
			 console.log("setting pormpt complete")
			 const result= await model.generateContent([
				 {
					 inlineData:{
						 data:base64String,
						 mimeType:file.mimetype
					 },
					},
					prompt,
			 ])
			 console.log("result is ||",result);
		 
			 const text =await result.response.text();
			 console.log("text are ||",text);
			 const cleanedText= text.replace(/```(?:json)?\n?/g,"").trim();
		 
			 const data= JSON.parse(cleanedText);
			 return res.status(201).json( {
				 amount:data.amount,
				 description:data.description,
				 category:data.category,
			 })
		 } catch (error) {
			 console.log("failed receipt scanner",error);
			 res.status(500).json({error:"failed to scanned" ,error})
			 
		 }
					 
			 }
		
	