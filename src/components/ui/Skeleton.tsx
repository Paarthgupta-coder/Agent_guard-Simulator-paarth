import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("rounded-lg bg-white/[0.06] animate-pulse", className)} />;
}

export function ScoreCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 flex flex-col items-center gap-3">
      <Skeleton className="w-36 h-36 rounded-full" />
      <Skeleton className="w-20 h-3" />
    </div>
  );
}

export function CardListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 space-y-3">
          <Skeleton className="w-2/3 h-4" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-1/2 h-3" />
          <div className="grid grid-cols-3 gap-2 pt-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
