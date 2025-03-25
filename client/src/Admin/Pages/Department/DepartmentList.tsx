import { Link } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { TDepartment, useGetDepartmentsQuery } from '../../services/userServices';
import {PencilLine} from 'lucide-react';
import { urlFor } from '../../../utils/client';

const DepartmentList: React.FC = () => {
  const { data: departmentsData } = useGetDepartmentsQuery(); 
  const [data, setData] = useState<TDepartment[]>([]);

  useEffect(() => {
    if (departmentsData && Array.isArray(departmentsData)) {
      const formattedData = departmentsData.map((dept) => ({
        _id: dept._id,
        title: dept.title,
        imgUrl: urlFor(dept.imgUrl).url(),
        description: dept.description || "No description",
        link: dept.link || "#",
      }));

      setData(formattedData);
    }
  }, [departmentsData]);

  const handleDelete = (id: string) => {
    // deleteDepartment(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "Department ID", width: 220 },
    {
      field: "title",
      headerName: "Department Name",
      width: 200,
      renderCell: (params: any) => (
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full object-cover mr-2"
            src={params.row.imgUrl}
            alt={params.row.title}
          />
          {params.row.title}
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      renderCell: (params: any) => (
        <div className="text-gray-600 truncate ">{params.row.description}</div>
      ),
    },
    {
      field: "link",
      headerName: "Link",
      width: 200,
      renderCell: (params: any) => (
        <a href={
          params.row.link
        } target="_blank" rel="noreferrer">
          {params.row.link}
        </a>
      ),
    },
 
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => (
        <div className="flex justify-center items-center space-x-4 w-full h-full">
          <Link to={`/admin/department/${params.row._id}`}>
          <PencilLine 
          className="text-green-500 cursor-pointer"
          />
          </Link>
          <DeleteOutline
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex-4">
      <DataGrid
        rows={data ?? []}
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
