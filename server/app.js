const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const memberRoute = require('./Router/authRoute');
const departmentRoute = require('./Router/departMentRoute');
const userRoute = require('./Router/userRouter');
const familyRoute = require('./Router/familiesRouter');
const app = express();
app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000','http://localhost:3001'],
    credentials:true
}))

app.use('/kyusda/v1/member/',memberRoute);
app.use('/kyusda/v1/department/',departmentRoute);
app.use('/kyusda/v1/user/',userRoute);
app.use('/kyusda/v1/family/',familyRoute);
module.exports = app