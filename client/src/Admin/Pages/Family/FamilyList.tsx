import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

const FamilyList: React.FC = () => {
    const dispatch = useDispatch();
    const families = useSelector((state: any) => state.family.families);

    useEffect(() => {
        // getFamilies(dispatch);
    }, [dispatch]);

    const handleDelete = (id: string) => {
        // deleteFamily(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "Claim ID", width: 220 },
        {
            field: "name",
            headerName: "Family Name",
            width: 200,
            renderCell: (params: any) => {
                return (
                    <div className="flex items-center">
                        <img className="w-8 h-8 rounded-full object-cover mr-2" src={params.row.img} alt="" />
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
            renderCell: (params: any) => {
                return (
                    <div className="flex items-center">
                        <Link to={`/family/${params.row._id}`}>
                            <button className="border-none rounded-lg px-2 py-1 bg-green-600 text-white cursor-pointer mr-4">
                                Edit
                            </button>
                        </Link>
                        <DeleteOutline
                            className="text-red-600 cursor-pointer"
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
                rows={families}
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

export default FamilyList;
