
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');
const trimBody = require('./middlewares/trimBody');
const session = require('./middlewares/session');
const commentController = require('./controllers/commentController');


// const connectionString = 'mongodb://127.0.0.1:27017/unasiposvetasdeca';
// const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://ninagbs:Nissan2022y@cluster0.yp6m4wn.mongodb.net/unasiposvetasdeca?retryWrites=true&w=majority'

start();

function start() {
    mongoose.connect(connectionString).then(() => console.log('Database connected'), (err) => {
        console.log(err.message)
        //app to stop
        process.exit(1)
    });
    console.log('Database connected');

    const app = express();
    app.use(express.json());
    // TODO replace * with 'https://unasiposvetasdeca.vercel.app'
    app.use(cors({
        origin: 'https://unasiposvetasdeca.vercel.app'
    }));
    app.use(trimBody());
    app.use(session());

    app.get('/', (req, res) => {
        res.json({ message: 'REST service operational' });
    });

    app.use('/users', authController);
    app.use('/data/catalog', dataController);
    //    TODO replace 80 with 3030
    app.listen(80, () => console.log('REST service started'));
    module.exports = app;
}