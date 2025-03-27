import { useEffect, useState } from "react";
import { Users, Building, Home } from "lucide-react";
import { useGetDepartmentsQuery, useGetFamiliesQuery, useGetMembersQuery } from "../../services/userServices";

const StatsOverview = () => {
  const { data: membersData } = useGetMembersQuery();
  const { data: familiesData } = useGetFamiliesQuery();
  const { data: departmentsData } = useGetDepartmentsQuery();

  const [stats, setStats] = useState([
    { name: "Users", icon: Users, color: "from-blue-400 to-blue-600", count: 0 },
    { name: "Departments", icon: Building, color: "from-green-400 to-green-600", count: 0 },
    { name: "Families", icon: Home, color: "from-purple-400 to-purple-600", count: 0 },
  ]);

  useEffect(() => {
    setStats([
      { name: "Users", icon: Users, color: "from-blue-400 to-blue-600", count: membersData?.users.length || 0 },
      { name: "Departments", icon: Building, color: "from-green-400 to-green-600", count: departmentsData?.length || 0 },
      { name: "Families", icon: Home, color: "from-purple-400 to-purple-600", count: familiesData?.length || 0 },
    ]);
  }, [membersData, familiesData, departmentsData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ name, icon: Icon, color, count }) => (
        <div key={name} className={`p-6 bg-gradient-to-r ${color} shadow-md rounded-lg text-white`}>
          <div className="flex items-center gap-4">
            <Icon size={28} />
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
