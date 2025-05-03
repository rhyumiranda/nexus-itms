'use client'
import { Badge } from "./ui/badge";
import { Calendar } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";



interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  created: string;
}

interface TaskCardProps {
  task: Task;
  onStatusChange?: (newStatus: string) => void;
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {

  console.log("TaskCard task:", task.id);

  const [status, setStatus] = useState(task.status);

  const priorityColors = {
    Low: "bg-green-200 text-green-900 hover:bg-green-300 dark:bg-green-800 dark:text-green-100",
    Medium: "bg-yellow-200 text-yellow-900 hover:bg-yellow-300 dark:bg-yellow-800 dark:text-yellow-100",
    High: "bg-orange-200 text-orange-900 hover:bg-orange-300 dark:bg-orange-800 dark:text-orange-100",
    Urgent: "bg-red-200 text-red-900 hover:bg-red-300 dark:bg-red-800 dark:text-red-100",
  
    // Fallbacks for lowercase values
    low: "bg-green-200 text-green-900 hover:bg-green-300 dark:bg-green-800 dark:text-green-100",
    medium: "bg-yellow-200 text-yellow-900 hover:bg-yellow-300 dark:bg-yellow-800 dark:text-yellow-100",
    high: "bg-orange-200 text-orange-900 hover:bg-orange-300 dark:bg-orange-800 dark:text-orange-100",
    urgent: "bg-red-200 text-red-900 hover:bg-red-300 dark:bg-red-800 dark:text-red-100"
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const ellipsisText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."
    } else {
      return text.toString()
    }
  }

  const updateStatus = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/records/tasks/update/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update status');
      }

      if (onStatusChange) onStatusChange(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Card className="min-h-[250px] @container/card data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <Badge 
            className={`${priorityColors[task.priority as keyof typeof priorityColors] || 'bg-purple-100 text-purple-800'} border-0`} 
            variant="outline"
          >
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{ task.description != '' ? ellipsisText(task.description, 60) : 'Add a description...'}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          <span>Due: {formatDate(task.deadline)}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Select
          value={status} 
          onValueChange={async (value) => {
            setStatus(value);
            await updateStatus(value);
          }}
        >
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Not Started">Not Started</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  )
}


