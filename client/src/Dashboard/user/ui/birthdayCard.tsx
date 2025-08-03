import { useGetBirthdaysQuery } from "../../../services/authService";
import dayjs from "dayjs";

interface Upcoming {
  firstName: string;
  lastName: string;
  nextBirthday: string; // ISO string from API
}

const BirthdayCard: React.FC = () => {
  const { data, isLoading, isError } = useGetBirthdaysQuery();

  if (isLoading)
    return <div className="bg-white rounded-xl p-6 shadow-sm">Loading…</div>;

  if (isError || !data?.users)
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <p className="text-red-600">Couldn’t load birthdays 🙃</p>
      </div>
    );

  const birthdays: Upcoming[] = Array.isArray(data.users)
    ? data.users
    : data.users
    ? [data.users]
    : [];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Upcoming Birthdays</h3>
        <span className="text-blue-600 text-sm">🎉 Celebrate</span>
      </div>

      {birthdays.length ? (
        <div className="space-y-4">
          {birthdays.map((u, i) => (
            <div
              key={i}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium">
                  {u.firstName} {u.lastName}
                </h4>
                <p className="text-sm text-gray-600">
                  {dayjs(u.nextBirthday).format("ddd, MMM D")}
                </p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Birthday
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No upcoming birthdays this week 🎉</p>
      )}
    </div>
  );
};

export default BirthdayCard;
