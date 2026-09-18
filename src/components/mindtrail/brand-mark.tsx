export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" aria-label="MindTrail">
      <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <span className="h-4 w-2 rotate-12 rounded-[50%] border-2 border-current" />
        <span className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-warm" />
      </span>
      {!compact && <span className="font-display text-xl font-semibold">MindTrail</span>}
    </div>
  );
}