import React,{useState,useMemo,useEffect} from 'react';
import './Department.css';
import Chart from "../../Dashboard/Chart/Chart"
import {productData} from "../../DummyData/Dummy"
import { Publish } from "@material-ui/icons";
import {useLocation,Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { userRequest } from '../../requestMethods';
import { useDispatch } from 'react-redux';
import { updateDepartment } from '../../redux/apiCall';
const Claim = () => {
    const location = useLocation();
    const departmentId = location.pathname.split('/')[2];
    console.log(departmentId);
    const dispatch = useDispatch();
    const department = useSelector((state)=>state.department.departments.find((department)=>department._id === departmentId));
console.log(department);
const [inputs ,setInputs] = useState();
const handleChange = (e)=>{
    setInputs((prev)=>{
      console.log({...prev,[e.target.name]:e.target.value})
        return {...prev,[e.target.name]:e.target.value}
    })
}
const handleClick = (e)=>{
  console.log('updating');
e.preventDefault();
console.log({...inputs});
const updatedDepartment = {...inputs}
updateDepartment(departmentId,updatedDepartment,dispatch)
alert('user updated');
window.location.replace('/');
}
  return (
    <div className="product">
    <div className="productTitleContainer">
      <h1 className="productTitle">Department</h1>
      <Link to="/newDepart">
        <button className="productAddButton">Create</button>
      </Link>
    </div>
    <div className="productTop">
        <div className="productTopRight">
            <div className="productInfoTop">
                <span className="productName">{department.submittedBy}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">{department._id}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Department Name:</span>
                    <span className="productInfoValue">{department.name}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Elder in Charge</span>
                    <span className="productInfoValue">{department.elder}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Head</span>
                    <span className="productInfoValue">{department.head}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Event</span>
                    <span className="productInfoValue">{department.event}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Project</span>
                    <span className="productInfoValue">{department.project}</span>
                </div>
            </div>
        </div>
    </div>
    <div className="productBottom">
        <form className="productForm">
            <div className="productFormLeft">
                <label>Department Name</label>
                <input type="text" name='name' placeholder={department.name} onChange={handleChange}/>
                <label>Elder In charge</label>
                <input type="number" name='elder' placeholder={department.elder} onChange={handleChange} />
                 <label>Head</label>
            <input type="text" name='head' placeholder={department.head} onChange={handleChange} />
            <label>Upcoming Event</label>
            <input type="text" name='event' placeholder={department.event} onChange={handleChange} />
            <label>Project</label>
            <input type="text" name='project' placeholder={department.project} onChange={handleChange} />
            </div>
            <div className="productFormRight">
                <div className="productUpload">
                    <input type="file" id="file" style={{display:"none"}} />
                </div>
                <button onClick={handleClick} className="productButton">Update</button>
            </div>
        </form>
    </div>
  </div>
  )
}

export default Claim
