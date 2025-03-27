import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetFamiliesQuery } from "../../services/userServices";
import { TFamily } from "../../services/userServices";
import { urlFor } from "../../../utils/client";
import { PencilLine, Trash2, ChevronUp, ChevronDown } from "lucide-react";

const FamilyList: React.FC = () => {
  const { data: familyData, isLoading, error } = useGetFamiliesQuery();
  const [data, setData] = useState<TFamily[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const familiesPerPage = 5;

  useEffect(() => {
    if (familyData && Array.isArray(familyData)) {
      const formattedData = familyData.map((family) => ({
        _id: family._id,
        title: family.title,
        imgUrl: family.imgUrl ? urlFor(family.imgUrl).url() : "/kyu.jpg",
        description: family.description || "No description available",
        locationUrl: family.locationUrl ? urlFor(family.locationUrl).url() : null,
        tags: family.tags || [],
        link: family.link || "#",
      }));
      setData(formattedData);
    }
  }, [familyData]);

  const handleSort = (field: keyof TFamily) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setData((prevData) =>
      [...prevData].sort((a, b) =>
        order === "asc" ? ((a[field] ?? "") > (b[field] ?? "") ? 1 : -1) : ((a[field] ?? "") < (b[field] ?? "") ? 1 : -1)
      )
    );
  };

  const handleSelect = (id: string) => {
    setSelectedFamilies((prev) =>
      prev.includes(id) ? prev.filter((familyId) => familyId !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    console.log(`Delete family with ID: ${id}`);
    // Implement delete logic here
  };

  const filteredData = data.filter(
    (family) =>
      family.title.toLowerCase().includes(search.toLowerCase()) ||
      family.description.toLowerCase().includes(search.toLowerCase()) ||
      (family.tags && family.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
  );

  const indexOfLastFamily = currentPage * familiesPerPage;
  const indexOfFirstFamily = indexOfLastFamily - familiesPerPage;
  const currentFamilies = filteredData.slice(indexOfFirstFamily, indexOfLastFamily);
  const totalPages = Math.ceil(filteredData.length / familiesPerPage);

  if (isLoading) return <div className="text-center py-8">Loading families...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error fetching families!</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Family Management</h2>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name, description or tags"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-max divide-y divide-gray-200">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedFamilies.length === data.length && data.length > 0}
                    onChange={() =>
                      setSelectedFamilies(selectedFamilies.length === data.length ? [] : data.map((family) => family._id))
                    }
                    disabled={data.length === 0}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex items-center"
                  onClick={() => handleSort("title")}
                >
                  Family Name {sortField === "title" && (sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentFamilies.map((family) => (
                <tr key={family._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      checked={selectedFamilies.includes(family._id)} 
                      onChange={() => handleSelect(family._id)} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-[100px] overflow-hidden text-sm text-gray-500">
                    <div className="text-gray-600 truncate">{family._id}</div>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full object-cover mr-2"
                        src={family.imgUrl}
                        alt={family.title}
                      />
                      <span className="truncate">{family.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap max-w-[200px] overflow-hidden text-sm text-gray-500">
                    <div className="truncate">{family.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {family.tags?.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {family.locationUrl ? (
                      <img
                        className="w-12 h-12 rounded object-cover"
                        src={family.locationUrl}
                        alt="Location"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href={family.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      {family.link}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link to={`/admin/family/${family._id}`} className="text-blue-600 hover:text-blue-800">
                        <PencilLine className="h-5 w-5" />
                      </Link>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(family._id)}
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
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">No families found</div>
      )}
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

export default FamilyList;