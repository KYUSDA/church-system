import { useEffect, useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { useGetMembersQuery } from "../../Admin/services/userServices";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

interface Member {
  firstName: string;
  lastName: string;
  birthday: string | null; // Allow null if the field is missing
}

const getUpcomingBirthdays = (members: Member[]): Member[] => {
  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");

  return members.filter((user) => {
    if (!user.birthday) return false; // Skip users without a birthday field

    const birthday = dayjs(user.birthday);
    // Check if the birthday is within the current week, and if it is the same date or in the future
    return birthday.isSameOrAfter(startOfWeek) && birthday.isSameOrBefore(endOfWeek);
  });
};

const CommunitySection: React.FC = () => {
  const { data: membersData } = useGetMembersQuery();
  const [birthdays, setBirthdays] = useState<{ name: string; date: string }[]>([]);

  useEffect(() => {
    if (membersData?.users) {
      const upcoming = getUpcomingBirthdays(
        membersData.users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday instanceof Date ? user.birthday.toISOString() : user.birthday, // Ensure date is in string format
        }))
      ).map((user) => ({
        name: `${user.firstName} ${user.lastName}`,
        date: dayjs(user.birthday).format("MMMM D"),
      }));
      setBirthdays(upcoming);
    }
  }, [membersData]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <Calendar size={28} />
        <h3 className="text-lg font-semibold">Upcoming Birthdays</h3>
      </div>
      <ul className="mt-4 space-y-2">
        {birthdays.length > 0 ? (
          birthdays.map((person, index) => (
            <li key={index} className="p-2 bg-white text-black rounded flex justify-between items-center">
              <span>{person.name} - {person.date}</span>
              {/* <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2">
                <MessageCircle size={16} /> Reply
              </button> */}
            </li>
          ))
        ) : (
          <li className="text-center">No upcoming birthdays this week 🎉</li>
        )}
      </ul>
    </div>
  );
};

export default CommunitySection;
