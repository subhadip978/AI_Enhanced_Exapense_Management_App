import react, { useContext, useState } from'react'
import Inputfield from '../components/ui/Inputfield'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

import toast from 'react-hot-toast'



const LoginPage=()=>{

	const [inputs, setInputs] = useState({		
		email: "",
		password:""
	})

	const navigate=useNavigate();
	const {login}=useContext(AuthContext);


	const handleChange = (e) => {
		setInputs((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
	}

	const handleClick=async(e)=>{
		e.preventDefault()
		try{		
			const {username,email,password}=inputs ;
				
			await login(inputs);

					toast.success("Successfully logged in");
				
					navigate("/");
				
			


		}catch(err){
			console.log(err.response);
			if(err.response?.status===401){
				toast.error("User not exist")
			}

		}
	}



	return(
		<div className='h-screen  flex justify-center items-center '>
		
			<div className='flex  rounded-lg overflow-hidden z-50 bg-gray-300'>
				<div className='flex flex-col justify-center bg-grey-100  p-6'>


					<h1 className='text-3xl font-bold text-center mb-6 text-black'>Sign In</h1>
					<h1 className='text-grey-500 text-center text-black'>
						Join to keep track of your expenses
					</h1>


					{/* <Inputfield

						id='name'
						name='name'
						value={inputs.name}
						onChange={handleChange} /> */}

					<Inputfield
					label='EMAIL'
						id='email'
						name='email'
						value={inputs.email}
						onChange={handleChange}

					/>


					<Inputfield
					label='PASSWORD'
						id='password'
						name='password'
						value={inputs.password}
						onChange={handleChange}

					/>

					<button type='submit' className='mt-2 bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none' onClick={handleClick}>
						sign In
					</button>



					<p className='text-black'>New to expense manager?
						<Link to="/signup">

							Regsiter Here
						</Link>
					</p>
				</div>
			</div>
		</div>


	
	)
}

export default LoginPage
