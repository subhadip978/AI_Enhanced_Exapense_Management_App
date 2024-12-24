import React, { useContext,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";
import { AuthContext } from '../../context/AuthContext';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios'

const Header = () => {

	const {currentUser,getPremium}=useContext(AuthContext);

	const [isPremium,setPremium]=useState(false);
	const navigate=useNavigate();

	const handleLogout=async()=>{
		try{
			const config={
				headers:{
					Authorization:`Bearer ${currentUser.token}`
				}}

			// localStorage.removeItem("userInfo");
			localStorage.setItem("userInfo",null);
			// const {data}=await axios.get("/api/v1/logout",config);
			navigate("/login");

		}catch(err){
			console.log(err);
		}
	}

	const handlePremium=()=>{
		getPremium();
	}

  return (
	//  <nav>

	
	<div className='flex items-center py-2 justify-around '>
		{/* <div className='flex items-center justify-around'> */}

		
		<h1 className='text-2xl font-bold  '>
			ExpenseManager
		</h1>
		


		<ul className='  space-x-8 font-bold  hover:pink-600 lg:text-2xl hidden md:flex  items-center'>
			<li className='hover:bg-slate-500 p-2  rounded-md cursor-pointer'><Link to="/expense">Expense
			</Link></li>
			<li className='hover:bg-slate-500  p-2 rounded-md cursor-pointer'>Dashboard</li>
			{/* <li className='  p-2 rounded-md cursor-pointer'><Link to="/leaderboard">Leaderboard </Link> </li> */}

			 {isPremium ? (
			<li className='  p-2 rounded-md cursor-pointer'><Link to="/leaderboard"></Link> Leaderboard 
			</li> ) :(

			<li className='  p-2  rounded-md cursor-pointer'>
				<Tooltip title=" Oops !! Try membership">
					
					<span onClick={handlePremium}>Leaderboard
						</span>
					</Tooltip>
			
			</li>
			)
			} 
			
			<li className='hover:bg-slate-500 p-2  rounded-md cursor-pointer flex justify-center items-center' onClick={handleLogout}>Log Out <CiLogout /></li>
		</ul>
	


		</div>

	// </div>
	//  </nav>
  )
}

export default Header