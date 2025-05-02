"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

import { TaskCard } from "./task-card"

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  created: string;
}

interface TaskListProps {
  tasks: Task[];
  refreshTasks?: () => void;
}

export function TaskList({ tasks, refreshTasks } : TaskListProps) {

  // In TaskCard or TaskList
  const handleStatusChange = async (newStatus: string) => {
    // ...update logic...
    if (refreshTasks) refreshTasks();
  };

  if(tasks.length === 0) {
    return (
      <div className="@container/card flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="mt-2 text-lg font-semibold">No tasks found</h3>
        <p className="mb-4 mt-1 text-sm text-muted-foreground">There are no tasks matching your current filter.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <Link href={`/dashboard/tasks/${task.id}`} key={task.id}>
          <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange}/>
        </Link>
      ))}
    </div>
  )
}