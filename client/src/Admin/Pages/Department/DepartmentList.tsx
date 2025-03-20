import { Link } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const DepartmentList: React.FC = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state: any) => state.department.departments);

  useEffect(() => {
    // getDepartments(dispatch);
  }, [dispatch]);

  const handleDelete = (id: string) => {
    // deleteDepartment(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "Department ID", width: 220 },
    {
      field: "name",
      headerName: "Department Name",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover mr-2"
              src={params.row.img}
              alt=""
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "head", headerName: "Department Head", width: 120 },
    { field: "elder", headerName: "Elder Incharge", width: 120 },
    { field: "event", headerName: "Upcoming Event", width: 120 },
    { field: "project", headerName: "Project", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center">
            <Link to={`/department/${params.row._id}`}>
              <button className="border-none rounded-lg px-2 py-1 bg-green-600 text-white cursor-pointer mr-4">
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex-4">
      <DataGrid
        rows={departments}
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
};

export default DepartmentList;
