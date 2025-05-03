"use client"
import { useEffect, useState } from 'react'
import {format, addDays} from 'date-fns'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar as CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'

interface TaskFormData {
  id: string;
  title: string;
  description: string;
  user: string;
  status: string;
  priority: string;
  deadline: string;
  created: string;
}

import { Pencil } from 'lucide-react'

export default function UpdateTaskModal( {task}: {task: TaskFormData} ) {

  const [formData, setFormData] = useState<TaskFormData>({
    id: task.id,
    title: task.title,
    description: task.description,
    user: task.user,
    status: task.status,
    priority: task.priority,
    deadline: task.deadline && !isNaN(new Date(task.deadline).getTime()) 
      ? new Date(task.deadline).toISOString() 
      : '',
    created: task.created,
  });

  const [date, setDate] = useState<Date | undefined>(task.deadline ? new Date(task.deadline) : undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = Cookies.get('pb_user_id');
    if (id) setUserId(id);
  }, [])

  console.log("User ID from cookie:", userId);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/records/tasks/update/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          title: formData.title,
          description: formData.description,
          user: userId,
          status: formData.status,
          priority: formData.priority,
          deadline: formData.deadline,
          createdAt: formData.created,
        })
      });

      const data = await response.json();

      if (data.success) {
        
        window.location.reload();

        console.log('Task updated successfully:', data.task);
        toast.success("Updated", {
          description: "The task details have been saved.",
        });

        
        
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log('Failed to create task:', error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Update Task </DialogTitle>
          <DialogDescription> This is the description. </DialogDescription>
          <form onSubmit={handleCreateTask} className="grid gap-4">
            <div className="grid gap-6 text-left">
              <div className="grid gap-3">
                <label htmlFor="task-title">Title</label>
                <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}  type="text" required autoFocus/>
              </div>
              <div className='grid gap-3'>
                <label htmlFor="">Description</label>
                <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='grid gap-3'>
                  <label htmlFor="task-status">Status</label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger className="w-full max-w-[250px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent >
                      <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-3'>
                  <label htmlFor="task-status">Priority</label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger className="w-full max-w-[250px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='grid gap-3'>
                <label htmlFor="deadline">Deadline</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="flex w-auto flex-col space-y-2 p-2"
                  >
                    <Select
                      onValueChange={(value) => {
                        const newDate = addDays(new Date(), parseInt(value));
                        setDate(newDate);
                        setFormData(prev => ({...prev, deadline: newDate.toISOString()}));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                    <Calendar 
                      mode="single" 
                      selected={date} 
                      onSelect={(newDate) => {
                        setDate(newDate);
                        // Use functional update to ensure latest state
                        if (newDate) {
                          setFormData(prev => ({...prev, deadline: newDate.toISOString()}));
                        } else {
                          setFormData(prev => ({...prev, deadline: ''}));
                        }
                      }} 
                    />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Button type='submit'>Update Information</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
