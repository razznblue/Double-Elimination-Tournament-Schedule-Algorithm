const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const connectToDB = () => {
    const app = express();
    const port = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    // MONGO DB connection string
    const uri = process.env.ATLAS_URI;

    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log(err))

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
    })

    //var router = express.router();
    // load our routes and then add them to our app as middleware
    // const exercisesRouter = require('./routes/exercises');
    // const usersRouter = require('./routes/users');
    // app.use('/exercises', exercisesRouter);
    // app.use('/users', usersRouter);

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

connectToDB();