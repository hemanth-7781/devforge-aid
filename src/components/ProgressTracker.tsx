import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, BookOpen, Code, Star, TrendingUp, Calendar, Zap } from "lucide-react";

const ProgressTracker = () => {
  const stats = {
    totalExercises: 124,
    completedExercises: 67,
    totalTutorials: 18,
    completedTutorials: 12,
    streakDays: 7,
    totalPoints: 2450,
    level: 8,
    nextLevelPoints: 2800
  };

  const recentAchievements = [
    { id: 1, title: "First Steps", description: "Completed your first tutorial", icon: BookOpen, earned: "2 days ago" },
    { id: 2, title: "Code Warrior", description: "Solved 50 coding exercises", icon: Code, earned: "1 week ago" },
    { id: 3, title: "Streak Master", description: "7-day learning streak", icon: Zap, earned: "Today" },
  ];

  const skillProgress = [
    { skill: "JavaScript", level: 85, color: "success" },
    { skill: "React", level: 72, color: "primary" },
    { skill: "Algorithms", level: 58, color: "warning" },
    { skill: "Python", level: 45, color: "destructive" },
  ];

  const weeklyActivity = [
    { day: "Mon", completed: 3 },
    { day: "Tue", completed: 5 },
    { day: "Wed", completed: 2 },
    { day: "Thu", completed: 4 },
    { day: "Fri", completed: 6 },
    { day: "Sat", completed: 3 },
    { day: "Sun", completed: 4 },
  ];

  const exerciseCompletion = (stats.completedExercises / stats.totalExercises) * 100;
  const tutorialCompletion = (stats.completedTutorials / stats.totalTutorials) * 100;
  const levelProgress = ((stats.totalPoints - (stats.level - 1) * 350) / 350) * 100;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Progress Tracker</h2>
          <p className="text-muted-foreground">Monitor your learning journey and achievements</p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Trophy className="h-4 w-4 text-warning" />
          Level {stats.level}
        </Badge>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/20">
              <Target className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completedExercises}</p>
              <p className="text-sm text-muted-foreground">Exercises Done</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.completedTutorials}</p>
              <p className="text-sm text-muted-foreground">Tutorials Done</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/20">
              <Zap className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.streakDays}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <Star className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalPoints}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Exercises</span>
                <span className="font-semibold">{stats.completedExercises}/{stats.totalExercises}</span>
              </div>
              <Progress value={exerciseCompletion} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round(exerciseCompletion)}% completed
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Tutorials</span>
                <span className="font-semibold">{stats.completedTutorials}/{stats.totalTutorials}</span>
              </div>
              <Progress value={tutorialCompletion} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round(tutorialCompletion)}% completed
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Level Progress</span>
                <span className="font-semibold">{stats.totalPoints}/{stats.nextLevelPoints}</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {stats.nextLevelPoints - stats.totalPoints} points to next level
              </p>
            </div>
          </div>
        </Card>

        {/* Skills Breakdown */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Skill Levels</h3>
          <div className="space-y-4">
            {skillProgress.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.skill}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Weekly Activity</h3>
          </div>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-primary/20 rounded-t-sm relative"
                  style={{ height: `${(day.completed / 6) * 100}%` }}
                >
                  <div 
                    className="w-full bg-primary rounded-t-sm absolute bottom-0"
                    style={{ height: '100%' }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold">Recent Achievements</h3>
          </div>
          <div className="space-y-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="p-2 rounded-lg bg-warning/20">
                  <achievement.icon className="h-4 w-4 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">{achievement.earned}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracker;