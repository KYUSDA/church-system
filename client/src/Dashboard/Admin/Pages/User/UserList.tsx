import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { TUser, useGetMembersQuery } from "../../../../services/adminService";
import { PencilLine, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { getBaseUrl } from "../../../../services/authService";
import { toast } from "sonner";

const UserList: React.FC = () => {
  const { data: membersData } = useGetMembersQuery();
  const [data, setData] = useState<TUser[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof TUser>("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const usersPerPage = 5;
  const baseUrl = getBaseUrl();

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
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === data.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(data.map((user) => user._id));
    }
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

  // delete user
  const deleteuser = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/user/delete-user/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setData((prevData) => prevData.filter((user) => user._id !== id));
        setSelectedUsers((prev) => prev.filter((userId) => userId !== id));
        toast.success("User deleted successfully");
      } else if (response.status === 403) {
        toast.error("Access Denied [Delete User]");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mx-auto w-full">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          User Management
        </h2>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 no-scrollbar">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === data.length && data.length > 0
                      }
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer min-w-[180px]"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center">
                      Email
                      {sortField === "email" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer min-w-[120px]"
                    onClick={() => handleSort("firstName")}
                  >
                    <div className="flex items-center">
                      First Name
                      {sortField === "firstName" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer min-w-[120px]"
                    onClick={() => handleSort("firstName")}
                  >
                    <div className="flex items-center">
                      Last Name
                      {sortField === "lastName" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]"
                  >
                    Church Role
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]"
                  >
                    Registration No
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]"
                  >
                    Family Located
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleSelect(user._id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-[120px] truncate">
                      {user._id}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 min-w-[180px] max-w-[120px] truncate">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 min-w-[120px]">
                      {user.firstName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 min-w-[120px]">
                      {user.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 min-w-[120px]">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 min-w-[120px]">
                      {user.year}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 min-w-[120px]">
                      {user.registration}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 min-w-[120px]">
                      {user.familyLocated ? user.familyLocated : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap min-w-[100px]">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/users/${user._id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilLine className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => deleteuser(user._id)}
                          className="text-red-600 hover:text-red-900"
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
          <div className="text-center py-8 text-gray-500">No users found</div>
        )}

        <div className="flex justify-center mt-4">
          <nav className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserList;
