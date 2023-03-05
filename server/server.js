const mongoose = require('mongoose');
const app = require('./app.js');
//setting up our cors
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server running on PORT:${process.env.PORT}`)
    })
})