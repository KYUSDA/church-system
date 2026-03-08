import { useGetBirthdaysQuery } from "../../../services/authService";
import dayjs from "dayjs";
import { Cake, Gift, PartyPopper, Calendar, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Upcoming {
  firstName: string;
  lastName: string;
  nextBirthday: string; // ISO string from API
}

const BirthdayCard: React.FC = () => {
  const { data, isLoading, isError } = useGetBirthdaysQuery();

  const birthdays: Upcoming[] = Array.isArray(data?.users)
    ? data.users
    : data?.users
    ? [data.users]
    : [];

  // Group birthdays by date proximity
  const getDateCategory = (birthdayDate: string) => {
    const birthday = dayjs(birthdayDate);
    const today = dayjs();
    const diffDays = birthday.diff(today, "day");

    if (diffDays === 0)
      return { category: "today", label: "Today", priority: 1 };
    if (diffDays === 1)
      return { category: "tomorrow", label: "Tomorrow", priority: 2 };
    if (diffDays <= 7)
      return { category: "thisWeek", label: "This Week", priority: 3 };
    return { category: "upcoming", label: "Upcoming", priority: 4 };
  };

  const sortedBirthdays = birthdays
    .map((birthday) => ({
      ...birthday,
      ...getDateCategory(birthday.nextBirthday),
    }))
    .sort((a, b) => a.priority - b.priority);

  const todayBirthdays = sortedBirthdays.filter((b) => b.category === "today");
  const upcomingBirthdays = sortedBirthdays.filter(
    (b) => b.category !== "today"
  );

  if (isLoading) {
    return (
      <Card className="h-fit">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-muted animate-pulse rounded" />
            <div className="w-32 h-5 bg-muted animate-pulse rounded" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted animate-pulse rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="w-24 h-4 bg-muted animate-pulse rounded" />
                <div className="w-16 h-3 bg-muted animate-pulse rounded" />
              </div>
              <div className="w-16 h-6 bg-muted animate-pulse rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError || !data?.users) {
    return (
      <Card className="h-fit">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Cake className="h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">
            Couldn't load birthdays
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Please try again later
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-fit overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Cake className="h-5 w-5 text-pink-600" />
              <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <CardTitle className="text-lg">Birthdays</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="gap-1">
                  <PartyPopper className="h-3 w-3" />
                  {birthdays.length}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{birthdays.length} upcoming birthdays</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        {birthdays.length > 0 ? (
          <>
            {/* Today's Birthdays - Special Highlight */}
            {todayBirthdays.length > 0 && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-pink-100 dark:from-yellow-900/20 dark:to-pink-900/20 rounded-lg animate-pulse" />
                <div className="relative bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg border-2 border-yellow-200 dark:border-yellow-800 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                      🎉 Today's Birthday{todayBirthdays.length > 1 ? "s" : ""}!
                    </span>
                  </div>
                  <div className="space-y-3">
                    {todayBirthdays.map((birthday, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-yellow-300">
                          <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-pink-400 text-white font-bold">
                            {birthday.firstName[0]}
                            {birthday.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">
                            {birthday.firstName} {birthday.lastName}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Cake className="h-3 w-3" />
                            <span>Celebrating today!</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-xs"
                        >
                          <Gift className="h-3 w-3" />
                          Wish
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Birthdays */}
            {upcomingBirthdays.length > 0 && (
              <>
                {todayBirthdays.length > 0 && <Separator />}

                <div className="space-y-3">
                  {upcomingBirthdays.slice(0, 4).map((birthday, i) => {
                    const daysUntil = dayjs(birthday.nextBirthday).diff(
                      dayjs(),
                      "day"
                    );
                    const isThisWeek = daysUntil <= 7;

                    return (
                      <div
                        key={i}
                        className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback
                            className={`text-sm font-medium ${
                              isThisWeek
                                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                                : "bg-muted-foreground/10"
                            }`}
                          >
                            {birthday.firstName[0]}
                            {birthday.lastName[0]}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {birthday.firstName} {birthday.lastName}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {dayjs(birthday.nextBirthday).format("MMM D")}
                            </span>
                            <span className="text-muted-foreground/60">•</span>
                            <span>
                              {daysUntil === 1
                                ? "Tomorrow"
                                : `${daysUntil} days`}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isThisWeek && (
                            <Badge variant="secondary" className="text-xs px-2">
                              Soon
                            </Badge>
                          )}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Gift className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Set reminder</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    );
                  })}

                  {upcomingBirthdays.length > 4 && (
                    <div className="text-center pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground"
                      >
                        View {upcomingBirthdays.length - 4} more birthdays
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="relative inline-block mb-3">
              <Cake className="h-12 w-12 text-muted-foreground/30" />
              <Sparkles className="h-4 w-4 text-muted-foreground/30 absolute -top-1 -right-1" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              No upcoming birthdays
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Check back later this week
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BirthdayCard;
