"use client";

import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import UpdateTaskModal from "@/components/update-modal";
import { Trash } from "lucide-react";
import { Check } from "lucide-react";
import { Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  user: string;
  deadline: string;
  created: string;
  updated: string;  
}

interface TaskDetailsProps {
  task: Task;
}

export default function TaskDetails({task} : TaskDetailsProps) {

  const router = useRouter();

  const priorityColors = {
    Low: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200",
    Medium:
      "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200",
    High: "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200",
    Urgent:
      "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200",
  };

  const statusColors = {
    "Not Started":
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
    "In Progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-300",
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-300",
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Not specified";

    try {
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "Invalid date: " + error;
    }
  };

  const handleDeleteTask = async () => {
    try{
      const response = await fetch(`/api/records/tasks/delete/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(response.ok){
        console.log("Task deleted successfully");
      }

      toast.success("Deleted", {
        description: "The task has been successfully removed from your list.",
      });        
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      console.error("Error deleting task: ", error);
    }
  }

  const handleCompleteTask = async () => {
    try {
      const response = await fetch(`/api/records/tasks/update/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      if(response.ok){
        console.log("Task completed successfully");
      }

      toast.success("Task completed", {
        description: "The task has been marked as completed.",
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error completing task: ", error);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl">{task.title}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Badge
                  className={
                    statusColors[task.status as keyof typeof statusColors]
                  }
                >
                  {task.status}
                </Badge>
                <Badge
                  className={
                    priorityColors[task.priority as keyof typeof priorityColors]
                  }
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}{" "}
                  Priority
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space -y-6">
            <div className="flex flex-col gap-2">
              <h3>Description</h3>
              <p className="text-muted-foreground">{task.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1 item-start">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Due Date</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(task.deadline)}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Created</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(task.created)}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <div className="flex items-center">
                  <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-medium">Last Updated</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(task.updated)}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t pt-6">
            <UpdateTaskModal task={task} />
            <Button onClick={handleCompleteTask}>
              <Check className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="inline-block">
                  <Button variant="ghost">
                    <Trash className="h-4 w-4"/>
                  </Button>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                  This action is irreversible. Deleting this task will permanently remove it and all associated data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteTask}>Delete Task</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
