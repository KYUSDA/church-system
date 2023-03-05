const User = require('../Models/authModel');
exports.getAll = async (req,resp,next)=>{
    try{
        const query = req.query.new;
         const users = query ? await User.find().sort({ _id: -1 }).limit(5):await User.find();
        console.log(users);
        resp.status(200).json(users)
    }catch(err){
        resp.status(404).json({
            status:'failure',
            error:err
        }
    )
    }
    }

    exports.getOne =  async (req,resp)=>{
        try{
           const id = req.params.id;
           console.log(id);
            const getOneUser = await User.findById(id);
            console.log(getOneUser);
            resp.status(200).json(getOneUser)
        }catch(err){
resp.status(404).json(err);
        }
}

exports.updateUser = async (req,resp)=>{
    console.log(req.body);
    try{
        const id = req.params.id;
        console.log(id);
        const updatedUser = await User.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        console.log(updatedUser);
        resp.status(201).json({
            status:"success",
            user:{
                updatedUser
            }
        })
    }catch(err){
        resp.status(404).json({
            status:'failure',
            error:err
        })
    }   
}

exports.deleteUser = async (req,resp)=>{
    try
    {
        const id = req.params.id;
        console.log(id);
        const deletedUser = await User.findByIdAndDelete(id);
        console.log(deletedUser);
        resp.status(204).json({
            status:'deleted',
            data:[]
        })
    }catch(err){
        resp.status(404).json(err)

    }
}

exports.createUser = async(req,resp)=>{
    try
    {
        console.log(req.body)
const user = await User.create(req.body);
console.log(user);
resp.status(200).json(user)
    }catch(err){
resp.status(404).json(err)
    }
}