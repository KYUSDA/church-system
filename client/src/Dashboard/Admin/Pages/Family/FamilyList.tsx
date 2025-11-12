import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetFamiliesQuery,
  TFamily,
} from "../../../../services/adminService";
import { urlFor } from "../../../../utils/client";
import { PencilLine, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { getBaseUrl } from "@/services/base_query";
import { toast } from "sonner";

const FamilyList: React.FC = () => {
  const { data: familyData, isLoading, error } = useGetFamiliesQuery();
  const [data, setData] = useState<TFamily[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const familiesPerPage = 5;
  const baseUrl = getBaseUrl();

  useEffect(() => {
    if (familyData && Array.isArray(familyData)) {
      setData(
        familyData.map((family) => ({
          _id: family._id,
          title: family.title,
          imgUrl: family.imgUrl ? urlFor(family.imgUrl).url() : "/kyu.jpg",
          description: family.description || "No description available",
          tags: family.tags || [],
          link: family.link || "#",
        }))
      );
    }
  }, [familyData]);

  const handleSort = (field: keyof TFamily) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setData((prevData) =>
      [...prevData].sort((a, b) =>
        order === "asc"
          ? (Array.isArray(a[field])
              ? a[field].join(", ")
              : a[field] ?? ""
            ).localeCompare(
              Array.isArray(b[field]) ? b[field].join(", ") : b[field] ?? ""
            )
          : (Array.isArray(b[field])
              ? b[field].join(", ")
              : b[field] ?? ""
            ).localeCompare(
              Array.isArray(a[field]) ? a[field].join(", ") : a[field] ?? ""
            )
      )
    );
  };

  const toggleSelectAll = () => {
    if (selectedFamilies.length === data.length) {
      setSelectedFamilies([]);
    } else {
      setSelectedFamilies(data.map((family) => family._id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedFamilies((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filteredData = data.filter(
    (family) =>
      family.title.toLowerCase().includes(search.toLowerCase()) ||
      family.description.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastFamily = currentPage * familiesPerPage;
  const indexOfFirstFamily = indexOfLastFamily - familiesPerPage;
  const currentFamilies = filteredData.slice(
    indexOfFirstFamily,
    indexOfLastFamily
  );
  const totalPages = Math.ceil(filteredData.length / familiesPerPage);

  const deleteFamily = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/family/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((family) => family._id !== id));
        toast.success("Family deleted successfully");
      } else if (response.status === 403) {
        toast.error("Access Denied [Delete Family]");
      } else {
        toast.error("Failed to delete family");
      }
    } catch (error) {
      console.error("Error deleting family:", error);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900">Family Management</h2>
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
                  <th className="p-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedFamilies.length === data.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left">ID</th>
                  <th
                    className="p-3 text-left flex items-center gap-1 cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    Family Name{" "}
                    {sortField === "title" &&
                      (sortOrder === "asc" ? (
                        <ChevronUp size={12} />
                      ) : (
                        <ChevronDown size={12} />
                      ))}
                  </th>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Tags</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentFamilies.map((family) => (
                  <tr
                    key={family._id}
                    className="border-t border-gray-100 hover:bg-gray-100"
                  >
                    <td className="p-3 text-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedFamilies.includes(family._id)}
                        onChange={() => toggleSelect(family._id)}
                      />
                    </td>
                    <td className="p-3 text-gray-600 truncate max-w-[100px]">
                      {family._id}
                    </td>
                    <td className="p-3 text-gray-600">{family.title}</td>
                    <td className="p-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={family.imgUrl}
                        alt={family.title}
                      />
                    </td>
                    <td className="p-3 text-gray-600 truncate max-w-xs">
                      {family.description}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {family.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-200 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 flex gap-2">
                      <Link
                        to={`/admin/family/${family._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilLine className="h-5 w-5" />
                      </Link>
                      <button 
                      onClick={() => deleteFamily(family._id)}
                      className="text-red-600 hover:text-red-800">
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

export default FamilyList;
