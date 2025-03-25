import React, { useState, useEffect, useMemo } from 'react';
import Chart from './Chart';
import FeaturedInfo from './FeaturedInfo';
import WidgetLg from './WidgetLg';
import WidgetSm from './WidgetSm';
import { userData } from '../DummyData/Dummy';
import { userRequest } from './requestMethods';

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState<{ name: string; "Active User": number }[]>([]);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item: { _id: number; total: number }) =>
          setUserStats((prev: { name: string; "Active User": number }[]) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="flex-4">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User" />
      <div className="flex m-5">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default AdminDashboard;
