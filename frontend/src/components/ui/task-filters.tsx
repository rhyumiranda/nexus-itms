"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TaskFiltersProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export default function TaskFilters({activeFilter, setActiveFilter} : TaskFiltersProps) {
  return (
    <div className="background-muted w-full flex items-center justify-between">
      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="Not Started">Not Started</TabsTrigger>
          <TabsTrigger value="In Progress">In Progress</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
