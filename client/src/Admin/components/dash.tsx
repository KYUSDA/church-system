import StatsOverview from "./dashboard/StatsOverview";
import Analytics from "./dashboard/Analytics";
import Leaderboard from "./dashboard/Leaderboard";
import UpcomingBirthdays from "./dashboard/UpcomingBirthdays";
import QuickActions from "./dashboard/QuickActions";
import UpcomingEvents from "./dashboard/UpcomingEvents";

const AdminDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      <StatsOverview />
      <Analytics  />
      <Leaderboard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingBirthdays />
        <UpcomingEvents />
      </div>
      <QuickActions />
    </div>
  );
};

export default AdminDashboard;
