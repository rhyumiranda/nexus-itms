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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/records/tasks/read/${id}`,
          { cache: "no-store" }
        );

        const data = await response.json();

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
    return (<TaskNotFound/>);
  }

  return <TaskDetails task={task} />;
}
