import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { work } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Editorial showcase: the first project runs full width, the rest sit in a
 * two-column grid whose right column is offset so the eye travels down the
 * page instead of reading a flat grid.
 */
export function WorkShowcase({ limit }: { limit?: number }) {
  const items = limit ? work.slice(0, limit) : work;
  const [first, ...rest] = items;

  return (
    <div className="space-y-14 md:space-y-20">
      {first ? (
        <Reveal>
          <WorkCard {...first} index="01" featured />
        </Reveal>
      ) : null}
      {rest.length ? (
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-12">
          {rest.map((item, i) => (
            <Reveal
              key={item.name}
              delay={(i % 2) * 90}
              className={cn(i % 2 === 1 && "md:mt-20")}
            >
              <WorkCard {...item} index={String(i + 2).padStart(2, "0")} />
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );
}
