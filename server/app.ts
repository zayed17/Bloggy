import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute';
import blogRoute from './routes/blogRoute';
import connectDB from './config/db';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config(); 

const app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS','PUT','PATCH','DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

app.use(cors(corsOptions));  


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

connectDB(); 

app.use('/api/users', userRoute);
app.use('/api/blog', blogRoute);



const port = process.env.PORT || 1717; 

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
