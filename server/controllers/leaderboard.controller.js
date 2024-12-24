
import sequelize from "../helper/db.js";
import Expense from "../models/expense.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

import {Sequelize} from "sequelize";


export const leaderboard = async (req, res,next) => {  

	try {	  
	  const leaderboard = await Expense.findAll({
		attributes: [
		  'userId',
		  [sequelize.fn('SUM', sequelize.col('amount')), 'totalExpense'], 
		],
		include: [
		  {
			model: User, 
			attributes: ['id', 'username'], 
		  },
		],
		group: ['userId'], 
		order: [[sequelize.fn('SUM', sequelize.col('amount')), 'DESC']],
	  });
  
	  res.status(200).json(leaderboard); 
	} catch (err) {
	  next(err)
	}
  };
  