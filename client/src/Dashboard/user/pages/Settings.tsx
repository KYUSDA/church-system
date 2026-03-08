import { useState } from "react";
import { User, Lock, Camera, Save, Eye, EyeOff } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface TProfile {
  userId?: string;
  birthday: Date;
  baptized: boolean;
  family?: string;
  department?: string;
}

const families = [
  "Upper Kutus",
  "Around School A",
  "Around School B",
  "Waterfall",
  "Garden Estate",
  "Diaspora A",
  "Diaspora B",
  "Ngomongo",
  "Kibugi",
  "Kanjata",
  "Elegant",
  "ACK",
  "Mjini",
];

const departments = [
  "Stewardship",
  "Welfare",
  "MasterGuide",
  "VOP",
  "Welfare",
  "Publishing",
  "Health",
  "Chaplaincy",
  "NRR",
  "Music",
  "Communication",
  "Deaconary",
  "Sabbath School",
];

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

  const baseUrl = getBaseUrl();

  const [formData, setFormData] = useState<TProfile>({
      birthday: new Date(),
      baptized: false,
      family: "",
      department: ""
    });
     const authState = useSelector((state: RootState) => state.auth);
      const token = authState?.user?.data.tokens.accessToken;
  
    if (!open) return null;
  
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
      const { name, value, type } = e.target;
  
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const res = await fetch(`${baseUrl}/profile/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            ...formData,
            birthday: new Date(formData.birthday),
          }),
        });
  
        if (!res.ok) throw new Error("Failed to create profile");
      } catch (error) {
        console.error(error);
        toast("Failed to save profile");
      } finally {
        setLoading(false);
      }
    };

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
        const uploadUrl = `${baseUrl}/user/update-avatar/${user?.userId}`;

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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings, and preferences.
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
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={userData?.role || "Member"}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input
                    id="birthday"
                    type="date"
                    required
                    value={formData.birthday || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family">Family</Label>
                  <Input
                    id="Family"
                    value={formData.family || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="family">Department</Label>
                  <Input
                    id="department"
                    value={formData.department || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="baptized"
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600"
                  />
                  <label className="text-sm font-medium">I am baptized</label>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
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
      </Tabs>
    </div>
  );
};

export default Settings;
