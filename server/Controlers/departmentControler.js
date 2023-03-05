const departmentModel = require('../Models/departmentModel')
const getDepartmentDetails  =  async(req,resp)=>{
    try
    {
        const {departmentName} = req.body;
        console.log(departmentName);
        const getData = await  departmentModel.findOne({
            name:departmentName});
        console.log(getData);
        resp.status(200).json({
            status:'success',
            data:getData
        })
    }catch(err){
resp.status(404).json({
    status:'failure',
    err
})
    }
}

const getAllDepartments = async(req,resp)=>{
    try{
const departments = await departmentModel.find();
resp.status(200).json(departments)
    }catch(err){
resp.status(404).json(err)
    }
}

const deleteDepertment = async (req,resp)=>{
    try
    {
        console.log('server deleting data');
        const id = req.params.id;
        console.log(id);
        const deletedDep = await departmentModel.findByIdAndDelete(id);
        console.log(deletedDep);
        resp.status(204).json({
            status:'deleted',
            data:[]
        })
    }catch(err){
        resp.status(404).json(err)

    }
}
const updateDepartment = async (req,resp)=>{
    try{
        const id = req.params.id;
        console.log(id,req.body,'from update claim');
        const updateDepartment = await departmentModel.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        console.log(id,updateDepartment);
        resp.status(201).json({
            status:"success",
            data:{
                updateDepartment
            }
        })
    }catch(err){
resp.status(404).json({
    status:'failure',
    error:err
})
    }
}

const createDep = async(req,resp)=>{
try{
const depart =  await departmentModel.create(req.body);
console.log(depart);
resp.status(200).json(depart)
}catch(err){
resp.status(404).json(err);
}
}


module.exports = {
getDepartmentDetails,
getAllDepartments,
deleteDepertment,
updateDepartment,
createDep
}