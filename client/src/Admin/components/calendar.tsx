
import React, { useState } from "react";
import { Calendar, momentLocalizer, Event, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "@headlessui/react";
import { calendarData } from "../../Dummy/events";

// Set Sunday as the first day of the week
moment.updateLocale("en", {
  week: { dow: 0 },
});

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
};

const EventCalendar: React.FC = () => {
  const [view, setView] = useState<keyof typeof Views>("MONTH");

  // Generate events
  const events: Event[] = calendarData.flatMap((event) => {
    const baseEvent = {
      title: event.title,
      start: new Date(event.date),
      end: new Date(event.date),
      allDay: true,
      resource: event,
    };

    let extraEvents: Event[] = [];

    if (event.isHighWeek) {
      extraEvents = [
        {
          ...baseEvent,
          title: `${event.title} - Sabbath`,
          start: moment(event.date).day(6).toDate(),
          end: moment(event.date).day(6).toDate(),
          resource: { ...event, color: "#e74c3c" },
        },
        {
          ...baseEvent,
          title: `${event.title} - Wednesday Vespers`,
          start: moment(event.date).day(3).toDate(),
          end: moment(event.date).day(3).toDate(),
          resource: { ...event, color: "#3498db" },
        },
        {
          ...baseEvent,
          title: `${event.title} - Friday Vespers`,
          start: moment(event.date).day(5).toDate(),
          end: moment(event.date).day(5).toDate(),
          resource: { ...event, color: "#2ecc71" },
        },
        {
          ...baseEvent,
          title: `${event.title} - Sunday Special`,
          start: moment(event.date).day(0).toDate(),
          end: moment(event.date).day(0).toDate(),
          resource: { ...event, color: "#f39c12" },
        },
      ];
    }

    return [baseEvent, ...extraEvents];
  });

  // Add week title when in "week" view
  if (view === "WEEK") {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();
    events.push({
      title: "Revival for Mission Week",
      start: startOfWeek,
      end: endOfWeek,
      allDay: true,
      resource: { color: "#8e44ad" }, // Purple for distinction
    });
  }

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventPropGetter = (event: Event) => ({
    style: {
      backgroundColor: event.resource?.color || "#e74c3c",
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "none",
      padding: "5px",
    },
  });

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="p-2 bg-gray-100 min-h-screen overflow-hidden font-sans">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          views={["month", "week", "day"]}
          onView={(newView) => setView(newView.toUpperCase() as keyof typeof Views)}
          onSelectEvent={handleSelectEvent}
          style={{ height: "80vh" }}
          components={{ toolbar: CustomToolbar }}
          eventPropGetter={eventPropGetter}
        />
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
          <button
            onClick={() => setIsModalOpen(false)}
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
            {selectedEvent?.resource.isHighWeek &&
              ` - ${moment(selectedEvent?.end).format("MMMM D, YYYY")}`}
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

    /* Ensure only the number in the today cell is circled */
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
