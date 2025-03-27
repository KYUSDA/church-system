import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { name: "Jan", users: 40 },
  { name: "Feb", users: 55 },
  { name: "Mar", users: 30 },
  { name: "Apr", users: 70 },
];

const Analytics = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center gap-4 mb-4">
        <BarChart3 className="text-blue-600" size={28} />
        <h3 className="text-xl font-semibold text-gray-700">User Growth Analytics</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#6b7280" />
          <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "none" }} />
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
