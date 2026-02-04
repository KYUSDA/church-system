import React, { useCallback, useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Music,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
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
import { client } from "@/utils/client";

interface CalendarEvent {
  _id: string;
  title: string;
  eventType: "once" | "weekly";
  date?: string; // for once
  days?: string[]; // for weekly e.g. ["Sunday", "Wednesday"]
  time: string; // HH:mm
  theme?: string;
  hymn?: string;
  isHighWeek?: boolean;
  isActive: boolean;
}

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const query = `
                *[_type == "calendar" && isActive == true] | order(date asc) {
                  _id,
                  title,
                  eventType,
                  date,
                  days,
                  time,
                  theme,
                  hymn,
                  isHighWeek
                }
              `;

      const eventsData = await client.fetch(query);
      setEvents(Array.isArray(eventsData) ? eventsData : []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load calendar events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    if (!Array.isArray(events)) return [];
    const dateStr = dayjs(date).format("YYYY-MM-DD");
    const dayOfWeek = dayjs(date).format("dddd").toLowerCase();

    return events.filter((event) => {
      if (!event) return false;

      // For 'once' events, match the specific date
      if (event.eventType === "once" && event.date) {
        return dayjs(event.date).format("YYYY-MM-DD") === dateStr;
      }

      // For 'weekly' events, match the day of week
      if (event.eventType === "weekly" && event.days) {
        return event.days.some((day) => day.toLowerCase() === dayOfWeek);
      }

      return false;
    });
  };

  // Get all event dates for highlighting
  const eventDates = Array.isArray(events)
    ? events.reduce((dates: Date[], event) => {
        if (event.eventType === "once" && event.date) {
          dates.push(new Date(event.date));
        } else if (event.eventType === "weekly" && event.days) {
          // For weekly events, highlight the next 90 days that match
          const today = new Date();
          for (let i = 0; i < 90; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const dayOfWeek = dayjs(futureDate).format("dddd").toLowerCase();
            if (event.days.some((day) => day.toLowerCase() === dayOfWeek)) {
              dates.push(new Date(futureDate));
            }
          }
        }
        return dates;
      }, [])
    : [];

  // Check if a date has events
  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  // Get the selected date's events
  const selectedDateEvents = getEventsForDate(selectedDate);

  const formatEventDate = (event: CalendarEvent) => {
    if (event.eventType === "once" && event.date) {
      return dayjs(event.date).format("dddd, MMMM D, YYYY");
    } else if (event.eventType === "weekly" && event.days) {
      return `Every ${event.days.join(", ")} at ${event.time}`;
    }
    return "";
  };

  const EventCard = ({ event }: { event: CalendarEvent }) => (
    <div className="space-y-3 p-4 border rounded-lg bg-card">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h4 className="font-semibold text-sm leading-tight">{event.title}</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatEventDate(event)}</span>
          </div>
        </div>
        {event.isHighWeek && (
          <Badge variant="secondary" className="gap-1 text-xs">
            <Sparkles className="h-3 w-3" />
            High Week
          </Badge>
        )}
      </div>

      {event.theme && (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs font-medium">
            <MapPin className="h-3 w-3" />
            <span>Theme</span>
          </div>
          <p className="text-sm text-muted-foreground pl-4">{event.theme}</p>
        </div>
      )}

      {event.hymn && (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs font-medium">
            <Music className="h-3 w-3" />
            <span>Hymn</span>
          </div>
          <p className="text-sm text-muted-foreground pl-4">{event.hymn}</p>
        </div>
      )}
    </div>
  );

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
              {Array.isArray(events) ? events.length : 0} Events
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
              <p className="text-sm text-muted-foreground">
                Loading calendar events...
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <div className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  modifiers={{
                    hasEvents: eventDates,
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      backgroundColor: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      fontWeight: "bold",
                      borderRadius: "50%",
                    },
                  }}
                  className="rounded-md border w-full"
                />

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Highlighted dates have events
                  </p>
                </div>
              </div>

              {/* Events for selected date */}
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

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map((event, idx) => (
                      <div key={event._id || idx}>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start p-3 h-auto text-left"
                            >
                              <div className="space-y-1 w-full">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-sm">
                                    {event.title}
                                  </span>
                                  {event.isHighWeek && (
                                    <Sparkles className="h-4 w-4 text-yellow-500" />
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {event.theme}
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
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
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
