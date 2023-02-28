import React,{useState,useEffect} from 'react';
import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { userRequest } from '../../requestMethods';
const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/order/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);
  console.log(income)
  return (
<div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Church Members</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1] ? income[1]?.total : income[0]?.total }</span>
          <span className="featuredMoneyRate">
          %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span> 
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Families</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">20</span>
          <span className="featuredMoneyRate">
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Departments</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">15</span>
          <span className="featuredMoneyRate">
  
          </span>
        </div>
      </div>
    </div>
  )
}

export default FeaturedInfo
