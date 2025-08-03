import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl, getAuthHeaders } from "../../../../services/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Trophy,
  Clock,
  BookOpen,
  Play,
  CheckCircle2,
  XCircle,
  Star,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  week: number;
  image?: { url: string };
}

interface CompletedQuiz {
  _id: string;
  scorePercentage: number;
  quiz: Quiz;
}

const QuizzesPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<CompletedQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = getBaseUrl();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);
  const token = authState?.user?.data.tokens.accessToken;

  // Fetch Available Quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/quizzes/get-quizzes`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) throw new Error("Failed to fetch quizzes");

        const data = await response.json();
        setQuizzes(Array.isArray(data.quizzes) ? data.quizzes : []);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        toast.error("Failed to load quizzes");
        setQuizzes([]);
      }
    };

    fetchQuizzes();
  }, [baseUrl]);

  // Fetch Completed Quizzes
  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const response = await fetch(`${baseUrl}/quizzes/get-results`, {
         headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) throw new Error("Failed to fetch completed quizzes");

        const data = await response.json();
        setCompletedQuizzes(Array.isArray(data.results) ? data.results : []);
      } catch (error) {
        console.error("Error fetching completed quizzes:", error);
        toast.error("Failed to load quiz results");
        setCompletedQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedQuizzes();
  }, [baseUrl]);

  const getScoreVariant = (score: number) => {
    if (score >= 90) return "default"; // Green
    if (score >= 70) return "secondary"; // Yellow/Orange
    if (score >= 50) return "outline"; // Gray
    return "destructive"; // Red
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Trophy className="h-3 w-3" />;
    if (score >= 70) return <Star className="h-3 w-3" />;
    if (score >= 50) return <CheckCircle2 className="h-3 w-3" />;
    return <XCircle className="h-3 w-3" />;
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-40 w-full rounded-md" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Defend Your Faith
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Test your biblical knowledge with our weekly quizzes and track your
          spiritual growth
        </p>
      </div>

      {/* Current Quizzes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Available Quizzes</h2>
          <Badge variant="outline" className="ml-auto">
            {quizzes.length} quiz{quizzes.length !== 1 ? "es" : ""}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <Card
                key={quiz._id}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={
                        quiz.image?.url ||
                        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=240&fit=crop"
                      }
                      alt={quiz.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="gap-1">
                        <Calendar className="h-3 w-3" />
                        Week {quiz.week}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <CardTitle className="text-lg line-clamp-2">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {quiz.description}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() =>
                      navigate(`/member/defend-your-faith/quizze/${quiz._id}`)
                    }
                    className="w-full gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="p-12 text-center">
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <CardTitle className="text-xl mb-2">
                  No Quizzes Available
                </CardTitle>
                <CardDescription>
                  Check back later for new quizzes to test your faith knowledge
                </CardDescription>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Completed Quizzes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Your Results</h2>
          <Badge variant="outline" className="ml-auto">
            {completedQuizzes.length} completed
          </Badge>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Week</TableHead>
                  <TableHead>Quiz Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedQuizzes.length > 0 ? (
                  completedQuizzes.map((result) => (
                    <TableRow key={result._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Badge variant="outline">{result.quiz.week}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {result.quiz.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {result.quiz.description}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={getScoreVariant(result.scorePercentage)}
                          className="gap-1"
                        >
                          {getScoreIcon(result.scorePercentage)}
                          {result.scorePercentage}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground font-medium">
                        No completed quizzes yet
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Complete your first quiz to see your results here
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizzesPage;
