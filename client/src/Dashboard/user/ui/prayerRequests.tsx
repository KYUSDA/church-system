import {
  HandHelping,
  BookOpen,
  MessageCircle,
  Send,
  Heart,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { getBaseUrl, getAuthHeaders } from "@/services/base_query";
import { toast } from "sonner";
import prayer from "../../../assets/prayer.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const PrayerRequests = () => {
  const baseUrl = getBaseUrl();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    prayerRequest: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!formData.prayerRequest.trim()) {
      toast.error("Please enter your prayer request");
      return;
    }

    setIsLoading(true);
    const url = `${baseUrl}/prayers/prayerRequest`;

    interface ResponseData {
      ok: boolean;
    }

    try {
      const response: ResponseData = await fetch(url, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Prayer Request Submitted! 🙏", {
          description: "Our prayer team will lift you up in prayer.",
        });
        setFormData({ prayerRequest: "" });
      } else {
        toast.error("Failed to Submit Prayer Request!");
      }
    } catch (error) {
      toast.error("Failed to Submit Prayer Request!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <Card className="text-center border-none shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Daily Prayer Motivation
            </CardTitle>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
            "Prayer does not bring God down to us, but brings us up to Him."
          </CardDescription>
          <Badge variant="secondary" className="mx-auto mt-4 gap-1">
            <Sparkles className="h-3 w-3" />
            Join our prayer community
          </Badge>
        </CardHeader>
      </Card>

      {/* Services Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <HandHelping className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Praise & Worship</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Lift your voice and heart in gratitude. Worship brings us closer
              to God and fills our hearts with joy.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Rejoice in Prayer</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Build a daily habit of prayer and experience the transformative
              power of God's presence in your life.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Exhortation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              Be encouraged and strengthened by God's word every morning. Find
              hope and inspiration for each new day.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Main Prayer Section */}
      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative">
            <img
              src={prayer}
              alt="Praying in Church"
              className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12 space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="gap-1">
                <Heart className="h-3 w-3" />
                Prayer Community
              </Badge>
              <CardTitle className="text-3xl font-bold leading-tight">
                Start Your Day with Prayer
              </CardTitle>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Every morning is an opportunity to deepen your connection with
                  God. Set aside time to pray, reflect, and receive His
                  guidance.
                </p>
                <p>
                  Join us in a journey of faith. Let's make prayer a lifestyle,
                  not just a routine. Submit your prayer request, and we will
                  stand with you in prayer.
                </p>
              </div>
            </div>

            <Separator />

            {/* Prayer Request Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <CardTitle className="text-xl">
                  Share Your Prayer Request
                </CardTitle>
                <CardDescription>
                  Our prayer team will lift up your needs before God
                </CardDescription>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  value={formData.prayerRequest}
                  onChange={handleChange}
                  name="prayerRequest"
                  placeholder="Enter your prayer request here... Share what's on your heart."
                  className="min-h-[120px] resize-none"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !formData.prayerRequest.trim()}
                  className="w-full gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Prayer Request
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PrayerRequests;
