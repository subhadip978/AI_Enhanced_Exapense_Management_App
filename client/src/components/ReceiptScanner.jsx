import React, { useEffect,useState ,useRef} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';


const ReceiptScanner = ({onScanComplete}) => {

	const [scannedData,setScannedData]=useState(null);
	const fileInputRef= useRef()

	const handleReceiptScan=async(file)=>{
		const config={
			headers:{
				"Content-type":"multipart/form-data"
			}
		}
		const formData= new FormData();
		formData.append("file",file);
		console.log("calling handleReceiptScan api ")
		const response=await axios.post("/api/v1/scanner",formData,config);
		console.log(response);
	   setScannedData(response.data);

	}

	useEffect(()=>{
		if(scannedData){
			onScanComplete(scannedData);
			toast.success("receipt scanned successfully")

		}

	},[scannedData])
  return (
	<div>
		<input 
		type="file" 
		name=""
		 id=""
		 ref={fileInputRef}
		 className='hidden'
		 accept="image/*"
		 onChange={(e)=>{
			const file=e.target.files[0] ;
			console.log(file);
			if(file) handleReceiptScan(file);

		 }}

		  />

		  <button className=''
		  onClick={()=>{
			fileInputRef.current?.click();
			
		  }}>
			Scan receipt with AI
		  </button>
	</div>
  )
}

export default ReceiptScanner