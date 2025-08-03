import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Clock, Compass, MapPin, Navigation, Bell } from "lucide-react";

function DiscoveryGuides() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-2xl w-full text-center border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-50">
        <CardContent className="p-12 space-y-6">
          {/* Icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <Map className="h-12 w-12 text-white" />
          </div>

          {/* Coming Soon Badge */}
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200"
          >
            <Clock className="h-4 w-4 mr-2" />
            Coming Soon
          </Badge>

          {/* Title */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Discovery Guides
          </h1>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore your spiritual journey with guided discovery paths,
              interactive maps, and personalized growth plans.
            </p>
            <p className="text-sm text-muted-foreground">
              Navigate through faith milestones, discover new ministries, and
              connect with opportunities that align with your calling.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-lg bg-white/50 border border-red-200">
              <Compass className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Faith Journey</p>
              <p className="text-xs text-gray-600">
                Track your spiritual growth
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 border border-red-200">
              <MapPin className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Ministry Map</p>
              <p className="text-xs text-gray-600">Find your place to serve</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 border border-red-200">
              <Navigation className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-800">Guided Paths</p>
              <p className="text-xs text-gray-600">
                Personalized recommendations
              </p>
            </div>
          </div>

          {/* CTA Button */}
          {/* <div className="pt-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Bell className="h-4 w-4 mr-2" />
              Join the Journey
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default DiscoveryGuides;
