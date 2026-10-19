import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { work } from "@/lib/site";

export function WorkShowcase({ limit }: { limit?: number }) {
  const items = limit ? work.slice(0, limit) : work;

  return (
    <div className="grid grid-cols-1 items-stretch gap-x-6 gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.name} className="h-full">
          <WorkCard
            {...item}
            index={String(i + 1).padStart(2, "0")}
            priority={i === 0}
          />
        </Reveal>
      ))}
    </div>
  );
}
