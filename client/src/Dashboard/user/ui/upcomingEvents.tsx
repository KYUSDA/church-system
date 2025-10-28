import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import { getBaseUrl } from "@/services/base_query";
import { toast } from "sonner";
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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

dayjs.extend(relativeTime);

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
  const [loading, setLoading] = useState(true);
  const baseUrl = getBaseUrl();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);
  const token = authState?.user?.data?.tokens?.accessToken;

  /* ---------- Fetch events from backend ---------- */
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/calendar/events`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched events:", data);
      const eventsData = data?.events || [];
      setEvents(Array.isArray(eventsData) ? eventsData : []);
    } catch (_err) {
      setEvents([]); // Ensure events is always an array
    } finally {
      setLoading(false);
    }
  }, [baseUrl, token]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Get upcoming events (next 5 events)
  const upcomingEvents = Array.isArray(events)
    ? events
        .filter(
          (event) =>
            (event && dayjs(event.date).isAfter(dayjs(), "day")) ||
            dayjs(event.date).isSame(dayjs(), "day")
        )
        .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
        .slice(0, 5)
    : [];

  const formatEventDate = (dateString: string) => {
    const eventDate = dayjs(dateString);
    const today = dayjs();
    const diffDays = eventDate.diff(today, "day");

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 7) return eventDate.format("dddd");
    return eventDate.format("MMM DD");
  };

  const getEventPriority = (event: CalendarEvent) => {
    const diffDays = dayjs(event.date).diff(dayjs(), "day");
    if (diffDays === 0) return "high";
    if (diffDays <= 3) return "medium";
    return "low";
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
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : upcomingEvents.length > 0 ? (
          <>
            {upcomingEvents.map((event, idx) => {
              const priority = getEventPriority(event);
              const isToday = dayjs(event.date).isSame(dayjs(), "day");

              return (
                <div key={event._id || idx}>
                  <div
                    className={`group relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                      isToday
                        ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                        : "bg-card hover:bg-muted/50"
                    }`}
                    onClick={() => navigate("/member/my-calendar")}
                  >
                    {/* Event Color Indicator */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                      style={{ backgroundColor: event.color || "#3b82f6" }}
                    />

                    <div className="flex items-start justify-between ml-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm leading-tight line-clamp-1">
                            {event.title}
                          </h4>
                          {isToday && (
                            <Badge
                              variant="destructive"
                              className="text-xs px-1.5 py-0.5"
                            >
                              Today
                            </Badge>
                          )}
                          {event.isHighWeek && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-1.5 py-0.5"
                            >
                              High Week
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatEventDate(event.date)}</span>
                          </div>

                          {event.theme && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span className="truncate max-w-[120px]">
                                {event.theme}
                              </span>
                            </div>
                          )}

                          {event.details.department.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span className="truncate max-w-[100px]">
                                {event.details.department.join(", ")}
                              </span>
                            </div>
                          )}
                        </div>

                        {event.hymn && (
                          <div className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                            <span className="font-medium">Hymn:</span>{" "}
                            {event.hymn}
                          </div>
                        )}
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </div>

                  {idx < upcomingEvents.length - 1 && (
                    <Separator className="my-3" />
                  )}
                </div>
              );
            })}

            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/member/my-calendar")}
                className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
              >
                View{" "}
                {Array.isArray(events) && events.length > 5
                  ? `${events.length - 5} more events`
                  : "full calendar"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No upcoming events</p>
            <p className="text-xs mt-1">Check back later for new events</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalenderSection;
