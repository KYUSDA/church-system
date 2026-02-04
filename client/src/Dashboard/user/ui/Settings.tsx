import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  AlertTriangle,
  Camera,
  Save,
  Eye,
  EyeOff,
  Mail,
  MailOpen,
  Bug,
  Lightbulb,
  Palette,
} from "lucide-react";
import { getBaseUrl, getAuthHeaders } from "@/services/base_query";
import useUserData from "../../../session/authData";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  useGetAllNotificationsQuery,
  useReportIssueMutation,
} from "../../../services/authService";

interface Notification {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
}

const Settings = () => {
  const { userData, user, setUserData, refetchUser } = useUserData();
  const [preview, setPreview] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  // Issue reporting states
  const [issueType, setIssueType] = useState<"bug" | "feature" | "ui">("bug");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const [reportIssueMutation] = useReportIssueMutation();

  // Notifications query
  const { data: notificationsData } = useGetAllNotificationsQuery();

  const baseUrl = getBaseUrl();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setPreview(URL.createObjectURL(selectedFile));

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    if (!user || !user.userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      if (user) {
        const uploadUrl = `${baseUrl}/profile/update-avatar`;

        const response = await fetch(uploadUrl, {
          method: "PUT",
          body: formData,
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server Error:", errorText);
          toast.error("Failed to update profile picture");
          return;
        }

        const data = await response.json();

        if (data.user?.avatar?.url) {
          setUserData((prev: any) => ({
            ...prev,
            avatar: data.user.avatar.url,
          }));
          toast.success("Profile picture updated successfully! 📸");
          await refetchUser();
        } else {
          toast.error("Failed to update profile picture.");
        }
      }
    } catch (error) {
      console.error("Error updating profile picture", error);
      toast.error("An error occurred while updating the profile picture.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/member/change-password`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        toast.success("Password updated successfully! 🔐");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  const handleReportIssue = async () => {
    if (!issueTitle.trim() || !issueDescription.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await reportIssueMutation({
        title: issueTitle,
        description: issueDescription,
      });

      if (res) {
        toast.success("Issue reported successfully! 🐛", {
          description: "Our team will review it shortly.",
        });
        setIssueTitle("");
        setIssueDescription("");
        setIssueType("bug");
      } else {
        toast.error("Failed to report issue");
      }
    } catch (error) {
      toast.error("Failed to report issue");
    }
  };

  // Process notifications data
  const notificationsArray: Notification[] = Array.isArray(
    notificationsData?.notifications
  )
    ? notificationsData.notifications
    : [];
  const unreadNotifications = notificationsArray.filter(
    (n) => !n.isRead
  ).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings, notifications, and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
            {unreadNotifications > 0 && (
              <Badge
                variant="destructive"
                className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="support" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Support
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your profile picture and view your account information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={preview || userData?.avatar?.url} />
                    <AvatarFallback className="text-lg">
                      {userData?.firstName?.[0]}
                      {userData?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Label
                    htmlFor="profile-upload"
                    className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Camera className="h-3 w-3" />
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="profile-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the camera icon to update your profile picture
                  </p>
                </div>
              </div>

              <Separator />

              {/* Profile Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={userData?.firstName || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={userData?.lastName || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oldPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handlePasswordChange}
                disabled={
                  loading || !oldPassword || !newPassword || !confirmPassword
                }
                className="w-full gap-2"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Password
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid gap-6">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Recent Notifications
                  {unreadNotifications > 0 && (
                    <Badge variant="secondary">
                      {unreadNotifications} unread
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Your latest notifications and updates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notificationsArray.length > 0 ? (
                    notificationsArray.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="mt-1">
                          {notification.isRead ? (
                            <MailOpen className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Mail className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              notification.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <Badge
                            variant="secondary"
                            className="h-2 w-2 rounded-full p-0"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <Mail className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground mt-2">
                        No notifications yet
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Report an Issue
              </CardTitle>
              <CardDescription>
                Found a bug or have a suggestion? Let us know!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Issue Type */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={issueType === "bug" ? "default" : "outline"}
                  onClick={() => setIssueType("bug")}
                  className="gap-2"
                >
                  <Bug className="h-4 w-4" />
                  Bug
                </Button>
                <Button
                  variant={issueType === "feature" ? "default" : "outline"}
                  onClick={() => setIssueType("feature")}
                  className="gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  Feature
                </Button>
                <Button
                  variant={issueType === "ui" ? "default" : "outline"}
                  onClick={() => setIssueType("ui")}
                  className="gap-2"
                >
                  <Palette className="h-4 w-4" />
                  UI/UX
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueTitle">Issue Title</Label>
                <Input
                  id="issueTitle"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  placeholder="Brief description of the issue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueDescription">Description</Label>
                <Textarea
                  id="issueDescription"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Provide detailed information about the issue..."
                  className="min-h-[100px]"
                />
              </div>

              <Button
                onClick={handleReportIssue}
                disabled={!issueTitle.trim() || !issueDescription.trim()}
                className="w-full gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Submit Report
              </Button>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Common issues and helpful resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                <p className="text-sm font-medium">Common Issue Types:</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Bug className="h-4 w-4 text-red-500" />
                    <span>
                      <strong>Bugs:</strong> Technical issues, crashes, or
                      unexpected behavior
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span>
                      <strong>Features:</strong> Missing functionality or
                      enhancement requests
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-blue-500" />
                    <span>
                      <strong>UI/UX:</strong> Design improvements or usability
                      issues
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
