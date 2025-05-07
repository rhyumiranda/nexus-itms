"use client"
import { TaskReminders } from "@/components/task-reminders"
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  user: string;
  status: string;
  priority: string;
  deadline: string;
  created: string;
  updated: string;
}

export default function ReminderRoute() {
  const [task, setTask] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try{
      const response = await fetch('/api/records/tasks/read');
      const data = await response.json();
      console.log("This show the data.tasks: ", data.tasks);

      if (data.success && Array.isArray(data.tasks)) {
        setTask(data.tasks);
      }

    } catch(error) {
      console.error("Error fetching tasks: ", error)
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskReminders tasks={task} refreshTasks={fetchTasks}/>
  )
}
