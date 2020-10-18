import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import router from './router.js';
import userRouter from './controllers/UserController.js';

// Connect db: admin:password; /nm db?
var uri = process.env.MONGODB_URI;

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }, () =>{
        console.log('Connection to db estabilished.');
    }
);

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//router
app.get('/',(req, res) => {
    res.json({
        message: 'success',
    })
});

app.use('/api', router); 
app.use('/api/user', userRouter);

//listen to port
app.listen(process.env.PORT, ()=>{
    console.log('App listen to port 3000');
});