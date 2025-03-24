import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "../../DummyData/Dummy";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const dispatch = useDispatch();
  const [data, setData] = useState(userRows);

  useEffect(() => {
    
  }, [dispatch]);

  const handleDelete = (id: string) => {
    
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "firstName",
      headerName: "Firstname",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover mr-2"
              src={"images"}
              alt=""
            />
            {params.row.firstName}
          </div>
        );
      },
    },
    { field: "lastName", headerName: "Lastname", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "registration",
      headerName: "Registration",
      width: 200,
    },
    {
      field: "year",
      headerName: "Year of Study",
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
      renderCell: (params: any) => {
        return (
          <>
            <Link to={"/user/" + params.row?._id}>
              <button className="border-none rounded-lg px-2 py-1 bg-green-600 text-white cursor-pointer mr-4">
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="text-red-600 cursor-pointer"
              onClick={() => handleDelete(params.row?._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="flex-4">
      <DataGrid
        rows={data}
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8 },
          },
        }}
        checkboxSelection
      />
    </div>
  );
}
