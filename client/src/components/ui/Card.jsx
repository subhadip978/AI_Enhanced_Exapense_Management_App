import React from 'react'
import {Link} from 'react-router-dom'
// import { toast } from 'react-toastify';
import { HiPencilAlt  } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

	const categoryColorMap={
		saving:"from-green-700 to-green-400",
		expense:"from-pink-800 to-pink-600"
	}



const Card = ({expense,handleFunction}) => {
	const {id,title,description,category,amount,date}=expense;

	const cardClass=categoryColorMap[category];


	const handleUpdate=async(Id)=>{
		try{
			const {data}=await axios.post(`/api/v1/expense/${Id}`,input,config);
			console.log(data);
			toast.success("Update successfully !!");
		}catch(err){
			console.log(err);
		}
	}
	// const handleDelete=async(Id)=>{
	// 	try{
	// 		const config={
	// 			"headers":{					
	// 				"content-type":"application/json"
	// 			}
	// 		}
	// 		const {data}=await axios.delete(`/api/v1/delete/${Id}`,config);
	// 		console.log(data);
	// 		onDelete(Id);
	// 		toast.success("Successfully Deleted");
	// 	}catch(err){
	// 		console.log(err);
	// 	}
	//  }

  return (


	<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass} `}>
		<div className='flex flex-col gap-3'>

		<div className='flex justify-between items-center'>
			<h2 className='font-bold text-white'>{category}</h2>
			<div className='flex items-center gap-2'>
			<FaTrash  className='cursor-pointer'  onClick={handleFunction}/>
				<Link to={`/transection/${expense.id}`}><HiPencilAlt /></Link>

			</div>
		</div>


		<p className='text-white'>Title:{title}</p>
		<p  className='text-white'>Description:{description}</p>
		<p  className='text-white '>Category:{category}</p>
		<p  className='text-white '>Amount:{amount}</p>
		<p  className='text-white flex items-center gap-1'>Time:{date}</p>
		
	</div>
	</div>
  )
}

export default Card