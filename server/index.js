
const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const commentController = require('./controllers/commentController');


// const connectionString = 'mongodb://127.0.0.1:27017/unasiposvetasdeca';
// const MongoClient = require('mongodb').MongoClient;
 const connectionString ='mongodb+srv://ninagbs:Nissan2022y@cluster0.yp6m4wn.mongodb.net/unasiposvetasdeca?retryWrites=true&w=majority'
             


                           
start();

async function start() {
    try {
      await mongoose.connect(connectionString);  
       console.log('Database connected');
    } catch (err) {
        console.log(err.message)
        //app to stop
        process.exit(1)
    }
    
   

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational' });
    });

    app.use('/users', authController);
    app.use('/data/catalog', dataController);
   
    const baseUrl ='https://unasiposvetasdeca-qotv-62eh7rxbr-ninagbs-abvbg.vercel.app';
    app.listen(baseUrl, () => console.log('REST service started'));
}