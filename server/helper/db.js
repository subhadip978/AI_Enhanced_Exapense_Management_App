  import { Sequelize } from "sequelize"
import { DB_PASSWORD } from "./constant.js"

  

   const sequelize = new Sequelize('expensetracker', 'root', DB_PASSWORD, {
  	host:'localhost',
  	dialect: 'mysql'
  })
  export default sequelize