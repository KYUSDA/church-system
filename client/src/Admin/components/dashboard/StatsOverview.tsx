import { Users, Building, Home } from "lucide-react";

const stats = [
  { name: "Users", icon: Users, color: "from-blue-400 to-blue-600" },
  { name: "Departments", icon: Building, color: "from-green-400 to-green-600" },
  { name: "Families", icon: Home, color: "from-purple-400 to-purple-600" },
];

const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ name, icon: Icon, color }) => (
        <div key={name} className={`p-6 bg-gradient-to-r ${color} shadow-md rounded-lg text-white`}>
          <div className="flex items-center gap-4">
            <Icon size={28} />
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
          <p className="text-2xl font-bold mt-2">--</p> {/* Replace with API data */}
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
