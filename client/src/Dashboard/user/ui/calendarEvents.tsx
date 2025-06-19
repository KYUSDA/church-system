import React, { useCallback, useEffect, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Event,
  Views,
  View,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import { getBaseUrl } from "../../../services/authService";

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

moment.updateLocale("en", { week: { dow: 0 } }); // Sunday start
const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate, onView, view }: any) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md rounded-t-lg font-semibold text-gray-700">
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onNavigate("PREV")}
        className="text-gray-600 text-xl"
      >
        ❮
      </button>
      <button
        onClick={() => onNavigate("NEXT")}
        className="text-gray-600 text-xl"
      >
        ❯
      </button>
      <span className="text-lg">{label}</span>
      <button
        onClick={() => onNavigate("TODAY")}
        className="border border-teal-600 px-3 py-1 rounded text-teal-600 hover:bg-teal-600 hover:text-white"
      >
        TODAY
      </button>
    </div>
    <select
      value={view}
      onChange={(e) => onView(e.target.value)}
      className="border px-3 py-1 rounded bg-white shadow"
    >
      <option value="month">Month</option>
      <option value="week">Week</option>
      <option value="day">Day</option>
    </select>
  </div>
);

const EventCalendar: React.FC = () => {
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const [view, setView] = useState<View>("month");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseUrl = getBaseUrl();

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/calendar/events`, {
        credentials: "include",
      });
      const { events } = await res.json();

      const transformed: Event[] = events.flatMap((evt: CalendarEvent) => {
        const base: Event = {
          title: evt.title,
          start: new Date(evt.date),
          end: new Date(evt.date),
          allDay: true,
          resource: { ...evt, isHighlight: false },
        };

        if (!evt.isHighWeek) return base;

        const highlight: Event = {
          title: "",
          start: moment(evt.date).startOf("week").toDate(), // Sunday
          end: moment(evt.date).endOf("week").toDate(), // Saturday
          allDay: true,
          resource: {
            isHighlight: true,
            color: "#fff", // Light amber for highlight
          },
        };

        return [base, highlight];
      });

      setCalendarEvents(transformed);
    } catch (err) {
      console.error("Failed to load events:", err);
      toast.error("Could not load events");
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const eventPropGetter = (event: Event) => {
    if (event.resource?.isHighlight) {
      return {
        style: {
          backgroundColor: event.resource.color, 
          opacity: 0.25,
          border: "none",
          pointerEvents: "none" as React.CSSProperties["pointerEvents"],
        } as React.CSSProperties,
      };
    }

    return {
      style: {
        backgroundColor: event.resource?.color || "#16a34a",
        borderRadius: "4px",
        opacity: 0.85,
        color: "white",
        border: "none",
        padding: "4px 6px",
      } as React.CSSProperties,
    };
  };

  const handleSelectEvent = (event: Event) => {
    if (event.resource?.isHighlight) return;
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen overflow-hidden font-sans">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
          view={view}
          onView={(v) => setView(v as View)}
          onNavigate={() => {}}
          onSelectEvent={handleSelectEvent}
          components={{ toolbar: CustomToolbar }}
          eventPropGetter={eventPropGetter}
          style={{ height: "80vh" }}
          selectable
        />
      </div>

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>

          <h2 className="text-xl font-semibold">{selectedEvent?.title}</h2>
          {selectedEvent?.resource?.theme && (
            <p className="mt-2 text-gray-600">
              <strong>Theme:</strong> {selectedEvent.resource.theme}
            </p>
          )}
          <p className="mt-2 text-gray-600">
            <strong>Date:</strong>{" "}
            {moment(selectedEvent?.start).format("MMMM D, YYYY")}
          </p>
        </div>
      </Dialog>
      <style>
        {`
    .rbc-calendar {
      overflow: hidden !important;
      font-family: 'Inter', sans-serif !important;
    }
    
    .rbc-off-range-bg {
      background-color: #f9f9f9 !important;
    }

    .rbc-day-bg:hover {
      background-color: rgba(0, 150, 136, 0.15);
    }

    .rbc-header {
      padding: 10px !important;
      font-size: 14px;
      font-weight: bold;
      background-color: #f8f9fa;
      text-align: center;
    }

    .rbc-event {
      font-size: 14px;
      padding: 5px;
      border-radius: 4px;
    }

    .rbc-today {
      position: relative;
    }

    .rbc-today .rbc-date-cell {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .rbc-today .rbc-date-cell > a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 50%;
      background-color: #007bff !important;
      color: white !important;
      font-weight: bold;
      text-decoration: none;
    }
  `}
      </style>
    </div>
  );
};

export default EventCalendar;
