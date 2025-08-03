import { Calendar } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import { getBaseUrl } from "../../../services/authService";
import { CalendarEvent } from "../components/calendar";
import { toast } from "sonner";

const UpcomingEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const baseUrl = getBaseUrl();
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
    <div className="p-6 bg-gradient-to-r from-teal-400 to-teal-600 shadow-md rounded-lg text-white">
      <div className="flex items-center gap-4">
        <Calendar size={28} />
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
      </div>
      <ul className="mt-4">
        {events.map((event, idx) => (
          <li key={idx} className="p-2 my-2 bg-white text-black rounded">
            {event.title} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
