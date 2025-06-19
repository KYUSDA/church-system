import { Calendar } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import { getBaseUrl } from "../../../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export interface CalendarEvent {
  _id?: string;
  title: string;
  date: string; // YYYY‑MM‑DD
  theme: string;
  verses: string[];
  hymn: string;
  isHighWeek: boolean;
  wednesdayVespers: string[];
  fridayVespers: string[];
  sabbathService: string[];
  details: {
    department: string[];
    choristers: string[];
    deacons: string[];
  };
  color: string; // hex or rgb
}

const CalenderSection = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const baseUrl = getBaseUrl();
  const navigate = useNavigate();
  /* ---------- Fetch events from backend ---------- */
  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/calendar/events`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("Fetched events:", data);
      setEvents(data.events as CalendarEvent[]);
    } catch (err) {
      console.error("Failed to load events:", err);
      toast.error("Could not load events");
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Weekly Events</h3>
        <button
          className="text-blue-600"
          onClick={() => navigate("/member/my-calendar")}
        >
          View Upcoming Events
        </button>
      </div>
      <ul className="mt-4">
        {events.map((event, idx) => (
          <li key={idx} className="p-2 my-2 bg-white text-black rounded">
            ✅ {event.title} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalenderSection;
