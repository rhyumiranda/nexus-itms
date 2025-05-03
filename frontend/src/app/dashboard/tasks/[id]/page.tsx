"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TaskDetails from "@/components/task-details";

export default function TaskPage() {
  const { id } = useParams(); // Client-side params hook
  const [task, setTask] = useState(null);
  const [error, setError] = useState(false);

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
        setError(true);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Task not found</h1>
        <p className="text-muted-foreground">The task you are looking for does not exist.</p>
      </div>
    );
  }

  if (!task) {
    return <div>Loading...</div>;
  }

  return <TaskDetails task={task} />;
}
