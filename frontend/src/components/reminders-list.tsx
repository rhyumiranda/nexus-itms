"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface Task {
  id: string;
  title: string
  description: string
  deadline: string
  priority: string;
  status: string;
  created: string;
  updated: string;
}

interface RemindersListProps {
  title: string
  description: string
  tasks: Task[]
  variant: "default" | "warning" | "destructive"
  refreshTasks: () => void
}

export function RemindersList({ title, description, tasks, variant, refreshTasks }: RemindersListProps) {
  const router = useRouter();

  const handleCompleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/records/tasks/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      toast.success("Task completed", {
        description: "The task has been marked as completed.",
      });

      refreshTasks();
    } catch (error) {
      console.error("Error completing task: ", error);
    }
  }

  const variantStyles = {
    default: "border-l-4 border-l-primary",
    warning: "border-l-4 border-l-amber-500",
    destructive: "border-l-4 border-l-destructive",
  }

  const priorityColors = {
    Low: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
    Medium:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
    High: "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200",
    Urgent:
      "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleTaskClick = (taskId: string) => {
    router.push(`dashboard/tasks/${taskId}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md flex flex-col sm:flex-row sm:items-center gap-4 p-4",
              variantStyles[variant],
            )}
            onClick={() => handleTaskClick(task.id)}
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{task.title}</h3>
                <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>{task.priority}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <span>Due: {formatDate(task.deadline)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompleteTask(task.id)
                }}
              >
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Complete
              </Button>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
