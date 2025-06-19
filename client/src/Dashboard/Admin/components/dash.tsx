import StatsOverview from "../ui/StatsOverview";
import Analytics from "../ui/Analytics";
import Leaderboard from "../ui/Leaderboard";
import UpcomingBirthdays from "../ui/UpcomingBirthdays";
import QuickActions from "../ui/QuickActions";
import UpcomingEvents from "../ui/UpcomingEvents";

const AdminDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      <StatsOverview />
      <Analytics />
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
