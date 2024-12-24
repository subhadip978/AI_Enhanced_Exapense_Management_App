import Order from "../models/order.model.js";
import Errorhandler from "../utils/utility-class.js";
import Razorpay from 'razorpay'


export const checkOut=async(req,res,next)=>{
	try{

		console.log("Razorpay key  ID:",process.env.RZP_KEY_ID);
		const rzp =new Razorpay({
			key_id:process.env.RZP_KEY_ID,
			key_secret:process.env.RZP_SECRET
		})

		const options={
			amount:300,
			currency:"INR"
		};

		const order=await rzp.orders.create(options);
		console.log(order);
		

		const newOrder=await Order.create({
		order_id:order.id,
		status:"PENDING",
		userId:req.user.id,
		amount:options.amount,
		currency:options.currency,

		})

		console.log("neworder created successfully || ")
		res
		.status(201)
		.json({success:true, newOrder, key_id:rzp.key_id});

	}catch(err){
		next(err);
	}
}


export const updateTransection=async(req,res,next)=>{
	try{
		console.log("Order update started ||")
		const {order_id,payment_id}=req.body ;
		console.log("order_id ||",order_id)

		const  order=await Order.findOne({
			where:{order_id:order_id}
		});
		if(!order){
			throw new Errorhandler("order not found",404)
		}
		const result= await Order.update({
			paymentid:payment_id,
			status:"SUCCESSFUL"
		})
		res.status(200).json({success:true, result});

	}catch(err){
		next(err);
	}

}