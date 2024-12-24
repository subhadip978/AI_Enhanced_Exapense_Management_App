import {Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db";


const PasswordReset= sequelize.define('passwordReset',{

			id:{
				type:DataTypes.INTEGER,
				autoIncrement:true,
				allowull:false
			},
			

},{
	timestaps:true,
})


export default PasswordReset ;