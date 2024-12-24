import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios';

import {toast,ToastContainer }from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {AuthContext} from "../../context/AuthContext"
import ReceiptScanner from '../ReceiptScanner';




const ExpenseForm = ({fetchAgain,setFetchAgain}) => {

	const {currentUser}=useContext(AuthContext);

	const [expense,setExpense]=useState({
		"title":"",
		"description":"",
		"category":"",
		"amount":""
	});
		
		const handChange=async(e)=>{
			e.preventDefault();
		try{
			setExpense((prevState)=>({...prevState,[e.target.name]:e.target.value})) ;
			
	}catch(error){
		console.log(error);

	}}


	const addTransection=async()=>{
	const config=
	{
		headers: {
			"Content-type": "application/json",
			Authorization:`Bearer ${currentUser.token}`
		  }
	}
		try{
			console.log(expense);
			setExpense({
				title: '',
        		description: '',
        		category: '',
        		amount: ''
			  });
			const {data}= await axios.post("/api/v1/add",expense,config);
			console.log(data);
			
			setExpense((prevState)=>({...prevState,data}))
			setFetchAgain(true);
			toast.success("ADDED SUCCESSFULLY !!");


		}catch(err){
			console.log(err);
		}
	}
	
	const handleScanComplete=async(scannedData)=>{
		console.log(scannedData);
		if (scannedData) {
			setExpense((prevExpense) => ({
			  ...prevExpense,
			  amount: scannedData.amount.toString(),
			  description: scannedData.description,
			  category: scannedData.category,
			}));
		  }
	  }
	


  return (
	<div className='flex flex-col w-full items-center px-4'>
		
		<ReceiptScanner onScanComplete={handleScanComplete}/>

	<form className='w-full max-w-lg px-6 flex flex-col  gap-3' >

	<label
						className='block uppercase tracking-wide text-xs font-bold '
						htmlFor='title'
					>
						Title
					</label>
	<input type="text" 
	className='  block sm:w-auto  bg-gray-200 text-black border border-gray-200 rounded  px-4  focus:outline-none focus:bg-white focus:border-gray-500 py-1 md:py-2'
	id='title'
	name='title'
	value={expense.title}
	placeholder='RENT,  SALARY'
	onChange={handChange}
	
	/>

<label
						className='block uppercase tracking-wide text-white text-xs font-bold '
						htmlFor='description'
					>
						DESCRIPTION
					</label>
	<input type="text" 
	className='  block  sm:w-auto bg-gray-200 text-black border border-gray-200 rounded py-3 px-4  focus:outline-none focus:bg-white focus:border-gray-500'
	id='description'
	name='description'
	placeholder='Give a detail  of your expenses '
	value={expense.description}
	onChange={handChange}
	
	/>

<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
						Amount($)
					</label>
					<input
						className=' sm:w-auto appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='amount'
						name='amount'
						type='number'
						placeholder='150'
						value={expense.amount}
						onChange={handChange}
					/>


<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='category'
					>
						Category
					</label>

					<select
							className='block  sm:w-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded  focus:outline-none focus:bg-white focus:border-gray-500'
							id='category'
							name='category'
							value={expense.category}
							onChange={handChange}
						>
						<option value=''>Select a category</option>
          <option value='saving'>Saving</option>
          <option value='expense'>Expense</option>
          <option value='investment'>Investment</option>
						</select>

		
	</form>

<button className='text-white font-bold mt-3 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600 px-4 py-2 rounded-md' onClick={addTransection}>
	ADD TRANSECTION
</button>



	</div>
  )
}

export default ExpenseForm