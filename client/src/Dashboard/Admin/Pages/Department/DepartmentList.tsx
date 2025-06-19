import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  TDepartment,
  useGetDepartmentsQuery,
} from "../../../../services/adminService";
import { PencilLine, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { urlFor } from "../../../../utils/client";

const DepartmentList: React.FC = () => {
  const { data: departmentsData } = useGetDepartmentsQuery();
  const [data, setData] = useState<TDepartment[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const departmentsPerPage = 5;

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

  const handleSort = (field: keyof TDepartment) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setData((prevData) =>
      [...prevData].sort((a, b) =>
        order === "asc"
          ? a[field] > b[field]
            ? 1
            : -1
          : a[field] < b[field]
          ? 1
          : -1
      )
    );
  };

  const handleSelect = (id: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(id) ? prev.filter((deptId) => deptId !== id) : [...prev, id]
    );
  };

  const filteredData = data.filter(
    (dept) =>
      dept.title.toLowerCase().includes(search.toLowerCase()) ||
      dept.description.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastDept = currentPage * departmentsPerPage;
  const indexOfFirstDept = indexOfLastDept - departmentsPerPage;
  const currentDepartments = filteredData.slice(
    indexOfFirstDept,
    indexOfLastDept
  );
  const totalPages = Math.ceil(filteredData.length / departmentsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Department Management
      </h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative w-full">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent my-4"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3 text-left">ID</th>
                  <th
                    className="p-3 text-left cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center gap-1">
                      Department{" "}
                      {sortField === "title" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp size={12} />
                        ) : (
                          <ChevronDown size={12} />
                        ))}
                    </div>
                  </th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentDepartments.map((dept) => (
                  <tr
                    key={dept._id}
                    className="border-t border-gray-100 hover:bg-gray-100"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept._id)}
                        onChange={() => handleSelect(dept._id)}
                      />
                    </td>
                    <td className="p-3 truncate max-w-[100px]">{dept._id}</td>
                    <td className="p-3 text-gray-600">{dept.title}</td>
                    <td className="p-3">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={urlFor(dept.imgUrl).url()}
                        alt={dept.title}
                      />
                    </td>
                    <td className="p-3 text-gray-600 truncate max-w-xs">
                      {dept.description}
                    </td>
                    <td className="p-3 flex gap-2">
                      <Link
                        to={`/admin/department/${dept._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilLine className="h-5 w-5" />
                      </Link>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-blue-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
