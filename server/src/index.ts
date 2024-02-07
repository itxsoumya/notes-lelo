// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import v1Router from './routes/index'
import cors from 'cors'
import { upload } from "./utils/mutterConfig";

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 8080;
app.use(cors({
    origin:[process.env.CLIENT_URI1!,process.env.CLIENT_URI2!,'http://localhost:5173']
}))
app.use(express.json());
// app.use(upload.any())


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
