import {
  CalendarViewDayOutlined,
  ChatBubbleOutline,
  MailOutline,
  PeopleOutline,
  Storefront,
} from "@mui/icons-material";
import {
  BookOpen,
  Calendar,
  HelpCircle,
  Home,
  Icon,
  Mail,
  Search,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";

// routes for dashboard
export enum Role {
  ADMIN = "admin",
  MEMBER = "member",
  ELDER = "elder",
  SUPERADMIN = "superadmin",
}

export const checkRole = (role: Role) => {
  switch (role) {
    case Role.ADMIN:
    case Role.SUPERADMIN:
      return navGroups.filter((group) => ["Admin"].includes(group.label));
    case Role.ELDER:
    case Role.MEMBER:
      return navGroups.filter((group) => ["Member"].includes(group.label));
    default:
      return [];
  }
};

export const navGroups = [
  {
    label: "Member",
    links: [
      { title: "Dashboard", to: "/member/dashboard", icon: Home },
      { title: "Resources", to: "/member/resources", icon: BookOpen },
      { title: "Calendar", to: "/member/my-calendar", icon: Calendar },
      {
        title: "Defend Your Faith",
        to: "/member/defend-your-faith",
        icon: ShieldCheck,
      },
      { title: "Bible App", to: "/member/bible-app", icon: BookOpen },
      {
        title: "Prayer Requests",
        to: "/member/submit-prayer-request",
        icon: Send,
      },
      { title: "Profile", to: "/member/profile", icon: User },
    ],
  },
  {
    label: "Admin",
    links: [
      { title: "Dashboard", to: "/dashboard/admin", icon: Home },
      { title: "Users", to: "/admin/users", icon: User },
      { title: "Departments", to: "/admin/departments", icon: Storefront },
      { title: "Families", to: "/admin/families", icon: PeopleOutline },
      {
        title: "Calendar",
        to: "/admin/calendar",
        icon: CalendarViewDayOutlined,
      },
      { title: "Messages", to: "/admin/messages", icon: ChatBubbleOutline },
      {
        title: "Bulk Emails",
        to: "/admin/create-notifications",
        icon: Mail,
      },
      {
        title: "Prayer Requests",
        to: "/admin/prayer-requests",
        icon: MailOutline,
      },
      { title: "Weekly Quiz", to: "/admin/weekly-quiz", icon: BookOpen },
    ],
  },
  // {
  //   label: "General",
  //   links: [
  //     { title: "Search", to: "/search", icon: Search },
  //     { title: "Help", to: "/help", icon: HelpCircle },
  //   ],
  // },
];

