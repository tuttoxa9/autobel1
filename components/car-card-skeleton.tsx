import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CarCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="relative">
        <Skeleton className="w-full h-48" />
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
