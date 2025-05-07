"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TaskDetails from "@/components/task-details";
import TaskLoading from "@/components/task-loading";
import TaskNotFound from "@/components/task-notfound";

export default function TaskPage() {
  const { id } = useParams(); // Client-side params hook
  const [task, setTask] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching task with id: ${id}`);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        console.log(`API URL: ${apiUrl}`);
        
        const response = await fetch(
          `${apiUrl}/api/records/tasks/read/${id}`,
          { 
            credentials: 'include', // Important for cookies
            cache: "no-store",
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        // Check if response is ok before parsing JSON
        if (!response.ok) {
          console.error(`Error response: ${response.status} ${response.statusText}`);
          const text = await response.text();
          console.error("Response body:", text);
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Response data:", data);

        if (data.success && data.task) {
          setTask(data.task);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching task:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return <TaskLoading/>;
  }

  if (task === null || error) {
    return <TaskNotFound/>;
  }

  return <TaskDetails task={task} />;
}
