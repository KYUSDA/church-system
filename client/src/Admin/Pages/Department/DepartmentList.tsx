import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TDepartment, useGetDepartmentsQuery } from '../../services/userServices';
import { PencilLine, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { urlFor } from '../../../utils/client';

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
        order === "asc" ? (a[field] > b[field] ? 1 : -1) : (a[field] < b[field] ? 1 : -1)
      )
    );
  };

  const handleSelect = (id: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(id) ? prev.filter((deptId) => deptId !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    // deleteDepartment(id, dispatch);
  };

  const filteredData = data.filter(
    (dept) =>
      dept.title.toLowerCase().includes(search.toLowerCase()) ||
      dept.description.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastDept = currentPage * departmentsPerPage;
  const indexOfFirstDept = indexOfLastDept - departmentsPerPage;
  const currentDepartments = filteredData.slice(indexOfFirstDept, indexOfLastDept);
  const totalPages = Math.ceil(filteredData.length / departmentsPerPage);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Department Management</h2>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.length === data.length}
                    onChange={() =>
                      setSelectedDepartments(selectedDepartments.length === data.length ? [] : data.map((dept) => dept._id))
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex items-center"
                  onClick={() => handleSort("title")}
                >
                  Department {sortField === "title" && (sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentDepartments.map((dept) => (
                <tr key={dept._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" checked={selectedDepartments.includes(dept._id)} onChange={() => handleSelect(dept._id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-[100px] overflow-hidden">
                  <div className="text-gray-600 truncate">{dept._id}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="w-8 h-8 rounded-full object-cover mr-2"
                        src={urlFor(dept.imgUrl).url()}
                        alt={dept.title}
                      />
                      {dept.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-[200px] overflow-hidden">
                    <div className="text-gray-600 truncate">{dept.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={dept.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {dept.link}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <Link to={`/admin/department/${dept._id}`} className="text-blue-600 hover:text-blue-800">
                        <PencilLine className="h-5 w-5" />
                      </Link>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(dept._id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 border rounded-full ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;