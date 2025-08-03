import { useState, useEffect } from "react";
import { Mail, X, Heart, Sparkles, Bell } from "lucide-react";
import useUserData from "../../../session/authData";
import { getBaseUrl } from "../../../services/authService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DevotionSubscriptionFloat = () => {
  const { userData } = useUserData();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const baseUrl = getBaseUrl();

  useEffect(() => {
    if (userData?.email) setEmail(userData.email);
  }, [userData]);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!email) return;
      
      try {
        const response = await fetch(
          `${baseUrl}/devotion/getOneSubscriber/${encodeURIComponent(email)}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setIsSubscribed(data.subscribed);
        
        // Check if user previously dismissed the card
        const dismissed = localStorage.getItem('devotion-dismissed');
        setIsDismissed(dismissed === 'true');
      } catch (error) {
        console.error("Error checking subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [email, baseUrl]);

  const handleSubscription = async () => {
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    setSubscribing(true);
    try {
      const response = await fetch(`${baseUrl}/devotion/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        toast.success("🎉 Subscription successful! You'll receive daily devotions.");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setSubscribing(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('devotion-dismissed', 'true');
  };

  // Hide if subscribed, loading, or dismissed
  if (loading || isSubscribed || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-5 duration-500">
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 shadow-xl">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Heart className="h-5 w-5 text-purple-600" />
                <Sparkles className="h-3 w-3 text-pink-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                  Daily Devotions
                </h3>
                <Badge variant="secondary" className="text-xs mt-1">
                  <Bell className="h-3 w-3 mr-1" />
                  Free
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-purple-700 dark:text-purple-200 mb-3 leading-relaxed">
            Start your day with inspiring devotions delivered to your inbox ✨
          </p>

          <div className="space-y-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-8 text-xs bg-white/80 border-purple-200"
              disabled={subscribing}
            />
            <Button
              onClick={handleSubscription}
              disabled={subscribing || !email}
              className="w-full h-8 text-xs bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="sm"
            >
              {subscribing ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Mail className="h-3 w-3 mr-2" />
                  Subscribe Now
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevotionSubscriptionFloat;
