interface Props {
  count?: number;
}

export function MovieGridSkeleton({ count = 6 }: Props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div
            className="rounded-xl"
            style={{ aspectRatio: '2/3', background: 'var(--color-surface-2)' }}
          />
          <div
            className="mt-2 h-3 w-3/4 rounded"
            style={{ background: 'var(--color-surface-2)' }}
          />
          <div
            className="mt-1 h-2.5 w-1/3 rounded"
            style={{ background: 'var(--color-surface-2)' }}
          />
        </div>
      ))}
    </div>
  );
}
