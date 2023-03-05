import React,{useState,useMemo,useEffect} from 'react';
import './Family.css';
import Chart from "../../Dashboard/Chart/Chart"
import {productData} from "../../DummyData/Dummy"
import { Publish } from "@material-ui/icons";
import {useLocation,Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { userRequest } from '../../requestMethods';
import { useDispatch } from 'react-redux';
import { updateFamily  } from '../../redux/apiCall';
const Claim = () => {
    const location = useLocation();
    const familyId = location.pathname.split('/')[2];
    console.log(familyId);
    const dispatch = useDispatch();
    const family = useSelector((state)=>state.family.families.find((family)=>family._id === familyId));
console.log(family);
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
const updatedfamily = {...inputs}
updateFamily(familyId,updatedfamily,dispatch)
alert('user updated');
window.location.replace('/');
}
  return (
    <div className="product">
    <div className="productTitleContainer">
      <h1 className="productTitle">Department</h1>
      <Link to="/newFamily">
        <button className="productAddButton">Create</button>
      </Link>
    </div>
    <div className="productTop">
        <div className="productTopRight">
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className="productInfoKey">id:</span>
                    <span className="productInfoValue">{family._id}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Department Name:</span>
                    <span className="productInfoValue">{family.name}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Elder in Charge</span>
                    <span className="productInfoValue">{family.elder}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Head</span>
                    <span className="productInfoValue">{family.head}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Location</span>
                    <span className="productInfoValue">{family.event}</span>
                </div>
                <div className="productInfoItem">
                    <span className="productInfoKey">Bio</span>
                    <span className="productInfoValue">{family.bio}</span>
                </div>
            </div>
        </div>
    </div>
    <div className="productBottom">
        <form className="productForm">
            <div className="productFormLeft">
                <label>Family Name</label>
                <input type="text" name='name' placeholder={family.name} onChange={handleChange}/>
                <label>Elder In charge</label>
                <input type="number" name='elder' placeholder={family.elder} onChange={handleChange} />
                 <label>Head</label>
            <input type="text" name='head' placeholder={family.head} onChange={handleChange} />
            <label>Location</label>
            <input type="text" name='location' placeholder={family.location} onChange={handleChange} />
            <label>Bio</label>
            <input type="text" name='bio' placeholder={family.bio} onChange={handleChange} />
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
