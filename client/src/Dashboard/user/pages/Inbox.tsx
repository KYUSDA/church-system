import { useState, useMemo } from "react";
import {
  Inbox,
  Search,
  Bell,
  BellOff,
  CheckCheck,
  Trash2,
  Circle,
  Filter,
  MailOpen,
  Mail,
  Clock,
  ChevronDown,
} from "lucide-react";
import { useGetAllNotificationsQuery } from "@/services/authService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Notification {
  id: string;
  title: string;
  decription: string; // keeping original typo from schema
  isRead: boolean;
  createdAt: string;
}

type FilterType = "all" | "unread" | "read";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const NotificationSkeleton = () => (
  <div className="flex gap-4 p-4 animate-pulse">
    <div className="mt-1 w-2.5 h-2.5 rounded-full bg-muted shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-muted rounded w-1/3" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-2/3" />
      <div className="h-3 bg-muted rounded w-16 mt-1" />
    </div>
  </div>
);

// ─── Single notification row ──────────────────────────────────────────────────

const NotificationRow = ({
  notification,
  isSelected,
  onClick,
}: {
  notification: Notification;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const timeAgo = dayjs(notification.createdAt).fromNow();

  return (
    <div
      onClick={onClick}
      className={`group relative flex gap-3 px-4 py-3.5 cursor-pointer transition-all duration-150 border-l-2 ${
        isSelected
          ? "bg-primary/5 border-l-primary"
          : notification.isRead
            ? "border-l-transparent hover:bg-muted/40"
            : "border-l-primary/60 bg-primary/[0.02] hover:bg-primary/5"
      }`}
    >
      {/* Unread dot */}
      <div className="mt-1.5 shrink-0">
        {notification.isRead ? (
          <MailOpen className="h-4 w-4 text-muted-foreground/50" />
        ) : (
          <Mail className="h-4 w-4 text-primary" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-sm leading-snug line-clamp-1 ${
              notification.isRead
                ? "font-normal text-muted-foreground"
                : "font-semibold text-foreground"
            }`}
          >
            {notification.title}
          </p>
          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
            {timeAgo}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
          {notification.decription}
        </p>
      </div>
    </div>
  );
};

// ─── Detail panel ─────────────────────────────────────────────────────────────

const NotificationDetail = ({
  notification,
  onClose,
}: {
  notification: Notification | null;
  onClose?: () => void;
}) => {
  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3 p-8">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Inbox className="h-7 w-7 opacity-40" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Select a message</p>
          <p className="text-xs mt-1 opacity-70">
            Choose a notification to read its full content
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Detail header */}
      <div className="px-6 py-5 border-b space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base font-semibold leading-tight">
            {notification.title}
          </h2>
          {!notification.isRead && (
            <Badge variant="secondary" className="text-xs shrink-0">
              New
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {dayjs(notification.createdAt).format(
              "dddd, MMMM D, YYYY · h:mm A",
            )}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
              notification.isRead
                ? "bg-muted text-muted-foreground"
                : "bg-primary/10 text-primary"
            }`}
          >
            <Circle
              className={`h-1.5 w-1.5 fill-current ${
                notification.isRead ? "opacity-50" : ""
              }`}
            />
            {notification.isRead ? "Read" : "Unread"}
          </span>
        </div>
      </div>

      {/* Detail body */}
      <ScrollArea className="flex-1 px-6 py-5">
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
          {notification.decription}
        </p>
      </ScrollArea>

      {/* Detail actions */}
      <div className="px-6 py-4 border-t flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <CheckCheck className="h-3.5 w-3.5" />
          Mark as {notification.isRead ? "unread" : "read"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const InboxPage = () => {
  const { data: notificationsData, isLoading } = useGetAllNotificationsQuery();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Normalise — API might return { notifications: [...] } or just [...]
  const allNotifications: Notification[] = useMemo(() => {
    if (!notificationsData) return [];
    if (Array.isArray(notificationsData)) return notificationsData;
    if (Array.isArray((notificationsData as any).notifications))
      return (notificationsData as any).notifications;
    return [];
  }, [notificationsData]);

  const filtered = useMemo(() => {
    return allNotifications
      .filter((n) => {
        if (filter === "unread") return !n.isRead;
        if (filter === "read") return n.isRead;
        return true;
      })
      .filter((n) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          n.title.toLowerCase().includes(q) ||
          n.decription.toLowerCase().includes(q)
        );
      })
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
      );
  }, [allNotifications, filter, search]);

  const unreadCount = allNotifications.filter((n) => !n.isRead).length;
  const selected = filtered.find((n) => n.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSheetOpen(true); // mobile sheet
  };

  const filterLabel: Record<FilterType, string> = {
    all: "All",
    unread: "Unread",
    read: "Read",
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Inbox className="h-6 w-6 text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold">Inbox</h1>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0
                ? `${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`
                : "All caught up!"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        </div>
      </div>

      {/* Main card */}
      <Card className="overflow-hidden">
        {/* Toolbar */}
        <CardHeader className="p-0 border-b">
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search messages…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-sm bg-muted/40 border-0 focus-visible:ring-1"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 h-8 text-xs"
                >
                  <Filter className="h-3.5 w-3.5" />
                  {filterLabel[filter]}
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                {(["all", "unread", "read"] as FilterType[]).map((f) => (
                  <DropdownMenuItem
                    key={f}
                    onClick={() => setFilter(f)}
                    className={filter === f ? "bg-muted" : ""}
                  >
                    {filterLabel[f]}
                    {f === "unread" && unreadCount > 0 && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filter pills */}
          <div className="flex gap-1 px-4 pb-3">
            {(["all", "unread", "read"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {filterLabel[f]}
                {f === "unread" && unreadCount > 0 && ` (${unreadCount})`}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Two-pane layout on desktop */}
          <div className="grid lg:grid-cols-[380px_1fr] divide-x min-h-[520px]">
            {/* Left: list */}
            <ScrollArea className="h-[520px]">
              {isLoading ? (
                <div className="divide-y">
                  {[...Array(5)].map((_, i) => (
                    <NotificationSkeleton key={i} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-3">
                  {search ? (
                    <>
                      <Search className="h-10 w-10 opacity-20" />
                      <p className="text-sm">No results for "{search}"</p>
                    </>
                  ) : filter === "unread" ? (
                    <>
                      <BellOff className="h-10 w-10 opacity-20" />
                      <p className="text-sm font-medium">No unread messages</p>
                      <p className="text-xs opacity-70">
                        You're all caught up!
                      </p>
                    </>
                  ) : (
                    <>
                      <Bell className="h-10 w-10 opacity-20" />
                      <p className="text-sm font-medium">No messages yet</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="divide-y">
                  {filtered.map((notification) => (
                    <NotificationRow
                      key={notification.id}
                      notification={notification}
                      isSelected={selectedId === notification.id}
                      onClick={() => handleSelect(notification.id)}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Right: detail — desktop only */}
            <div className="hidden lg:block h-[520px]">
              <NotificationDetail notification={selected} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile detail sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl">
          <SheetHeader className="sr-only">
            <SheetTitle>Notification Detail</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col">
            <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-3 mb-1 shrink-0" />
            <NotificationDetail
              notification={selected}
              onClose={() => setSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InboxPage;
