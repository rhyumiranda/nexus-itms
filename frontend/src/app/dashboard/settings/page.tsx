'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function Settings() {
  const [tasks, setTasks] = useState<any[]>([]);
  // const [userId, setUserId] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //     const id = Cookies.get('pb_user_id');
  //     if (id) setUserId(id);
  //   }, [])

  useEffect(() => {
    console.log("Tasks: ", tasks);
  }, [tasks])

  const handleFetch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/records/tasks/read', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log("Data received:", data);
      setTasks(data);

      if (data.success && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
      } else {
        console.error("Invalid response format or no tasks found");
        setTasks([]);
      }
    } catch (error) {
      console.log("Error: ", error);
      setTasks([]);
    }
  };

  return (
    <>
      <Button onClick={handleFetch}>Click me!</Button>
      {tasks && tasks.map((task, index) => (
        <div key={index}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.status}</p>
          <p>{task.priority}</p>
          <p>{task.deadline}</p>
        </div>
      ))}
    </>
  )
}
