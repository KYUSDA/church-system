import "./UserList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../DummyData/Dummy";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getUsers , deleteUser} from "../../redux/apiCall";
export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state)=>state.user.currentUser);
  const [data, setData] = useState(userRows);
  useEffect(()=>{
    getUsers(dispatch); 
  },[dispatch])

  const handleDelete = (id) => {
    console.log('deleting');
deleteUser(id,dispatch);
  };
  
  const columns = [
    { 
    field: "_id", 
    headerName: "ID", 
    width: 220 
  },
    {
      field: "firstName",
      headerName: "Firstname",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={'images'} alt="" />
            {params.row.firstName} 
          </div>
        );
      },
    },
    { field: "lastName", 
    headerName: "Lastname", 
    width: 120 },
    { field: "email", 
    headerName: "Email", 
    width: 200 },
    {
      field: "registration",
      headerName: "registration",
      width: 200,
    },
    {
      field: "year",
      headerName: "year of study",
      width: 100,
    },
    {
      field: "role",
      headerName: "Church Role",
      width: 120,
    },
    {
      field: "familyLocated",
      headerName: "Family Group",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row?._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row?._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row?._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}