import TaskDetails from "@/components/task-details";

export default async function TaskPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/records/tasks/read/${id}`);
  const data = await response.json();

  if (!data.success || !data.task) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold">Task not found</h1>
        <p className="text-muted-foreground">The task you are looking for does not exist.</p>
      </div>
    );
  }
  
  return <TaskDetails task={data.task}/>;
}
