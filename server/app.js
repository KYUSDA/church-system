const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const memberRoute = require('./Router/authRoute')
const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use('/kyusda/v1/member/',memberRoute);
module.exports = app