import express from 'express'
const app=express();

import dotenv from "dotenv" ;
import errorMiddleware from './middleware/err.js';
import Sequelize from 'sequelize';



dotenv.config({
    path: './.env'
})
import cors from 'cors'

const port=process.env.PORT ||3000;

 import authRouter from './routes/user.router.js';
 import expenseRouter from './routes/expense.router.js'
 import leaderboardRouter from "./routes/leaderboard.router.js"
 import  premiumRouter from "./routes/premium.router.js"
 import scannerRouter from './routes/scanner.route.js'
import sequelize from './helper/db.js';
app.use(express.json());

app.use(cors({
origin:'http://localhost:3000',
credentials:true
}))

console.log(process.env.DB_NAME)

 app.use("/api/v1",authRouter);
app.use("/api/v1",expenseRouter);
 app.use("/api/v1",leaderboardRouter);
 app.use("/api/v1",premiumRouter);
 app.use("/api/v1",scannerRouter);

app.use(errorMiddleware);



sequelize.sync()
.then(result=>{

	app.listen(port,()=>{
		console.log(`server is connected :http://localhost:${port}` )
	})
})
