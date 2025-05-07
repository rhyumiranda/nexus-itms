import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuoteIcon } from "lucide-react"

export function LandingTestimonials() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center flex-col">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Trusted by Thousands of Teams Worldwide
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our customers have to say about how Nexus has transformed their productivity.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 xl:gap-10">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <QuoteIcon className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-lg">
                  "Nexus has completely transformed how our team manages projects. The analytics dashboard gives me
                  instant visibility into our progress, and the reminders feature ensures we never miss a deadline. It's
                  become an essential part of our daily workflow."
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Michael Chen" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Michael Chen</h3>
                  <p className="text-sm text-muted-foreground">Engineering Lead, InnovateCo</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <QuoteIcon className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-lg">
                  "As an engineering lead managing multiple projects, Nexus has been a game-changer. The ability to
                  switch between card and table views helps me organize tasks in different ways depending on the
                  context. My team's productivity has increased by at least 30%."
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Emily Rodriguez" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Emily Rodriguez</h3>
                  <p className="text-sm text-muted-foreground">Freelance Designer</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <QuoteIcon className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-lg">
                  "As a freelancer juggling multiple clients, I needed a system to keep track of all my projects and
                  deadlines. Nexus is intuitive, visually appealing, and helps me prioritize my work effectively. The
                  reminders feature has saved me from missing important deadlines countless times."
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="David Kim" />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">David Kim</h3>
                  <p className="text-sm text-muted-foreground">Operations Director, GlobalRetail</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                <QuoteIcon className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-lg">
                  "Our operations team manages hundreds of tasks daily across multiple departments. Nexus's
                  organization system and analytics have given us unprecedented clarity into our workflow. The ability
                  to categorize and prioritize tasks has streamlined our entire operation."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
