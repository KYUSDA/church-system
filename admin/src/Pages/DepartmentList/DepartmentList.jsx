import './DepartmentList.css';
import { Link } from 'react-router-dom';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {useDispatch,useSelector} from 'react-redux'
import { useState,useEffect } from 'react';
import { getDepartments ,deleteDepartment } from '../../redux/apiCall';
import { format } from 'timeago.js';
const DepartmentList = () => {
  const dispatch = useDispatch();
  console.log(useSelector(state=>state));
  const departments = useSelector((state)=>state.department.departments);
  console.log(departments);
  const [data, setData] = useState(departments);
useEffect(() => {
  getDepartments(dispatch)
}, [dispatch])
  const handleDelete = (id) => {
   deleteDepartment(id,dispatch)
  };
  const columns = [
    { field: "_id", headerName: "Department ID", width: 220 },
    {
      field: "name",
      headerName: "Department Name",
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
    { field: "head", headerName: "Department Head", width: 120 },
    { field: "elder", headerName: "Elder Incharge", width: 120 },
    { field: "event", headerName: "Upcoming Event", width: 120 },
    { field: "project", headerName: "project", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/department/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
<DataGrid
        rows={departments}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection />
  </div>
  )
}

export default DepartmentList