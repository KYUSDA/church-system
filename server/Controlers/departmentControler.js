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
module.exports = {getDepartmentDetails,getAllDepartments}