import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";
import { useGetMembersQuery } from "../../services/userServices";
import dayjs from "dayjs";
import { TUser } from "../../services/userServices";

// Function to process user registration data
const processUserData = (membersData: { createdAt: string }[] = []) => {
  const monthlyCounts: { [key: string]: number } = {};

  membersData.forEach((member) => {
    const month = dayjs(member.createdAt).format("MMM"); // Convert date string to 'Jan', 'Feb', etc.
    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
  });

  // Ensure all months are present in the dataset
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month) => ({ name: month, users: monthlyCounts[month] || 0 }));
};

const Analytics = () => {
  const { data: membersData } = useGetMembersQuery();
  const [chartData, setChartData] = useState<{ name: string; users: number }[]>([]);

  useEffect(() => {
    if (membersData?.users) {
      // Convert `createdAt` from Date to string
      const formattedUsers = membersData.users.map((user: TUser) => ({
        createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
      }));
      setChartData(processUserData(formattedUsers));
    }
  }, [membersData]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center gap-4 mb-4">
        <BarChart3 className="text-blue-600" size={28} />
        <h3 className="text-xl font-semibold text-gray-700">User Growth Analytics</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
