import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Inputfield from '../components/ui/Inputfield'
import axios from 'axios';

// import 'react-toastify/dist/ReactToastify.css'
import toast from 'react-hot-toast';

// toast

const Signup = () => {

	const navigate=useNavigate();
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password:""
	})

	const [err,setErr]=useState('');


	const handleChange = (e) => {
		setInputs((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
	}
	const handleClick=async()=>{
		console.log('check condition');
		const {username,email,password}=inputs ;
		if(!username || !email || !password){
			console.log('checking condition');
			toast.error("Please Fill all the fields");
			return ;
		}

		try{
			const config = {
				headers: {
				  "Content-type": "application/json",
				},
			  };

			
					const {data}=await axios.post("/api/v1/signup",inputs,config);
					console.log(data);

					toast.success("Account Created Successully !");
					console.log(data);
					
		}catch(err){
			console.log(err);
			 setErr(err); 
       		toast.error("Signup failed. Please try again.");
		}

	}
	
		
	

	return (
		<div className='h-screen  flex justify-center items-center '>
		
			<div className='flex  rounded-lg overflow-hidden z-50 bg-gray-300'>
				<div className='flex flex-col justify-center bg-grey-100  p-6'>

					<h1 className='text-3xl font-bold text-center mb-6 text-black'>Sign Up</h1>
					<h1 className='text-grey-500 text-center text-black'>
						Join to keep track of your expenses
					</h1>


					<Inputfield
					label='Name:'

						id='username'
						name='username'
						value={inputs.username}
						onChange={handleChange} />

					<Inputfield
					label='Email: '
						id='email'
						name='email'
						value={inputs.email}
						onChange={handleChange}

					/>


					<Inputfield
					label='password'
						id='password'
						name='password'
						value={inputs.password}
						onChange={handleChange}

					/>

					<button type='submit' onClick={handleClick} className='mt-2 bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none'>
						sign up
					</button>
					

					

					<p className='text-black'>Already have an account?
						<Link to="/login">

							Login Here
						</Link>
					</p>
					<div>
       
      </div>
				</div>
			</div>
		</div>


	)
}

export default Signup 