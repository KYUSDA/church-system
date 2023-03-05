import React,{useState,useEffect} from 'react';
import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from '../../requestMethods';
const FeaturedInfo = () => {
  const [members, setMembers] = useState([]);
  const [families,setFamilies] = useState([]);
  const [department,setDepartments] = useState([]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/user/getUsers");
        const family = await userRequest.get('/family/getFamilies');
        const depart = await userRequest.get('/department/getAll');
        setMembers(res.data);
        setFamilies(family.data);
        setDepartments(depart.data);
      } catch {}
    };
    getIncome();
  }, []);
  console.log(members.length,families.length,department.length);
  return (
<div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Church Members</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{members.length}</span>
          <span className="featuredMoneyRate">
          </span> 
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Families</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{families.length}</span>
          <span className="featuredMoneyRate">
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Departments</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{department.length}</span>
          <span className="featuredMoneyRate">
  
          </span>
        </div>
      </div>
    </div>
  )
}

export default FeaturedInfo
