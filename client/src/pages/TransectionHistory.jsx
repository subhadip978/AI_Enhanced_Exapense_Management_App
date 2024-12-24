import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const categoryColorMap={
	saving:"from-gray-100 to-gray-600",
	expense:"from-pink-800 to-pink-600"
}


const TransectionHistory = () => {

	const {currentUser}=useContext(AuthContext);
	const [inputs,setInputs]=useState([]);
	const [date,setDate]=useState({
		start:"",
		last:""
	});
	const[url,setUrl]=useState();
	const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };


	const fetchData=async()=>{
		try{
			const config = {
				headers: {				  
				  Authorization:`Bearer ${currentUser.token}`
				},
			  };
			  const {data}=await axios.get("/api/v1/add",config);
			  console.log(data);			
			setInputs(data);

		}catch(err){
			console.log(err);
			toast.error("unable to fetch expenses !!");
		}}


		const handleSearch=async(date)=>{
			const {start,last}=date ;
			console.log(start);
			console.log(last);
			try{

				const config={
					headers:{
						Authorization:`Bearer ${currentUser.token}`
					}
				}
				console.log("sending request");
				const {data}=await axios.get(`/api/v1/search?startdate=${start}&lastdate=${last}`,config);
				console.log(data);
				setInputs(data);

			}catch(err){
				console.log(err);
			}
		}

		const handleChange=(e)=>{
			e.preventDefault();

			setDate((prevState)=>({...prevState,[e.target.name]:e.target.value}))
		}

			const handleClick=async()=>{
				try{
					const config={
						headers:{
							Authorization:`Bearer ${currentUser.token}`
						}
					}
					const {data} = await axios.get('/api/v1/download',config); 
					console.log(data);
					setUrl(data);
					setOpen(true);


				}catch(err){
					console.log(err);
				}
			}

useEffect(()=>{
	console.log("i am in transection history page");
	fetchData();

},[]);

  return (
	<div className='text-white'>

		<div className='p-3 flex justify-center items-center gap-2' >			
			<form action="" className='flex sm:w-1/2 '>

			<input
			className='m-3 rounded-md w-full text-black'

			type="date"
			value={date.start}
			name="start"
			onChange={(e)=>handleChange(e)}
			placeholder='Enter the date'
			
			/>
			<input 
			className='m-3 rounded-md  w-full text-black'
			type="date"
			value={date.last}
			name="last"
			onChange={(e)=>handleChange(e)}
			
			placeholder='Enter the date'
			
			 />
			</form>
			<button className='p-2 font-semibold bg-red-600 rounded-md bg-gradient-to-tr to-pink-400 from-blue-500 hover:from-teal-300 hover:to-teal-600' onClick={()=>handleSearch(date)}>Search</button>

			<FaCloudDownloadAlt className='cursor-pointer text-4xl'  onClick={handleClick}/>

			{url && (
				<>
				

				 {/* <Button variant="outlined" onClick={handleClickOpen}>
				 <FaCloudDownloadAlt className='cursor-pointer text-4xl'  onClick={handleClick}/>
			   </Button> */}
			   <Dialog
				 open={open}
				 onClose={handleClose}
				 aria-labelledby="download-dialog-title"
				 aria-describedby="download-dialog-description"
			   >
				 <DialogTitle id="download-dialog-title">
				   {"Confirm Download"}
				 </DialogTitle>
				 <DialogContent>
				   <DialogContentText id="download-dialog-description">
					 Are you sure you want to download this file? This action will use data to retrieve the file from the server.
				   </DialogContentText>
				 </DialogContent>
				 <DialogActions>
				   <Button onClick={handleClose}>Cancel</Button>
				   <a 
				href={url}
				download="expense.json"
            onClick={handleClickOpen}
          className="p-2 mt-4 font-semibold bg-blue-600 text-white rounded-md"
        >
          OK
        </a>
				 </DialogActions>
			   </Dialog>
			   </>
        
      )}



		</div>
		<div className=''>		
		<table className='w-full text-black '>

			<thead className=' '>
				<tr className="bg-purple-700 text-slate-100  border-gray-50 ">
				<th className=' p-3 text-sm font-semibol text-left '>CATEGORY</th>
					<th className=' p-3 text-sm font-semibol text-left'>TITLE</th>
					<th className=' p-3 text-sm font-semibol text-left'>DESCRIPTION</th>
					<th className=' p-3 text-sm font-semibol text-left'>AMOUNT</th>
					<th className=' p-3 text-sm font-semibol text-left'>ACTION</th>
				</tr>
				

				{inputs?.expenses?.length>0 ? inputs.expenses.map((e,index)=>		

						
							<tr className={`${index%2 ===0 ? "bg-gray-500":"bg-gray-600"}`} key={e.id}>
								<td className='p-3 text-white text-sm text-grey-700'>{e.category}</td>
								<td className='p-3 text-white text-sm text-grey-700'>{e.title}</td>
								<td className='p-3 text-sm text-white '>{e.description}</td>
								<td className='p-3 text-sm text-white'>{e.amount}</td>
								<td className='p-3 text-sm text-grey-700 text-white'></td>


							</tr>

							
						
							
				):
				<p className='text-white'>not transection</p>
				

				}
			
</thead>
		
		</table>
		</div>

	</div>
  )
}

export default TransectionHistory