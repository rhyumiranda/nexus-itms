import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingCta() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t flex justify-center items-center flex-col ">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Join the move and upskill your task management.<br/>Stay Organized, focused, and productive.
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of teams who use nexus.sphere to stay organized, focused, and productive.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href="/auth/login">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
