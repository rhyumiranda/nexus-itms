"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Table2 } from "lucide-react"

interface ViewToggleProps {
  view: string;
  setView?: (setView: string) => void;
}

export function ViewToggle({view, setView} : ViewToggleProps) {

  return (
    <div className="flex items-center border rounded-md mx-6">
      <Button
        variant={view == 'grid' ? "outline" : "ghost"}
        size="sm"
        className="rounded-r-none"
        onClick={() => setView?.(view === 'grid' ? 'table' : 'grid')}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={view == 'table' ? "outline" : "ghost"}
        size="sm"
        className="rounded-l-none"
        onClick={() => setView?.(view === 'table' ? 'grid' : 'table')}
      >
        <Table2 className="h-4 w-4 mr-2" />
        Table
      </Button>
    </div>
  )
}