import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TUser, useGetMembersQuery } from "../../services/userServices";
import { PencilLine} from 'lucide-react'

export default function UserList() {
  const [data, setData] = useState<TUser[]>([]);
  const { data: membersData } = useGetMembersQuery();

  // extract the `users` array properly
  useEffect(() => {
    if (membersData && Array.isArray(membersData.users)) {
      setData(membersData.users);
    }
  }, [membersData]);

  const handleDelete = (id: string) => {
    // Implement delete logic here
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "firstName",
      headerName: "Firstname",
      width: 200,
      renderCell: (params: any) => (
        <div className="flex items-center">
          <img className="w-8 h-8 rounded-full object-cover mr-2" src={"images"} alt="" />
          {params.row.firstName}
        </div>
      ),
    },
    { field: "lastName", headerName: "Lastname", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "registration", headerName: "Registration", width: 200 },
    { field: "year", headerName: "Year of Study", width: 100 },
    { field: "role", headerName: "Church Role", width: 120 },
    { field: "familyLocated", headerName: "Family Group", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => (
        <div className="flex justify-center items-center space-x-4 w-full h-full">
          <Link to={`/admin/users/${params.row?._id}`}>
          <PencilLine 
          className="text-green-500 cursor-pointer"
          />
          </Link>
          <DeleteOutline
            className="text-red-600 cursor-pointer"
            onClick={() => handleDelete(params.row?._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex-4">
      <DataGrid
        rows={data ?? []} // Ensure rows is always an array
        disableRowSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
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
