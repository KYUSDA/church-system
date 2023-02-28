import React,{useEffect,useState} from 'react'
import './FamilyList.css';
import { Link } from 'react-router-dom';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {useDispatch,useSelector} from 'react-redux';
import {getFamilies} from '../../redux/apiCall'
const FamilyList = () => {
    const dispatch = useDispatch();
    console.log(useSelector(state=>state));
    const families = useSelector((state)=>state.family.families);
  console.log(families)
    useEffect(()=>{
    getFamilies(dispatch);
  },[dispatch]);
  const columns = [
    { field: "_id", headerName: "Claim ID", width: 220 },
    {
      field: "name",
      headerName: "Family Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "elder", headerName: "Elder Incharge", width: 120 },
    { field: "head", headerName: "Family Head", width: 120 },
    { field: "location", headerName: "Located", width: 120 },
    { field: "bio", headerName: "Bio", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/claim/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
            />
          </>
        );
      },
    },
  ];
  
    return (
        <div className="productList">
<DataGrid
        rows={families}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection />
  </div>
  )
}

export default FamilyList