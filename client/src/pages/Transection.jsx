import React, { useState ,useEffect, useContext} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReceiptScanner from '../components/ReceiptScanner';



const Transection = () => {

  const {currentUser}= useContext(AuthContext);
  const location =useLocation();
  const navigate=useNavigate();
  const Id= location.pathname.split("/")[2];
  const [expense, setExpense] = useState({
    "title":"",
    "description":"",
    "amount": "",
    "category": "",
  });

  const handChange = (e) => {
    e.preventDefault();
    setExpense((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  const handleUpdate = async (Id) => {
    try {
      const config={
        hedears:{
          "Content-type":"application/json",
          Authorization:`Bearer ${currentUser.token}`
        }
      }

      const { data } = await axios.post(`/api/v1/update/${Id}`, expense, config);
      console.log(data);
      toast.success("Update successfully !!") ;
      navigate("/");


    } catch (err) {
      console.log(err);
    }
  }


  useEffect(()=>{
    
    const fetchExpense=async(Id)=>{

      const config ={
        headers:{
         Authorization:`Bearer ${currentUser.token}`
        }
  
      }
      const {data}=await axios.get(`/api/v1/add/single/${Id}`,config);
      console.log(data.expense);
      setExpense(data.expense);
    }
    fetchExpense(Id);


  },[]) ;





  return (
    <div className='flex flex-col w-full items-center px-4'>

     


      <form className='w-full max-w-lg px-6 flex flex-col  gap-3' >

        <label
          className='block uppercase tracking-wide text-xs font-bold '
          htmlFor='title'
        >
          Title
        </label>
        <input type="text"
          className='  block w-3/4 sm:w-auto  bg-gray-200 text-black border border-gray-200 rounded  px-4  focus:outline-none focus:bg-white focus:border-gray-500 py-1 md:py-2'
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
          className='  block w-3/4 sm:w-auto bg-gray-200 text-black border border-gray-200 rounded py-3 px-4  focus:outline-none focus:bg-white focus:border-gray-500'
          id='description'
          name='description'
          value={expense.description}
          placeholder='Give a detail  of your expenses '
          onChange={handChange}

        />

        <label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
          Amount($)
        </label>
        <input
          className='w-3/4 sm:w-auto appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          id='amount'
          name='amount'
          value={expense.amount}
          type='number'
          placeholder='150'
          onChange={handChange}
        />


        <label
          className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
          htmlFor='category'
        >
          Category
        </label>

        <select
          className='block w-3/4 sm:w-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded  focus:outline-none focus:bg-white focus:border-gray-500'
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
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600 px-4 py-2 rounded-md' onClick={()=>{handleUpdate(expense.id)}}>
        UPDATE TRANSECTION
      </button>



    </div>
  )
}

export default Transection