import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import data from "./data.json"

export default async function Page() {
  
  const handleFetch = async (e: MouseEvent) => {
    e.preventDefault();
    console.log("Fetch data");
  }

  // try {
  //   const response = await fetch('http://localhost:3000/api/records/tasks/read', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //   }});

  //   console.log("Response: ", response);

  //   if (!response.ok) {
  //     throw new Error(`API error: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   if (data.success && data.tasks) {
  //     tableData = data.tasks.map(task => ({
  //       id: parseInt(task.id) || Math.floor(Math.random() * 10000), // Convert string ID to number or generate random
  //       header: task.title || 'Untitled Task',
  //       type: task.type || 'Task',
  //       status: task.status || 'Not Started',
  //       target: task.target || '--',
  //       limit: task.deadline || '--',
  //       reviewer: task.assigned_to || 'Assign reviewer'
  //     }));
  //   }

  //   console.log("Table Data: ", tableData);
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
