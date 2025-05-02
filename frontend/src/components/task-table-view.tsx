"use client"

import { useState } from 'react';

interface Task{
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

interface TasksTableViewProps {
  tasks: Task[];
}

export default function TaskTableView({tasks} : TasksTableViewProps) {

  return (
    <div>
      
    </div>
  )
}
