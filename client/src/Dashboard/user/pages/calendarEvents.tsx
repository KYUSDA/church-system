import React, { useCallback, useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  Music,
  Sparkles,
  Tag,
  CalendarRange,
} from "lucide-react";
import { client } from "@/utils/client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// ─── Types ────────────────────────────────────────────────────────────────────

export type EventType = "once" | "weekly";

export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface CalendarEvent {
  _id: string;
  title: string;
  eventType: EventType;
  startDate: string; // ISO datetime from Sanity
  endDate: string; // ISO datetime from Sanity
  days?: DayOfWeek[]; // weekly only
  theme?: string;
  verses?: string[];
  hymn?: string;
  isHighWeek?: boolean;
  isActive?: boolean;
}

// ─── GROQ ─────────────────────────────────────────────────────────────────────

const EVENTS_QUERY = `*[_type == "calendar" && isActive == true] | order(startDate asc) {
  _id,
  title,
  eventType,
  startDate,
  endDate,
  days,
  theme,
  verses,
  hymn,
  isHighWeek,
  isActive
}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAY_INDEX: Record<DayOfWeek, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/** "once" event covers a date range — check if date falls within */
const onceMatchesDate = (event: CalendarEvent, date: Date): boolean => {
  const d = dayjs(date).startOf("day");
  const start = dayjs(event.startDate).startOf("day");
  const end = dayjs(event.endDate).startOf("day");
  return d.isSameOrAfter(start) && d.isSameOrBefore(end);
};

/** "weekly" event — check day-of-week AND still within active date range */
const weeklyMatchesDate = (event: CalendarEvent, date: Date): boolean => {
  if (!event.days?.length) return false;
  const d = dayjs(date).startOf("day");
  const start = dayjs(event.startDate).startOf("day");
  const end = dayjs(event.endDate).startOf("day");
  if (d.isBefore(start) || d.isAfter(end)) return false;
  return event.days.some((day) => DAY_INDEX[day] === date.getDay());
};

const getEventsForDate = (
  events: CalendarEvent[],
  date: Date,
): CalendarEvent[] =>
  events.filter((e) =>
    e.eventType === "once"
      ? onceMatchesDate(e, date)
      : weeklyMatchesDate(e, date),
  );

/** Highlight every day in the visible month that has at least one event */
const buildEventDates = (events: CalendarEvent[], viewMonth: Date): Date[] => {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates: Date[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const candidate = new Date(year, month, d);
    if (getEventsForDate(events, candidate).length > 0) dates.push(candidate);
  }
  return dates;
};

/** Smart date-range label */
const formatRange = (start: string, end: string): string => {
  const s = dayjs(start);
  const e = dayjs(end);
  if (s.isSame(e, "day")) {
    return `${s.format("MMM D, YYYY")} · ${s.format("h:mm A")} – ${e.format("h:mm A")}`;
  }
  return `${s.format("MMM D")} – ${e.format("MMM D, YYYY")}`;
};

// ─── EventCard ────────────────────────────────────────────────────────────────

const EventCard = ({ event }: { event: CalendarEvent }) => (
  <div className="space-y-3 p-4 border rounded-lg bg-card">
    <div className="flex items-start justify-between gap-2">
      <h4 className="font-semibold text-sm leading-tight">{event.title}</h4>
      {event.isHighWeek && (
        <Badge variant="secondary" className="gap-1 text-xs shrink-0">
          <Sparkles className="h-3 w-3" />
          High Week
        </Badge>
      )}
    </div>

    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="gap-1 text-xs capitalize">
        <Tag className="h-3 w-3" />
        {event.eventType === "weekly"
          ? `Weekly · ${event.days
              ?.map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
              .join(", ")}`
          : "One-time"}
      </Badge>
      <Badge variant="outline" className="gap-1 text-xs">
        <CalendarRange className="h-3 w-3" />
        {formatRange(event.startDate, event.endDate)}
      </Badge>
    </div>

    {event.theme && (
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Theme
        </p>
        <p className="text-sm">{event.theme}</p>
      </div>
    )}

    {event.hymn && (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Music className="h-3.5 w-3.5 shrink-0" />
        <span>{event.hymn}</span>
      </div>
    )}

    {event.verses && event.verses.length > 0 && (
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs font-medium">
          <BookOpen className="h-3 w-3" />
          <span>Scripture</span>
        </div>
        <div className="pl-4 space-y-0.5">
          {event.verses.map((verse, idx) => (
            <p key={idx} className="text-sm text-muted-foreground">
              {verse}
            </p>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data: CalendarEvent[] = await client.fetch(EVENTS_QUERY);
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch calendar events:", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const eventDates = buildEventDates(events, viewMonth);
  const selectedDateEvents = getEventsForDate(events, selectedDate);

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Church Calendar</CardTitle>
            </div>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3" />
              {events.length} Event{events.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Loading calendar events…
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <div className="space-y-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  onMonthChange={(month) => setViewMonth(month)}
                  modifiers={{ hasEvents: eventDates }}
                  modifiersClassNames={{
                    hasEvents: "event-day",
                  }}
                  className="rounded-md border w-full"
                />
                <p className="text-xs text-center text-muted-foreground">
                  Highlighted dates have scheduled events
                </p>
              </div>

              {/* Events panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {dayjs(selectedDate).format("MMMM D, YYYY")}
                  </h3>
                  {selectedDateEvents.length > 0 && (
                    <Badge variant="secondary">
                      {selectedDateEvents.length} event
                      {selectedDateEvents.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map((event, idx) => (
                      <div key={event._id}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start p-3 h-auto text-left"
                            >
                              <div className="space-y-0.5 w-full">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-sm">
                                    {event.title}
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    {event.isHighWeek && (
                                      <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                                    )}
                                    <Badge
                                      variant="outline"
                                      className="text-xs capitalize py-0"
                                    >
                                      {event.eventType}
                                    </Badge>
                                  </div>
                                </div>
                                {event.theme && (
                                  <p className="text-xs text-muted-foreground truncate">
                                    {event.theme}
                                  </p>
                                )}
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatRange(event.startDate, event.endDate)}
                                </p>
                              </div>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80" align="start">
                            <EventCard event={event} />
                          </PopoverContent>
                        </Popover>
                        {idx < selectedDateEvents.length - 1 && <Separator />}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <CalendarIcon className="h-10 w-10 mx-auto mb-3 opacity-25" />
                      <p className="text-sm font-medium">No events scheduled</p>
                      <p className="text-xs mt-1">
                        Select a highlighted date to view events
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;
