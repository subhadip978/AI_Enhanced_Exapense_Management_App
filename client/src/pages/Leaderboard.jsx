import react, { useState,useContext, useEffect } from 'react';

import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

const Leaderboard=()=>{
	const [data,setData]=useState();
	const [currentPage,setCurrentpage]=useState(1);
	const {currentUser}=useContext(AuthContext);

	const fetchData=async(n)=>{
		const config={
			headers:{
				Authorization:`Bearer ${currentUser.token}`
			}
		}

		try{
			const {data}=await axios.get(`/api/v1/leaderboard?currentpage=${n}`,config);
			console.log(data);
			setData(data);
		}catch(err){
			console.log(err);
		}}

	const handleNext=()=>{
		setCurrentpage((prev)=>(prev+1))
	}
	const handlePrev=()=>{
		setCurrentpage((prev)=>Math.max(prev-1,1))
	}

	useEffect(()=>{
		console.log("leaderboard");
// fetchData(n)
	},[])

	return (
		
			<div className='flex justify-center mt-6   h-screen'>
				<div className=' flex flex-col justify-between h-96 bg-gray-600 rounded-md p-3'>
				<div>
					<table className=' p-3 w-56  '>
						<thead>

						
						<tr className='bg-purple-700 text-slate-100  border-gray-50 '>

						<th className='text-center font-semibold'>
								name
						</th>
						<th className='text-center font-semibold'>
							expense
						</th>
						</tr>
						</thead>
		

			
						<tr>
							<td className='text-center'>sd	</td>					
							<td className='text-center'>3000</td>						
						</tr>
						
						
											
					

					</table>
									

					</div>
					<div className='flex flex-row gap-2 justify-end'>

					<button className='bg-blue-700 rounded-md p-2' onClick={()=>handleNext()}> continue</button>
					<button className='bg-blue-700 rounded-md p-2 onClik={()=>handlePrev()}'>prev</button>
					
					</div>
					
				</div>


			

		</div>
	)
	
}

export default Leaderboard;