import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function LandingHero() {
  return (
    <section className="w-full flex justify-center items-center flex-col py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -inset-[100%] animate-[wobble_20s_ease-in-out_infinite] opacity-70">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-indigo-500/40 blur-[120px]" />
            <div className="absolute top-1/3 -translate-y-1/2 left-1/3 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40 blur-[120px]" />
            <div className="absolute top-2/3 -translate-y-1/2 left-2/3 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-pink-500/40 via-indigo-500/40 to-purple-500/40 blur-[120px]" />
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Manage Tasks Effortlessly, Boost Productivity
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Nexus helps teams organize, track, and complete tasks with powerful analytics and timely reminders.
                Stay on top of deadlines and never miss a beat.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-primary" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-primary" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative aspect-video overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm md:w-full lg:order-last">
              <Image
                src="/images/Dashboard.png"
                width={850}
                height={550}
                alt="TaskFlow Dashboard Preview"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 md:to-background/0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
