import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TUser, useGetMembersQuery } from "../../services/userServices";
import { PencilLine, Trash2, ChevronUp, ChevronDown } from "lucide-react";

export default function UserList() {
  const [data, setData] = useState<TUser[]>([]);
  const { data: membersData } = useGetMembersQuery();
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const usersPerPage = 5;

  useEffect(() => {
    if (membersData && Array.isArray(membersData.users)) {
      setData(membersData.users);
    }
  }, [membersData]);

  const handleSort = (field: keyof TUser) => {
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
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const filteredData = data.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredData.length / usersPerPage);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email"
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
                    checked={selectedUsers.length === data.length}
                    onChange={() =>
                      setSelectedUsers(selectedUsers.length === data.length ? [] : data.map((user) => user._id))
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex items-center"
                  onClick={() => handleSort("email")}
                >
                  Email {sortField === "email" && (sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Church Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" checked={selectedUsers.includes(user._id)} onChange={() => handleSelect(user._id)} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <Link to={`/admin/users/${user._id}`} className="text-blue-600 hover:text-blue-800 mr-2">
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
}
