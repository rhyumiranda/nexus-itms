"use client"

import { RemindersList } from "@/components/reminders-list"

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

interface TasksReminderProps {
  tasks: Task[];
  refreshTasks: () => void;
}

export function TaskReminders({tasks, refreshTasks} : TasksReminderProps) {

  const incompleteTasks = tasks.filter((task) => task.status !== "Completed")

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const overdueTasks = incompleteTasks.filter((task) => {
    const dueDate = new Date(task.deadline)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate < today
  })

  const dueTodayTasks = incompleteTasks.filter((task) => {
    const dueDate = new Date(task.deadline)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate.getTime() === today.getTime()
  })

  const dueTomorrowTasks = incompleteTasks.filter((task) => {
    const dueDate = new Date(task.deadline)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate.getTime() === tomorrow.getTime()
  })

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Reminders</h1>
                <p className="text-muted-foreground">Stay on top of your upcoming and overdue tasks</p>
              </div>
            </div>

            <div className="space-y-8">
              {overdueTasks.length > 0 && (
                <RemindersList
                  title="Overdue"
                  description="These tasks are past their due date"
                  tasks={overdueTasks}
                  variant="destructive"
                  refreshTasks={refreshTasks}
                />
              )}

              {dueTodayTasks.length > 0 && (
                <RemindersList
                  title="Due Today"
                  description="These tasks are due today"
                  tasks={dueTodayTasks}
                  variant="warning"
                  refreshTasks={refreshTasks}
                />
              )}

              {dueTomorrowTasks.length > 0 && (
                <RemindersList
                  title="Due Tomorrow"
                  description="These tasks are due tomorrow"
                  tasks={dueTomorrowTasks}
                  variant="default"
                  refreshTasks={refreshTasks}
                />
              )}

              {overdueTasks.length === 0 && dueTodayTasks.length === 0 && dueTomorrowTasks.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mt-2 text-lg font-semibold">No upcoming reminders</h3>
                  <p className="mb-4 mt-1 text-sm text-muted-foreground">
                    You&apos;re all caught up! There are no tasks due soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
