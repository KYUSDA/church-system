import React, { useCallback, useEffect, useState } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Users, BookOpen, Music, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getBaseUrl } from "../../../services/authService";
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

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const baseUrl = getBaseUrl();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/calendar/events`, {
        credentials: "include",
      });
      const { events } = await res.json();
      setEvents(events || []);
    } catch (err) {
      console.error("Failed to load events:", err);
      toast.error("Could not load events");
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = dayjs(date).format("YYYY-MM-DD");
    return events.filter(event => dayjs(event.date).format("YYYY-MM-DD") === dateStr);
  };

  // Get all event dates for highlighting
  const eventDates = events.map(event => new Date(event.date));

  // Check if a date has events
  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0;
  };

  // Get the selected date's events
  const selectedDateEvents = getEventsForDate(selectedDate);

  const formatEventDate = (dateString: string) => {
    return dayjs(dateString).format("dddd, MMMM D, YYYY");
  };

  const EventCard = ({ event }: { event: CalendarEvent }) => (
    <div className="space-y-3 p-4 border rounded-lg bg-card">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h4 className="font-semibold text-sm leading-tight">{event.title}</h4>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatEventDate(event.date)}</span>
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

      {event.verses && event.verses.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs font-medium">
            <BookOpen className="h-3 w-3" />
            <span>Scripture</span>
          </div>
          <div className="pl-4 space-y-1">
            {event.verses.map((verse, idx) => (
              <p key={idx} className="text-sm text-muted-foreground">{verse}</p>
            ))}
          </div>
        </div>
      )}

      {(event.details.department.length > 0 || event.details.choristers.length > 0 || event.details.deacons.length > 0) && (
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs font-medium">
            <Users className="h-3 w-3" />
            <span>Participants</span>
          </div>
          <div className="pl-4 space-y-1">
            {event.details.department.length > 0 && (
              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-muted-foreground">Departments:</span>
                {event.details.department.map((dept, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{dept}</Badge>
                ))}
              </div>
            )}
            {event.details.choristers.length > 0 && (
              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-muted-foreground">Choristers:</span>
                {event.details.choristers.map((chorister, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{chorister}</Badge>
                ))}
              </div>
            )}
            {event.details.deacons.length > 0 && (
              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-muted-foreground">Deacons:</span>
                {event.details.deacons.map((deacon, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">{deacon}</Badge>
                ))}
              </div>
            )}
          </div>
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
              {events.length} Events
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
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
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    fontWeight: 'bold',
                    borderRadius: '50%',
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
                    {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''}
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
                                <span className="font-medium text-sm">{event.title}</span>
                                {event.isHighWeek && (
                                  <Sparkles className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{event.theme}</p>
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
                    <p className="text-xs mt-1">Select a highlighted date to view events</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventCalendar;
