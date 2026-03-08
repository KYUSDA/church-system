import React from 'react';
import { Target, TrendingUp, Award, BookOpen, Heart, CheckCircle2, Trophy, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GoalData {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  icon: React.ElementType;
  color: string;
  category: 'study' | 'participation' | 'service' | 'growth';
  streak?: number;
  lastUpdated?: string;
}

const PersonalGoals: React.FC = () => {
  const goals: GoalData[] = [
    {
      id: '1',
      title: 'Lesson Discussion Participation',
      description: 'Active participation in weekly discussions',
      progress: 75,
      target: 100,
      icon: BookOpen,
      color: 'text-blue-600',
      category: 'participation',
      streak: 3,
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'Discovery Guide Progress',
      description: 'Complete daily study guide readings',
      progress: 40,
      target: 100,
      icon: Target,
      color: 'text-orange-600',
      category: 'study',
      streak: 1,
      lastUpdated: 'Yesterday'
    },
    {
      id: '3',
      title: 'Prayer & Devotion Time',
      description: 'Daily personal worship time',
      progress: 85,
      target: 100,
      icon: Heart,
      color: 'text-pink-600',
      category: 'growth',
      streak: 7,
      lastUpdated: 'Today'
    },
    {
      id: '4',
      title: 'Community Service',
      description: 'Monthly service activities',
      progress: 60,
      target: 100,
      icon: Award,
      color: 'text-green-600',
      category: 'service',
      streak: 2,
      lastUpdated: '1 week ago'
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressVariant = (progress: number) => {
    if (progress >= 80) return 'default';
    if (progress >= 60) return 'secondary';
    return 'destructive';
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 7) return 'text-orange-600';
    if (streak >= 3) return 'text-blue-600';
    return 'text-gray-600';
  };

  const overallProgress = Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length);

    return (
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Target className="h-5 w-5 text-primary" />
                  <TrendingUp className="h-3 w-3 text-green-500 absolute -top-1 -right-1" />
                </div>
                <CardTitle className="text-lg">Spiritual Goals</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Trophy className="h-3 w-3" />
                  {overallProgress}%
                </Badge>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <TooltipProvider>
              {goals.map((goal) => {
                const Icon = goal.icon;
                const isCompleted = goal.progress >= goal.target;
                
                return (
                  <div key={goal.id} className="group">
                    <div className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className={`p-2 rounded-full bg-muted/50 ${goal.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm leading-none">
                                {goal.title}
                              </h4>
                              {isCompleted && (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {goal.description}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {goal.streak && goal.streak > 0 && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-1">
                                    <Flame className={`h-3 w-3 ${getStreakColor(goal.streak)}`} />
                                    <span className={`text-xs font-medium ${getStreakColor(goal.streak)}`}>
                                      {goal.streak}
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{goal.streak} day streak!</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            
                            <span className="text-sm font-medium">
                              {goal.progress}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Progress 
                            value={goal.progress} 
                            className="h-2"
                          />
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Last updated: {goal.lastUpdated}</span>
                            <span className="capitalize">{goal.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </TooltipProvider>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {goals.filter(g => g.progress >= 80).length} of {goals.length} goals on track
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Target className="h-3 w-3" />
                  Set New Goal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
    );
};

export default PersonalGoals;
