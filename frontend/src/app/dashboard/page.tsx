"use client"
import { useState, useEffect} from 'react';

import TaskTable from "@/components/task-table"
import { SectionCards } from "@/components/section-cards"
import { TaskList } from "@/components/task-list"

import TaskFilters from '@/components/ui/task-filters';
import { ViewToggle } from '@/components/view-toggle';

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


export default function Page() {

  const [data, setData] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [view, setView] = useState<string>("grid");

  const fetchTasks = async () => {
    try{
      const response = await fetch('/api/records/tasks/read');
      const data = await response.json();

      if (data.success && Array.isArray(data.tasks)) {
        setData(data.tasks);
      }

    } catch(error) {
      console.error("Error fetching tasks: ", error)
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = activeFilter === "all" ? data : data.filter((task) => task.status === activeFilter);

  return (
    
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
                <div className='px-5 lg:px-6'>
                  <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                  <p className="text-muted-foreground">Manage your tasks and track your progress</p>
                </div>
                <ViewToggle view={view} setView={setView}/>
              </div>
              <SectionCards tasks={data}/>
              <div className="px-4 lg:px-6 w-full space-y-6 ">
                {view === 'grid' ? (
                  <>
                    <TaskFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
                    <TaskList tasks={filteredTasks} refreshTasks={fetchTasks}/>
                  </>
                ) : (
                  <TaskTable tasks={data} refreshTasks={fetchTasks}/>
                )}
                
              </div>
            </div>
          </div>
        </div>
  )
}
