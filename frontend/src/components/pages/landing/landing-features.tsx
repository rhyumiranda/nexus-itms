import { BarChart3, Bell, CheckCircle2, LayoutDashboard, Table2, Users2 } from "lucide-react"

export function LandingFeatures() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex justify-center items-center flex-col">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need to Manage Tasks Effectively
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              nexus.sphere combines powerful features with an intuitive interface to help you stay organized and productive.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <div className="grid gap-4 text-center sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Intuitive Dashboard</h3>
            </div>
            <p className="text-muted-foreground">
              Get a clear overview of all your tasks with our customizable dashboard. See what&apos;s due, in progress, and
              completed at a glance.
            </p>
          </div>
          <div className="grid gap-4 text-center sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Table2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Multiple Views</h3>
            </div>
            <p className="text-muted-foreground">
              Switch between card and table views to visualize your tasks in the way that works best for your workflow.
            </p>
          </div>
          <div className="grid gap-4 text-center sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bell className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Progress Tracking</h3>
            </div>
            <p className="text-muted-foreground">
              Stay on top of your productivity by seeing which tasks are completed and what&apos;s still pending.
            </p>
          </div>
          <div className="grid gap-4 text-center sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Mobile-Ready Experience</h3>
            </div>
            <p className="text-muted-foreground">
              Access and manage your tasks anytime, anywhere — fully responsive for phones, tablets, and desktops.
            </p>
          </div>
          <div className="grid gap-4 text-center sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Fast & Lightweight Platform</h3>
            </div>
            <p className="text-muted-foreground">
              Built for speed so your experience stays smooth on top of React ecosystem arhictecture.
            </p>
          </div>
          <div className="grid gap-4 text-center sm:text-left">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Priority Management</h3>
            </div>
            <p className="text-muted-foreground">
              Easily prioritize tasks with visual indicators. Focus on what matters most and ensure high-priority items
              get completed first.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
