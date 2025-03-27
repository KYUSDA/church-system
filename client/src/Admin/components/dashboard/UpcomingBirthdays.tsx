import { useEffect, useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { useGetMembersQuery } from "../../services/userServices";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface Member {
  firstName: string;
  lastName: string;
  birthday: string;
}

const getUpcomingBirthdays = (members: Member[]): Member[] => {
  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");

  return members.filter((user) =>
    dayjs(user.birthday).isBetween(startOfWeek, endOfWeek, null, "[]")
  );
};

const UpcomingBirthdays = () => {
  const { data: membersData } = useGetMembersQuery();
  const [birthdays, setBirthdays] = useState<{ name: string; date: string }[]>([]);

  useEffect(() => {
    if (membersData?.users) {
      const upcoming = getUpcomingBirthdays(
        membersData.users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday instanceof Date ? user.birthday.toISOString() : user.birthday, // Convert Date to string
        }))
      ).map((user) => ({
        name: `${user.firstName} ${user.lastName}`,
        date: dayjs(user.birthday).format("MMMM D"),
      }));
      setBirthdays(upcoming);
    }
  }, [membersData]);

  return (
    <div className="p-6 bg-gradient-to-r from-emerald-500 to-cyan-600 shadow-md rounded-lg text-white">
      <div className="flex items-center gap-4">
        <Calendar size={28} />
        <h3 className="text-lg font-semibold">Upcoming Birthdays</h3>
      </div>
      <ul className="mt-4 space-y-2">
        {birthdays.length > 0 ? (
          birthdays.map((person, index) => (
            <li key={index} className="p-2 bg-white text-black rounded flex justify-between items-center">
              <span>{person.name} - {person.date}</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2">
                <MessageCircle size={16} /> Reply
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-white">No upcoming birthdays this week 🎉</li>
        )}
      </ul>
    </div>
  );
};

export default UpcomingBirthdays;
