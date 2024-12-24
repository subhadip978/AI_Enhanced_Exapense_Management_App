import react from 'react'
import Card from './Card'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { useContext ,useEffect,useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
// import { TryCatch } from '../../../../server/middleware/err';
// const genAi= new GoogleGenerativeI(process.env.gemini_API_KEY)


const Cards=({fetchAgain,setFetchAgain})=>{

	const [data,setData]=useState([]);
	
	const {currentUser}=useContext(AuthContext);

	
	const scanReceipt=async(file)=>{

		const response =await axios.get("/api/v1/scanreceipt");
		console.log(response);


	}
		

	const handleExpense=async()=>{
		try{
			const config = {
				headers: {				  
				  Authorization:`Bearer ${currentUser.token}`
				},
			  };
			  const {data}=await axios.get("/api/v1/add",config);
			  console.log(data);
			  console.log(data.expenses);
			  setData(data);
			 
		}catch(err){
			console.log(err);
		}
	}

	const handleDelete=async(Id)=>{
		console.log(Id);
		try{
			const config={
				"headers":{		
					Authorization:`Bearer ${currentUser.token}`,			
					"content-type":"application/json"
				}
			}
			const res=await axios.delete(`/api/v1/delete/${Id}`,config);
		
			// setData((data)=>data.expenses.filter(item=>item.id !==Id));
			setFetchAgain(true);
			toast.success("Successfully Deleted");
		}catch(err){
			console.log(err);
		}
	}


	   useEffect(()=>{
	 	 handleExpense();
		 console.log("deleted")
		  setFetchAgain(false);
	   },[fetchAgain]);


	return(
		<div className='w-full px-10 min-h-[40vh] '>
				<p className='text-3xl font-bold text-center my-10'>RECENT HISTORY</p>

				<div className='grid grid-cols-3'>
					 {data?.expenses?.length >0 ? data.expenses.map((e)=>(
						<Card key={e.id} expense={e} handleFunction={()=>handleDelete(e.id)} />
					))
				: 					
					(
					
						<p className='text-2xl font-bold text-white w-full text-center'>No transection found</p>
					)
					}
				</div>



		</div>
	)
}

export default Cards