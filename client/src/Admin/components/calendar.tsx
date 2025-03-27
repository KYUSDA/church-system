import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate, onView, view }: any) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md rounded-t-lg font-semibold text-gray-700">
      <div className="flex items-center space-x-4">
        <button onClick={() => onNavigate("PREV")} className="text-gray-600 text-xl">
          ❮
        </button>
        <button onClick={() => onNavigate("NEXT")} className="text-gray-600 text-xl">
          ❯
        </button>
        <span className="text-lg">{label}</span>
        <button onClick={() => onNavigate("TODAY")} className="border border-teal-600 px-3 py-1 rounded text-teal-600 hover:bg-teal-600 hover:text-white">
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
};

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      title: "Team Meeting",
      start: new Date(2025, 2, 26, 10, 0),
      end: new Date(2025, 2, 26, 11, 30),
      allDay: false,
    },
    {
      title: "Project Deadline",
      start: new Date(2025, 2, 28, 23, 59),
      end: new Date(2025, 2, 28, 23, 59),
      allDay: true,
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = prompt("Enter event title:");
    if (title) {
      setEvents([...events, { title, start, end, allDay: false }]);
    }
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen overflow-hidden">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          views={["month", "week", "day"]}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          style={{ height: "80vh" }}
          components={{ toolbar: CustomToolbar }}
        />
      </div>

      {/* Event Details Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-lg w-96">
          <h2 className="text-xl font-semibold">{selectedEvent?.title}</h2>
          <p className="mt-2 text-gray-600 text-lg">
            <strong>Start:</strong> {selectedEvent?.start?.toLocaleString()}
          </p>
          <p className="text-gray-600 text-lg">
            <strong>End:</strong> {selectedEvent?.end?.toLocaleString()}
          </p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </Dialog>

      {/* Custom CSS */}
      <style>
        {`
          /* General Calendar Styling */
          .rbc-calendar {
            overflow: hidden !important;
            font-family: 'Inter', sans-serif !important;
          }

          /* Remove Gray Background from Inactive Days */
          .rbc-off-range-bg {
            background: none !important;
          }

          /* Make Cells More Spacious */
          .rbc-day-bg {
            padding: 12px;
            transition: background 0.2s ease-in-out;
          }

          /* Hover Effect on Calendar Cells */
          .rbc-day-bg:hover {
            background: rgba(0, 150, 136, 0.15);
          }

          /* Header (Mon, Tue, etc.) Styling */
          .rbc-header {
            padding: 10px !important;
            font-size: 14px;
            font-weight: 600;
            background: #f8f9fa;
            text-align: center;
          }

          /* Event Text Styling */
          .rbc-event {
            font-size: 14px;
            padding: 5px 8px;
            border-radius: 4px;
          }

          /* Highlight Today’s Date */
          .rbc-today {
            background: none !important;
            position: relative;
          }

          .rbc-today::before {
            content: "";
            position: absolute;
            width: 30px;
            height: 30px;
            background: #007bff;
            border-radius: 50%;
            top: 5px;
            left: 50%;
            transform: translateX(-50%);
            z-index: -1;
          }

          .rbc-today span {
            color: white !important;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default EventCalendar;
