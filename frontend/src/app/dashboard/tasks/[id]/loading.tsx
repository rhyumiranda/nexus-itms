import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Skeleton className="w-full h-[40px]"/>

        <Skeleton className="w-full h-[350px] mt-4"/>
      </div>
    </div>

  )
}