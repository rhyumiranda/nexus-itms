import { useState } from 'react'
import {format, addDays} from 'date-fns'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { IconCirclePlusFilled } from "@tabler/icons-react"
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


export default function CreateModal() {

  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <IconCirclePlusFilled />
          <Button className="bg-transparent hover:bg-transparent">Quick Create</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Create New Task </DialogTitle>
          <DialogDescription> This is the description. </DialogDescription>
          <form>
            <div className="grid gap-6 text-left">
              <div className="grid gap-3">
                <label htmlFor="task-title">Title</label>
                <Input type="text" required autoFocus/>
              </div>
              <div className='grid gap-3'>
                <label htmlFor="">Description</label>
                <Textarea required/>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='grid gap-3'>
                  <label htmlFor="task-status">Status</label>
                  <Select>
                    <SelectTrigger className="w-full max-w-[250px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not-started">Not started</SelectItem>
                        <SelectItem value="In-Progress">In Progress</SelectItem>
                      <SelectItem value="Complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid gap-3'>
                  <label htmlFor="task-status">Priority</label>
                  <Select>
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
                      onValueChange={(value) =>
                        setDate(addDays(new Date(), parseInt(value)))
                      }
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
                      <Calendar mode="single" selected={date} onSelect={setDate} />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Button type='submit'>Create Task</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
