import {Sequelize,DataTypes} from 'sequelize';
import sequelize from '../helper/db.js';

 

const Expense= sequelize.define('expense',{
	id:{
		type:DataTypes.INTEGER,
		autoIncrement:true,
		primaryKey:true,
	},
	title:{
		type:DataTypes.STRING,
		allowNull:false
	},

	description:{
		type:DataTypes.STRING,
		allowNull:false
	},
	category:{
		type:DataTypes.STRING,
		allowNull:false
	},
	amount:{
		type:DataTypes.INTEGER,
		allowNull:false
	},
	date:{
		type:DataTypes.DATE,
		default:Sequelize.now,
	}

})


export default Expense ;