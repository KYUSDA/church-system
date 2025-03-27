import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useGetFamiliesQuery } from "../../services/userServices";
import { TFamily } from "../../services/userServices";
import { urlFor } from "../../../utils/client";
import { PencilLine } from "lucide-react";

const FamilyList: React.FC = () => {
  const { data: familyData, isLoading, error } = useGetFamiliesQuery();
  const [data, setData] = useState<TFamily[]>([]);

  useEffect(() => {
    if (familyData && Array.isArray(familyData)) {
      const formattedData = familyData.map((dept) => ({
        _id: dept._id,
        title: dept.title,
        imgUrl: dept.imgUrl ? urlFor(dept.imgUrl).url() : "/kyu.jpg",
        description: dept.description || "No description available",
        locationUrl: dept.locationUrl ? urlFor(dept.locationUrl).url() : null,
        tags: dept.tags || [],
        link: dept.link || "#",
      }));

      setData(formattedData);
    }
  }, [familyData]);

  const handleDelete = (id: string) => {
    console.log(`Delete family with ID: ${id}`);
    // Implement delete logic here
  };

  const columns = [
    { field: "_id", headerName: "Claim ID", minWidth: 200, flex: 1 },
    {
      field: "title",
      headerName: "Family Name",
      minWidth: 200,
      flex: 1,
      renderCell: (params: any) => (
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full object-cover mr-2"
            src={params.row.imgUrl}
            alt={params.row.title}
          />
          <span className="truncate">{params.row.title}</span>
        </div>
      ),
    },
    { field: "description", headerName: "Description", minWidth: 250, flex: 1 },
    { field: "link", headerName: "Link", minWidth: 150, flex: 1 },
    {
      field: "locationUrl",
      headerName: "Location",
      minWidth: 120,
      flex: 1,
      renderCell: (params: any) =>
        params.row.locationUrl ? (
          <img
            className="w-12 h-12 rounded object-cover"
            src={params.row.locationUrl}
            alt="Location"
          />
        ) : (
          "No Image"
        ),
    },
    {
      field: "action",
      headerName: "Actions",
      minWidth: 120,
      flex: 1,
      renderCell: (params: any) => (
        <div className="flex justify-center items-center space-x-4">
          <Link to={`/admin/family/${params.row._id}`}>
            <PencilLine className="text-green-500 cursor-pointer" />
          </Link>
          <button onClick={() => handleDelete(params.row._id)} className="text-red-600 cursor-pointer">
            <DeleteOutline />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-white shadow-md rounded-lg">
      {error && <p className="text-red-500">Error fetching families!</p>}
      {!isLoading && !error && (
        <div className="max-w-full">
        <div className="min-w-[900px]">
          <DataGrid
            rows={data || []}
            columns={columns}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10]}
            pagination
            disableRowSelectionOnClick
            checkboxSelection
            className="w-full"
          />
        </div>
      </div>
      
      )}
    </div>
  );
};

export default FamilyList;
