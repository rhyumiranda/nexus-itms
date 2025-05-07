import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion, Home } from "lucide-react"

export default function TaskNotFound() {
  return (
    <div className="mx-auto container flex items-center justify-center min-h-screen p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-muted p-6">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Task Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground pb-6">
          <p className="mb-2">Check that you have the correct task ID or try searching for the task. The task you&apos;re looking for doesn&apos;t exist or may have been deleted.</p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className=" w-full">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
