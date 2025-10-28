import React, { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  momentLocalizer,
  Event,
  Views,
  DateLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react";
import { getBaseUrl } from "@/services/base_query";
import { toast } from "sonner";
import { useCreateEventMutation } from "../../../services/adminService";

/* ────────── Types ────────── */
export interface CalendarEvent {
  _id?: string;
  title: string;
  date: string; // YYYY-MM-DD
  theme: string;
  verses: string[];
  hymn: string;
  isHighWeek: boolean;
  wednesdayVespers: string[];
  fridayVespers: string[];
  sabbathService: string[];
  details: { department: string[]; choristers: string[]; deacons: string[] };
  color: string;
}

/* ────────── Setup ────────── */
moment.updateLocale("en", { week: { dow: 0 } }); // Sunday = first day
const localizer: DateLocalizer = momentLocalizer(moment);
const baseUrl = getBaseUrl();

/* ────────── Toolbar (unchanged) ────────── */
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

/* ────────── Main Component ────────── */
const EventCalendar: React.FC = () => {
  const [view, setView] = useState<keyof typeof Views>("MONTH");
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [createEvent] = useCreateEventMutation();

  /* ---------- Create‑modal state ---------- */
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState<CalendarEvent>({
    title: "",
    date: moment().format("YYYY-MM-DD"),
    theme: "",
    verses: [],
    hymn: "",
    isHighWeek: false,
    wednesdayVespers: [],
    fridayVespers: [],
    sabbathService: [],
    details: { department: [], choristers: [], deacons: [] },
    color: "#3498db",
  });

  /* ---------- Fetch events from backend ---------- */
  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/calendar/events`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("Fetched events:", data);
      const mapped: Event[] = data.events.map((e: CalendarEvent) => ({
        title: e.title,
        start: new Date(e.date),
        end: new Date(e.date),
        allDay: true,
        resource: e,
      }));
      setEvents(mapped);
    } catch (err) {
      console.error("Failed to load events:", err);
      toast.error("Could not load events");
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  /* ---------- Handle create ---------- */
  const handleCreateEvent = async () => {
    try {
      const result = await createEvent(formData).unwrap();
      if (result) {
        toast.success("Event created successfully");
        setIsCreateOpen(false);
        fetchEvents(); // refresh
      } else {
        toast.error("Failed to create event");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  /* ---------- Helpers ---------- */
  const openCreateForDate = (date: Date) => {
    setFormData((prev) => ({
      ...prev,
      date: moment(date).format("YYYY-MM-DD"),
    }));
    setIsCreateOpen(true);
  };

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    openCreateForDate(slotInfo.start);
  };

  const eventPropGetter = (event: Event) => ({
    style: {
      backgroundColor: event.resource?.color || "#e74c3c",
      borderRadius: 4,
      opacity: 0.85,
      color: "white",
      border: "none",
      padding: "2px 4px",
      fontSize: 12,
    },
  });

  const components = {
    toolbar: CustomToolbar,
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-2 bg-gray-100 min-h-screen overflow-hidden font-sans">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          views={["month", "week", "day"]}
          onView={(v) => setView(v.toUpperCase() as keyof typeof Views)}
          onSelectEvent={(e) => {
            setSelectedEvent(e);
            setIsDetailsOpen(true);
          }}
          style={{ height: "80vh" }}
          components={components}
          eventPropGetter={eventPropGetter}
        />
      </div>

      {/* ────────── Details modal ────────── */}
      <Dialog
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
          <button
            onClick={() => setIsDetailsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
          <h2 className="text-xl font-semibold">{selectedEvent?.title}</h2>
          {selectedEvent?.resource.theme && (
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

      {/* ────────── Create modal ────────── */}
      <Dialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
          <button
            onClick={() => setIsCreateOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
          <h2 className="text-xl font-semibold mb-4">Create Event</h2>

          {/* ----- Responsive 2‑column form ------ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            {/* Date */}
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />

            {/* Theme */}
            <input
              type="text"
              placeholder="Theme"
              className="w-full border p-2 rounded"
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
            />

            {/* Hymn */}
            <input
              type="text"
              placeholder="Hymn"
              className="w-full border p-2 rounded"
              value={formData.hymn}
              onChange={(e) =>
                setFormData({ ...formData, hymn: e.target.value })
              }
            />

            {/* Verses */}
            <textarea
              placeholder="Verses (comma-separated)"
              className="w-full border p-2 rounded md:col-span-2"
              value={formData.verses.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  verses: e.target.value.split(",").filter(Boolean),
                })
              }
            />

            {/* Wednesday Vespers */}
            <textarea
              placeholder="Wednesday Vespers (comma-separated)"
              className="w-full border p-2 rounded"
              value={formData.wednesdayVespers.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  wednesdayVespers: e.target.value.split(",").filter(Boolean),
                })
              }
            />

            {/* Friday Vespers */}
            <textarea
              placeholder="Friday Vespers (comma-separated)"
              className="w-full border p-2 rounded"
              value={formData.fridayVespers.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fridayVespers: e.target.value.split(",").filter(Boolean),
                })
              }
            />

            {/* Sabbath Service */}
            <textarea
              placeholder="Sabbath Service (comma-separated)"
              className="w-full border p-2 rounded md:col-span-2"
              value={formData.sabbathService.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sabbathService: e.target.value.split(",").filter(Boolean),
                })
              }
            />

            {/* Departments */}
            <textarea
              placeholder="Departments (comma-separated)"
              className="w-full border p-2 rounded"
              value={formData.details.department.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: {
                    ...formData.details,
                    department: e.target.value.split(",").filter(Boolean),
                  },
                })
              }
            />

            {/* Choristers */}
            <textarea
              placeholder="Choristers (comma-separated)"
              className="w-full border p-2 rounded"
              value={formData.details.choristers.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: {
                    ...formData.details,
                    choristers: e.target.value.split(",").filter(Boolean),
                  },
                })
              }
            />

            {/* Deacons */}
            <textarea
              placeholder="Deacons (comma-separated)"
              className="w-full border p-2 rounded md:col-span-2"
              value={formData.details.deacons.join(",")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  details: {
                    ...formData.details,
                    deacons: e.target.value.split(",").filter(Boolean),
                  },
                })
              }
            />

            {/* Color */}
            <div className="flex items-center space-x-3 md:col-span-2">
              <label className="flex-shrink-0">Pick Color:</label>
              <input
                type="color"
                className="border p-1 rounded"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
              />
            </div>

            {/* High Week Checkbox (span as full row on small) */}
            <label className="flex items-center space-x-2 md:col-span-2">
              <input
                type="checkbox"
                checked={formData.isHighWeek}
                onChange={(e) =>
                  setFormData({ ...formData, isHighWeek: e.target.checked })
                }
              />
              <span>Is High Week?</span>
            </label>
          </div>

          <button
            onClick={handleCreateEvent}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 mt-6"
          >
            Create Event
          </button>
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
