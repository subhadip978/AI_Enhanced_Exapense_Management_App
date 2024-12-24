import { useState } from "react";




const usefetch=(cb)=>{


	const[data,setData]=useState();

		const fn=async(...args)=>{
			try{
				const response= await cb(...args);
				setData(response);
			}catch(err){
				console.log(err);
			}
		}

}