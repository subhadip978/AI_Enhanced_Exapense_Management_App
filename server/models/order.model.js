import  { Sequelize,DataTypes, BelongsToMany } from "sequelize";

import User from "./user.model.js";
import sequelize from "../helper/db.js";




const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        unique: true,
         autoIncrement:true,
        allowNull: false
    },
    order_id:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:true,




    },
    paymentid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
        allowNull: false,
        defaultValue: 'PENDING'
    },
  
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'INR'
    }
}, {
    timestamps: true
});

User.hasMany(Order,{foreignKey:'userId'});
Order.belongsTo(User,{ foreignKey: 'userId' });

export default Order;


