import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// import Razorpay from 'razorpay'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import toast from 'react-hot-toast';
// toast
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const navigate = useNavigate();

	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
	const [premiumUser, setPremiumUser] = useState(JSON.parse(localStorage.getItem("premiumuser")) || null);


	const getPremium = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${currentUser.token}`
				}
			}
			const res = await axios.get("/api/v1/premium", config);

			console.log(res);
			console.log(res.razorpay_payment_id);
			const options = {
				key: res.data.key_id,
				order_id: res.data.order_id,

				handler: async function (res) {
					console.log(options.order_id);
					await axios.post("/api/v1/premium", {
						order_id: options.order_id,
						payment_id: res.razorpay_payment_id,
					}, { headers: {
						"Content-type":"application/json" ,Authorization: `Bearer ${currentUser.token}` } 
					});
					console.log(res.razorpay_payment_id);
					setPremiumUser(options.order_id);
					localStorage.setItem("premiumUser", JSON.stringify(currentUser));
					alert("You are a premium User")

				}
			}
			const rzpl = new Razorpay(options);
			rzpl.open();
			rzpl.on("payment.failed", function (res) {
				console.log(res);
				alert('Something went wrong');
			});

		} catch (err) {
			console.log(err)
		}
	}

	const login = async (input) => {
		
					if(!input.password || !input.email){
						toast.error("input all fields")
					return ;
					}
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		console.log(input);
		const { data } = await axios.post("/api/v1/signin", input,
			config);
		console.log(data);
		setCurrentUser(data);
	}

	useEffect(() => {
		localStorage.setItem("userInfo", JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser, login, getPremium }}>
			{children}
		</AuthContext.Provider>
	)
}

// export default AuthContextProvider