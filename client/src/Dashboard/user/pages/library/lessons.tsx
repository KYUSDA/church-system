import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Clock, Users, Video, Bell } from "lucide-react";

function Lessons() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-2xl w-full text-center border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardContent className="p-12 space-y-6">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>

          {/* Coming Soon Badge */}
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          >
            <Clock className="h-4 w-4 mr-2" />
            Coming Soon
          </Badge>

          {/* Title */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Bible Study Lessons
          </h1>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Interactive Bible study lessons designed to deepen your
              understanding of God's Word and strengthen your faith walk.
            </p>
            <p className="text-sm text-muted-foreground">
              From beginner-friendly studies to advanced theological
              explorations, our lessons cater to every level of spiritual
              growth.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-lg bg-white/50 border border-yellow-200">
              <Video className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Video Lessons</p>
              <p className="text-xs text-gray-600">HD quality teachings</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 border border-yellow-200">
              <Users className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Group Studies</p>
              <p className="text-xs text-gray-600">Connect with others</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 border border-yellow-200">
              <GraduationCap className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Certificates</p>
              <p className="text-xs text-gray-600">Track your progress</p>
            </div>
          </div>

          {/* CTA Button */}
          {/* <div className="pt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bell className="h-4 w-4 mr-2" />
              Get Notified
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Lessons;
