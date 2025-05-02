import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  user: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  createdAt: Date;
}

interface SectionCardsProps {
  tasks: Task[];
}

export function SectionCards({ tasks }: SectionCardsProps) {
  let totalTask = tasks.length;
  let notStartedTasks = tasks.filter(
    (task) => task.status === "Not Started"
  ).length;
  let inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;
  let completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Tasks</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalTask}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              0.00%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Overall task creation trend this period
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Not Started</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {notStartedTasks}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              0.00%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Pending tasks to be initiated
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>In Progress</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {inProgressTasks}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              0.00%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Tasks currently in progress this period
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Completed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {completedTasks}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              0.00%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Tasks marked as completed this period
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
