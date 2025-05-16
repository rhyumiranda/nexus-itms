import { Card, CardContent } from "@/components/ui/card"

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center flex-col">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, Powerful Task Management in 3 Steps
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              nexus.sphere makes it easy to organize, track, and complete your tasks with a streamlined workflow.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
          <Card className="relative overflow-hidden border-0 shadow-lg">
            <div className="absolute top-0 left-0 h-2 w-full bg-primary" />
            <CardContent className="p-6 pt-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 text-xl font-bold">Create and Organize</h3>
              <p className="mt-2 text-muted-foreground">
                Quickly create tasks and organize them with priorities, due dates, and categories. Use the intuitive
                interface to structure your workflow.
              </p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-0 shadow-lg">
            <div className="absolute top-0 left-0 h-2 w-full bg-primary" />
            <CardContent className="p-6 pt-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 text-xl font-bold">Track</h3>
              <p className="mt-2 text-muted-foreground">
                Monitor progress with visual status indicators. Get real-time updates on task completion and deadlines.
              </p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-0 shadow-lg">
            <div className="absolute top-0 left-0 h-2 w-full bg-primary" />
            <CardContent className="p-6 pt-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 text-xl font-bold">Understand and Improve</h3>
              <p className="mt-2 text-muted-foreground">
                Understand your productivity patterns, identify bottlenecks, and
                continuously improve your workflow.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
