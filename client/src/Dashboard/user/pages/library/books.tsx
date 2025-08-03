import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Calendar, Bell } from "lucide-react";

function Books() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-2xl w-full text-center border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-12 space-y-6">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <BookOpen className="h-12 w-12 text-white" />
          </div>

          {/* Coming Soon Badge */}
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200"
          >
            <Clock className="h-4 w-4 mr-2" />
            Coming Soon
          </Badge>

          {/* Title */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Digital Library
          </h1>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're curating an amazing collection of spiritual books, study
              guides, and devotionals to enrich your faith journey.
            </p>
            <p className="text-sm text-muted-foreground">
              Our digital library will feature bestselling Christian authors,
              Bible commentaries, inspirational stories, and much more.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-lg bg-white/50 border border-green-200">
              <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">E-Books</p>
              <p className="text-xs text-gray-600">Read online or download</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 border border-green-200">
              <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Study Plans</p>
              <p className="text-xs text-gray-600">Guided reading schedules</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 border border-green-200">
              <Bell className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Notifications</p>
              <p className="text-xs text-gray-600">
                Get updates on new releases
              </p>
            </div>
          </div>

          {/* CTA Button */}
          {/* <div className="pt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notify Me When Available
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default Books;
