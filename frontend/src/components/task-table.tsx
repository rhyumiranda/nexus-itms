"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Search } from "lucide-react"

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
  refreshTasks: () => void;
}

export default function TaskTable({tasks, refreshTasks} : TasksTableViewProps) {
  const router = useRouter();
  const [sortField, setSortField] = useState<keyof Task>('deadline');
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchQuery, setSearchQuery] = useState("")

  const handleStatusChange = async (newStatus: string) => {

    console.log("Status changed to:", newStatus);
    if (refreshTasks) refreshTasks();
  };

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
  
  const handleSort = (field: keyof Task) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortField === "deadline" || sortField === "created" || sortField === "updated") {
      const dateA = new Date(a[sortField]).getTime()
      const dateB = new Date(b[sortField]).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    }

    if (a[sortField] < b[sortField]) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRowClick = (id: string) => {
    router.push(`dashboard/tasks/${id}`)
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="mt-2 text-lg font-semibold">No tasks found</h3>
        <p className="mb-4 mt-1 text-sm text-muted-foreground">There are no tasks matching your current filter.</p>
      </div>
    )
  }

  const updateStatus = async (taskId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/records/tasks/update/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update status');
      }

      if (handleStatusChange) handleStatusChange(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("title")}>
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("priority")}>
                  Priority
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("deadline")}>
                  Due Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id} className="cursor-pointer" onClick={() => handleRowClick(task.id)}>
                <TableCell className="font-medium">
                  <div>
                    <div>{task.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[300px]">{task.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(task.deadline)}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select 
                    defaultValue={task.status}
                    onValueChange={(newStatus) => updateStatus(task.id, newStatus)}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
