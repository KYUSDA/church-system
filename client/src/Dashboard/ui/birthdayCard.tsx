import { useEffect, useState } from "react";
import { useGetMembersQuery } from "../../Admin/services/userServices";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Member {
  firstName: string;
  lastName: string;
  birthday: string | null;
}

const getUpcomingBirthdays = (
  members: Member[]
): { name: string; date: string }[] => {
  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");

  return members.reduce<{ name: string; date: string }[]>((acc, user) => {
    if (!user.birthday) return acc;

    const birthday = dayjs(user.birthday);
    const birthdayThisYear = birthday.year(today.year());

    if (
      birthdayThisYear.isSameOrAfter(startOfWeek, "day") &&
      birthdayThisYear.isSameOrBefore(endOfWeek, "day")
    ) {
      acc.push({
        name: `${user.firstName} ${user.lastName}`,
        date: birthdayThisYear.format("ddd, MMM D"),
      });
    }

    return acc;
  }, []);
};

const BirthdayCard: React.FC = () => {
  const { data: membersData } = useGetMembersQuery();
  const [birthdays, setBirthdays] = useState<{ name: string; date: string }[]>(
    []
  );

  useEffect(() => {
    if (membersData?.users) {
      const upcoming = getUpcomingBirthdays(
        membersData.users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          birthday:
            user.birthday instanceof Date
              ? user.birthday.toISOString()
              : user.birthday,
        }))
      );
      setBirthdays(upcoming);
    }
  }, [membersData]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Upcoming Birthdays</h3>
        <span className="text-blue-600 text-sm">🎉 Celebrate</span>
      </div>
      <div className="space-y-4">
        {birthdays.length > 0 ? (
          birthdays.map((person, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium">{person.name}</h4>
                <p className="text-sm text-gray-600">{person.date}</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Birthday
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No upcoming birthdays this week 🎉</p>
        )}
      </div>
    </div>
  );
};

export default BirthdayCard;
