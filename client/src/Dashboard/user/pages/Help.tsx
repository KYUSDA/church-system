import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Bug, Lightbulb, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useReportIssueMutation } from "@/services/authService";
import { Label } from "@/components/ui/label";

const Help = () => {
  const [reportIssueMutation] = useReportIssueMutation();

  // Issue reporting states
  const [issueType, setIssueType] = useState<"bug" | "feature" | "ui">("bug");
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const handleReportIssue = async () => {
    if (!issueTitle.trim() || !issueDescription.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await reportIssueMutation({
        type: issueType,
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
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
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
    </div>
  );
};

export default Help;
