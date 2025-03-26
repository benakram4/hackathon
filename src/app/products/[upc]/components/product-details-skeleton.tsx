import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailsSkeleton() {
	return (
		<div className="container mx-auto p-6">
			<div className="grid gap-8 md:grid-cols-2">
				<Skeleton className="aspect-square w-full rounded-lg" />
				<div className="flex flex-col space-y-4">
					<Skeleton className="h-10 w-3/4" />
					<Skeleton className="h-8 w-1/4" />
					<div className="space-y-2">
						<Skeleton className="h-6 w-1/6" />
						<Skeleton className="h-5 w-1/3" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-6 w-1/4" />
						<Skeleton className="h-20 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-6 w-1/5" />
						<div className="space-y-2">
							<Skeleton className="h-5 w-2/3" />
							<Skeleton className="h-5 w-1/2" />
							<Skeleton className="h-5 w-3/5" />
						</div>
					</div>
					<Skeleton className="h-10 w-1/3" />
				</div>
			</div>
		</div>
	);
}
