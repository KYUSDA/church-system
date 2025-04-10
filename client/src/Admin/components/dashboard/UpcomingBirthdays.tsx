import { useEffect, useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { BASE_URL, useGetMembersQuery } from "../../services/userServices";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Modal from "./modal";
import { toast } from "sonner";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

interface Member {
  firstName: string;
  lastName: string;
  birthday: string | null;
  email: string;
}

interface GroupedBirthdays {
  date: string;
  members: { name: string; email: string }[];
}

const getUpcomingBirthdaysGrouped = (members: Member[]): GroupedBirthdays[] => {
  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = today.endOf("week");

  const grouped: { [date: string]: GroupedBirthdays } = {};

  members.forEach((user) => {
    if (!user.birthday) return;

    const birthday = dayjs(user.birthday);
    const birthdayThisYear = birthday.year(today.year());

    if (
      birthdayThisYear.isSameOrAfter(startOfWeek, "day") &&
      birthdayThisYear.isSameOrBefore(endOfWeek, "day")
    ) {
      const dateKey = birthdayThisYear.format("MMMM D");
      if (!grouped[dateKey]) {
        grouped[dateKey] = { date: dateKey, members: [] };
      }
      grouped[dateKey].members.push({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      });
    }
  });

  return Object.values(grouped);
};

const UpcomingBirthdays: React.FC = () => {
  const { data: membersData } = useGetMembersQuery();
  const [groupedBirthdays, setGroupedBirthdays] = useState<GroupedBirthdays[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (membersData?.users) {
      const upcoming = getUpcomingBirthdaysGrouped(
        membersData.users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday instanceof Date
            ? user.birthday.toISOString()
            : user.birthday,
          email: user.email,
        }))
      );
      setGroupedBirthdays(upcoming);
    }
  }, [membersData]);

  const handleSendWish = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(`${BASE_URL}/user/celebrate-birthday`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: selectedUser.email }),
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message || "Wish sent successfully!");
    } catch (error) {
      toast.error("Error sending wish!");
    } finally {
      setSelectedUser(null);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-emerald-500 to-cyan-600 shadow-md rounded-lg text-white">
      <div className="flex items-center gap-4">
        <Calendar size={28} />
        <h3 className="text-lg font-semibold">Upcoming Birthdays</h3>
      </div>
      <ul className="mt-4 space-y-4">
        {groupedBirthdays.length > 0 ? (
          groupedBirthdays.map((group, index) => (
            <li key={index}>
              <div className="text-white font-semibold mb-1">{group.date}</div>
              <ul className="space-y-2">
                {group.members.map((member, idx) => (
                  <li
                    key={idx}
                    className="p-2 bg-white text-black rounded flex justify-between items-center"
                  >
                    <span>{member.name}</span>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2"
                        onClick={() => setSelectedUser(member)}
                      >
                        <MessageCircle size={16} /> Reply
                      </button>
                    
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <li className="text-center text-white">No upcoming birthdays this week 🎉</li>
        )}
      </ul>

      {selectedUser && (
        <Modal
          title="Send Birthday Wishes"
          onClose={() => setSelectedUser(null)}
          onConfirm={handleSendWish}
        >
          <p>
            Do you want to send birthday wishes to <strong>{selectedUser.name}</strong> via {" "}
            <em>{selectedUser.email}</em>?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default UpcomingBirthdays;
