import {
  Calendar,
  Clock,
  ChevronRight,
  Eye,
  Music,
  BookOpen,
  Tag,
} from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import { client } from "@/utils/client";
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
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);

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
  startDate: string; // ISO datetime
  endDate: string; // ISO datetime
  days?: DayOfWeek[];
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

const DAY_NAMES: Record<DayOfWeek, string> = {
  sunday: "Sun",
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
};

/** Next occurrence of a weekly event on or after today */
const getNextOccurrence = (event: CalendarEvent): dayjs.Dayjs | null => {
  if (!event.days?.length) return null;
  const today = dayjs().startOf("day");
  const end = dayjs(event.endDate).startOf("day");
  if (today.isAfter(end)) return null;

  // Search up to 7 days ahead to find the next matching day
  for (let i = 0; i < 7; i++) {
    const candidate = today.add(i, "day");
    if (candidate.isAfter(end)) break;
    if (event.days.some((d) => DAY_INDEX[d] === candidate.day())) {
      return candidate;
    }
  }
  return null;
};

/** Effective "next date" for sorting and display */
const getEffectiveDate = (event: CalendarEvent): dayjs.Dayjs | null => {
  if (event.eventType === "once") {
    const start = dayjs(event.startDate).startOf("day");
    const end = dayjs(event.endDate).startOf("day");
    const today = dayjs().startOf("day");
    // Show if today is within the range or in the future
    if (today.isAfter(end)) return null;
    return today.isSameOrAfter(start) ? today : start;
  }
  return getNextOccurrence(event);
};

const formatDisplayDate = (d: dayjs.Dayjs): string => {
  const today = dayjs().startOf("day");
  const diff = d.diff(today, "day");
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff <= 6) return d.format("dddd");
  return d.format("MMM D");
};

const formatTimeRange = (start: string, end: string): string => {
  const s = dayjs(start);
  const e = dayjs(end);
  if (s.isSame(e, "day")) {
    return `${s.format("h:mm A")} – ${e.format("h:mm A")}`;
  }
  return `${s.format("MMM D")} – ${e.format("MMM D")}`;
};

// ─── Component ────────────────────────────────────────────────────────────────

const CalendarSection = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  // Resolve upcoming events: filter out past ones, attach effective date, sort, take 4
  const upcomingEvents = events
    .map((event) => ({ event, effectiveDate: getEffectiveDate(event) }))
    .filter(({ effectiveDate }) => effectiveDate !== null)
    .sort((a, b) => a.effectiveDate!.diff(b.effectiveDate!))
    .slice(0, 4);

  const totalUpcoming = events.filter(
    (e) => getEffectiveDate(e) !== null,
  ).length;

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
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        ) : upcomingEvents.length > 0 ? (
          <>
            {upcomingEvents.map(({ event, effectiveDate }, idx) => {
              const isToday = effectiveDate!.isSame(dayjs(), "day");
              const isWeekly = event.eventType === "weekly";

              return (
                <div key={event._id}>
                  <div
                    className={`group relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                      isToday
                        ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                        : "bg-card hover:bg-muted/50"
                    }`}
                    onClick={() => navigate("/member/my-calendar")}
                  >
                    {/* Priority bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
                        isToday
                          ? "bg-primary"
                          : isWeekly
                            ? "bg-blue-400"
                            : "bg-muted-foreground/30"
                      }`}
                    />

                    <div className="flex items-start justify-between ml-3">
                      <div className="flex-1 space-y-1.5">
                        {/* Title row */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-sm leading-tight line-clamp-1">
                            {event.title}
                          </h4>
                          {isToday && (
                            <Badge
                              variant="destructive"
                              className="text-xs px-1.5 py-0"
                            >
                              Today
                            </Badge>
                          )}
                          {event.isHighWeek && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-1.5 py-0"
                            >
                              High Week
                            </Badge>
                          )}
                          {isWeekly && (
                            <Badge
                              variant="outline"
                              className="text-xs px-1.5 py-0 gap-1"
                            >
                              <Tag className="h-2.5 w-2.5" />
                              Weekly
                            </Badge>
                          )}
                        </div>

                        {/* Date / time row */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="font-medium text-foreground">
                              {formatDisplayDate(effectiveDate!)}
                            </span>
                            <span>·</span>
                            <span>
                              {formatTimeRange(event.startDate, event.endDate)}
                            </span>
                          </div>
                        </div>

                        {/* Weekly days pills */}
                        {isWeekly && event.days && event.days.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {event.days.map((d) => (
                              <span
                                key={d}
                                className="text-xs bg-muted px-1.5 py-0.5 rounded font-medium"
                              >
                                {DAY_NAMES[d]}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Theme */}
                        {event.theme && (
                          <p className="text-xs text-muted-foreground truncate">
                            {event.theme}
                          </p>
                        )}

                        {/* Hymn */}
                        {event.hymn && (
                          <div className="text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded flex items-center gap-1">
                            <Music className="h-3 w-3 shrink-0" />
                            <span className="truncate">{event.hymn}</span>
                          </div>
                        )}

                        {/* Verses */}
                        {event.verses && event.verses.length > 0 && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <BookOpen className="h-3 w-3 shrink-0" />
                            <span className="truncate">{event.verses[0]}</span>
                            {event.verses.length > 1 && (
                              <span className="shrink-0">
                                +{event.verses.length - 1}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-2 mt-0.5" />
                    </div>
                  </div>

                  {idx < upcomingEvents.length - 1 && (
                    <Separator className="my-1" />
                  )}
                </div>
              );
            })}

            <div className="pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/member/my-calendar")}
                className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground"
              >
                {totalUpcoming > 4
                  ? `View ${totalUpcoming - 4} more event${totalUpcoming - 4 !== 1 ? "s" : ""}`
                  : "View full calendar"}
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

export default CalendarSection;
