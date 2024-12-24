

import {Sequelize,DataTypes} from 'sequelize'

import Expense from './expense.model.js';
import sequelize from '../helper/db.js';



const User=sequelize.define('user',{
	id:{
		type:DataTypes.INTEGER,
		autoIncrement:true,
		allowNull:false,
		primaryKey:true
	},

	username:{
		type:DataTypes.STRING,
		unique:true,
		allowNull:false
	},

	email:{
		type:DataTypes.STRING,
		unique:true,
		allowNull:false,
	},
	password:{
		type:DataTypes.STRING,
		allowNull:false
	}


})

User.hasMany(Expense,{
	foreignKey:'userId',
	onDelete:'CASCADE'
});
Expense.belongsTo(User, { foreignKey: 'userId' });

export default User ;
