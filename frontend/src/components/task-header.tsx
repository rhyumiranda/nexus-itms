import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Bell, Search } from "lucide-react";

export default function TaskHeader() {
  return (
    <div>
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <SidebarTrigger />
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-full pl-8 bg-background"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </header>
    </div>
  );
}
