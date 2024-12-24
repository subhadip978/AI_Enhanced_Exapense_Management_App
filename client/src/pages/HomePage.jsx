import React, { useContext, useEffect ,useState} from 'react'
import Header from '../components/ui/Header'
import ExpenseForm from '../components/ui/ExpenseForm'
import Cards from '../components/ui/Cards'
import { AuthContext } from '../context/AuthContext'


const HomePage = () => {

  const {currentUser}=useContext(AuthContext);
  const [fetchAgain,setFetchAgain]=useState(false);

  return (
	<div className='flex flex-col max-w-7xl mx-auto  justify-center'>

    <div className='flex justify-center mt-8' >

      <p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative  inline-block  mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 text-transparent bg-clip-text'>
        Spend wisely , track wisely 
      </p>
      <img src="" alt="" srcset="" />
    </div>
    <div className='w-full flex flex-col justify-center items-center'>

    <ExpenseForm fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>

    </div>
    <Cards fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
  </div>
  )
}

export default HomePage