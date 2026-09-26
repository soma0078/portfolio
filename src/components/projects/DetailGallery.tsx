import { useMemo, useState } from "react";
import type { ShotItem } from "@constants/projectDetails";
import { PUB_WORKS, PUB_YEARS, type GalleryEntry } from "@constants/publishing";
import CircularGallery, { WorkCard } from "./CircularGallery";
import GalleryLightbox from "./GalleryLightbox";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

type YearFilter = "all" | (typeof PUB_YEARS)[number];

const CHIP = [
  "rounded-full px-4 py-2 text-xs font-medium tracking-[1px]",
  "transition-colors duration-300",
].join(" ");

export default function DetailGallery({ shots }: { shots: ShotItem[] }) {
  const [opened, setOpened] = useState<number | null>(null);
  const [year, setYear] = useState<YearFilter>("all");
  const [expanded, setExpanded] = useState(false);

  const all = useMemo<GalleryEntry[]>(
    () =>
      PUB_WORKS.map((work) => ({
        ...work,
        shot: work.caseName
          ? shots.find((item) => item.name === work.caseName)
          : undefined,
      })),
    [shots],
  );

  const items = useMemo(
    () => (year === "all" ? all : all.filter((item) => item.year === year)),
    [all, year],
  );

  const pick = (next: YearFilter) => {
    trackEvent(ANALYTICS_EVENTS.galleryFilterClick, {
      filter: next,
      click_location: CLICK_LOCATIONS.projectGallery,
    });
    setYear(next);
    setOpened(null);
  };

  const move = (step: number) =>
    setOpened((current) => {
      if (current === null) return current;
      return Math.min(Math.max(current + step, 0), items.length - 1);
    });

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2">
          {(["all", ...PUB_YEARS] as YearFilter[]).map((key) => {
            const on = year === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => pick(key)}
                aria-pressed={on}
                className={`${CHIP} ${
                  on
                    ? "bg-ink text-white dark:bg-white dark:text-ink"
                    : "text-muted ring-1 ring-black/12 hover:bg-surface dark:text-[#9a9ab0] dark:ring-white/20 dark:hover:bg-white/8"
                }`}
              >
                {key === "all" ? "ALL" : key}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              trackEvent(ANALYTICS_EVENTS.galleryViewToggle, {
                state: expanded ? "collapse" : "expand",
                click_location: CLICK_LOCATIONS.projectGallery,
              });
              setExpanded((open) => !open);
            }}
            aria-expanded={expanded}
            className="ml-auto text-sm font-semibold text-[#b57328] dark:text-[#d9a05b]"
          >
            <span className="link-underline">
              {expanded ? "접기" : "펼쳐서 보기"}
            </span>
          </button>
        </div>

        {expanded ? (
          <ul className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    trackEvent(ANALYTICS_EVENTS.galleryCardClick, {
                      item_id: item.id,
                      item_name: item.shot?.name ?? String(item.year ?? ""),
                      click_location: CLICK_LOCATIONS.projectGalleryGrid,
                    });
                    setOpened(index);
                  }}
                  className="w-full cursor-pointer"
                >
                  <WorkCard item={item} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <CircularGallery
            key={year}
            items={items}
            onPick={(index) => setOpened(index)}
          />
        )}
      </div>

      {opened !== null && items[opened] && (
        <GalleryLightbox
          items={items}
          index={opened}
          onMove={move}
          onClose={() => setOpened(null)}
        />
      )}
    </>
  );
}
