import { Calendar, Clock, MapPin, ChevronRight, Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { client } from "@/utils/client";

dayjs.extend(relativeTime);

interface CalendarEvent {
  _id: string;
  title: string;
  eventType: "once" | "weekly";
  date?: string; // for once
  days?: string[]; // for weekly e.g. ["Sunday", "Wednesday"]
  time: string; // HH:mm
  theme?: string;
  verses?: string[];
  hymn?: string;
  isHighWeek?: boolean;
  isActive: boolean;
}

const getNextWeeklyDate = (days: string[], time: string) => {
  const today = dayjs();
  const [hour, minute] = time.split(":").map(Number);

  const dayNameToNumber: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  for (let i = 0; i < 7; i++) {
    const candidate = today.add(i, "day");
    const dayNumber = candidate.day();

    if (days.some((d) => dayNameToNumber[d] === dayNumber)) {
      const withTime = candidate.hour(hour).minute(minute).second(0);

      // Ensure future (or later today)
      if (withTime.isAfter(today)) {
        return withTime;
      }
    }
  }

  return null;
};


const CalenderSection = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const data = await client.fetch(`
          *[_type == "calendar" && isActive == true]{
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
        `);

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const resolvedEvents = useMemo(() => {
    return events
      .map((event) => {
        if (event.eventType === "once" && event.date) {
          const [hour, minute] = event.time.split(":").map(Number);

          return {
            ...event,
            resolvedDate: dayjs(event.date).hour(hour).minute(minute).second(0),
          };
        }

        if (event.eventType === "weekly" && event.days?.length) {
          return {
            ...event,
            resolvedDate: getNextWeeklyDate(event.days, event.time),
          };
        }

        return null;
      })
      .filter(Boolean) as (CalendarEvent & {
      resolvedDate: dayjs.Dayjs;
    })[];
  }, [events]);


  const upcomingEvents = resolvedEvents
    .filter(
      (e) =>
        e.resolvedDate && e.resolvedDate.isAfter(dayjs().subtract(1, "minute")),
    )
    .sort((a, b) => a.resolvedDate.diff(b.resolvedDate))
    .slice(0, 5);

  const formatEventDate = (date: dayjs.Dayjs) => {
    const diff = date.diff(dayjs(), "day");
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff <= 7) return date.format("dddd");
    return date.format("MMM DD");
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/member/my-calendar")}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View All
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View full calendar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
          ))
        ) : upcomingEvents.length ? (
          <>
            {upcomingEvents.map((event, idx) => {
              const isToday = event.resolvedDate.isSame(dayjs(), "day");

              return (
                <div key={event._id}>
                  <div
                    onClick={() => navigate("/member/my-calendar")}
                    className={`relative p-4 rounded-lg border cursor-pointer transition ${
                      isToday
                        ? "bg-primary/5 border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          {isToday && (
                            <Badge variant="destructive" className="text-xs">
                              Today
                            </Badge>
                          )}
                          {event.isHighWeek && (
                            <Badge variant="secondary" className="text-xs">
                              High Week
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatEventDate(event.resolvedDate)} · {event.time}
                          </div>

                          {event.theme && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.theme}
                            </div>
                          )}
                        </div>

                        {event.hymn && (
                          <div className="text-xs bg-muted/30 px-2 py-1 rounded">
                            <span className="font-medium">Hymn:</span>{" "}
                            {event.hymn}
                          </div>
                        )}
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  {idx < upcomingEvents.length - 1 && (
                    <Separator className="my-3" />
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No upcoming events</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalenderSection;
