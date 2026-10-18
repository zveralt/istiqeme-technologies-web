import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/WorkCard";
import { work } from "@/lib/site";

/**
 * Agency-style showcase: first project full width, the rest in a two-column grid.
 * `limit` trims the list for the homepage; the /work page shows everything.
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
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {rest.map((item, i) => (
            <Reveal key={item.name} delay={(i % 2) * 70}>
              <WorkCard {...item} index={String(i + 2).padStart(2, "0")} />
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );
}
