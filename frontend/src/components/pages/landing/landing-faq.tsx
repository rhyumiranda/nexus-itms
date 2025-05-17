import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function LandingFaq() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex justify-center items-center flex-col">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about nexu.sphere.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl space-y-8 py-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I change plans later?</AccordionTrigger>
              <AccordionContent>
                Yes, you can upgrade, downgrade, or cancel your plan at any time. When upgrading, you&apos;ll get immediate
                access to the new features. When downgrading, the changes will take effect at the start of your next
                billing cycle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is there a limit to how many tasks I can create?</AccordionTrigger>
              <AccordionContent>
                No, all of our plans include unlimited tasks. You can create as many tasks as you need to manage your
                projects effectively without worrying about hitting any limits.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How does team collaboration work?</AccordionTrigger>
              <AccordionContent>
                nexu.sphere makes collaboration easy. You can assign tasks to team members, share project boards, leave
                comments, and track everyone&apos;s progress. Team members will receive notifications about their assignments
                and any updates to tasks they&apos;re involved with.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I integrate nexu.sphere with other tools?</AccordionTrigger>
              <AccordionContent>
                Yes, nexu.sphere.sphere integrates with popular tools like Slack, Google Calendar, Microsoft Teams, and more. Our
                Professional and Enterprise plans include access to our API for custom integrations with your existing
                workflow.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                Absolutely. We take security seriously. nexu.sphere uses industry-standard encryption for all data, both in
                transit and at rest. We perform regular security audits and our Enterprise plan includes advanced
                security features like SSO and custom data retention policies.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
