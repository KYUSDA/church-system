import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useGetFamiliesQuery } from "../../services/userServices";
import { TFamily } from "../../services/userServices";
import { urlFor } from "../../../utils/client";
import {PencilLine} from 'lucide-react';

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
    { field: "_id", headerName: "Claim ID", width: 220 },
    {
      field: "title",
      headerName: "Family Name",
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
    { field: "description", headerName: "Description", width: 200 },
    { field: "link", headerName: "Link", width: 150 },
    {
      field: "locationUrl",
      headerName: "Location Image",
      width: 120,
      renderCell: (params: any) =>
        params.row.locationUrl ? (
          <img
            className="w-8 h-8 rounded object-cover"
            src={params.row.locationUrl}
            alt="Location"
          />
        ) : (
          "No Image"
        ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => (
        <div className="flex justify-center items-center space-x-4 w-full h-full">
          <Link to={`/admin/family/${params.row._id}`}>
          <PencilLine 
          className="text-green-500 cursor-pointer"
          />
          </Link>
          <DeleteOutline
            className="text-red-600 cursor-pointer"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex-4">
      {isLoading && <p>Loading families...</p>}
      {error && <p>Error fetching families!</p>}
      {!isLoading && !error && (
        <DataGrid
          rows={data || []}
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
      )}
    </div>
  );
};

export default FamilyList;
