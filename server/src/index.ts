// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import v1Router from './routes/index'
import cors from 'cors'
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
app.use(cors())
app.use(express.json());


app.get('/hello',(req,res)=>{
    return res.send('Hello from server')
})
app.use('/api/v1', v1Router)
app.use('*',(req,res)=>{
    return res.json({msg:'404 not found'})
})
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
