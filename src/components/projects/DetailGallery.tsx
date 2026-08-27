import { useState } from "react";
import type { ShotItem } from "@constants/projectDetails";
import GalleryLightbox from "./GalleryLightbox";

export default function DetailGallery({ shots }: { shots: ShotItem[] }) {
  const [opened, setOpened] = useState<number | null>(null);

  const move = (step: number) =>
    setOpened((current) => {
      if (current === null) return current;
      return Math.min(Math.max(current + step, 0), shots.length - 1);
    });

  return (
    <>
      <ul className="grid w-full gap-x-5 gap-y-6.5 pt-1.5 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((shot, index) => (
          <li key={shot.src} className="flex flex-col gap-3.5">
            <div className="group relative overflow-hidden rounded-[10px] bg-surface dark:bg-white/5">
              <button
                type="button"
                onClick={() => setOpened(index)}
                aria-label={`${shot.name} 화면 크게 보기`}
                className="block w-full cursor-pointer"
              >
                <img
                  src={shot.src}
                  alt={`${shot.name} 화면`}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </button>

              {shot.summary && (
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-3 bg-ink/78 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                  <p className="line-clamp-3 text-sm leading-6 text-white/90">
                    {shot.summary}
                  </p>
                  {shot.href && (
                    <a
                      href={shot.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="pointer-events-auto w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-ink transition-colors duration-300 hover:bg-[#e2e2ea]"
                    >
                      사이트 보기 ↗
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-bold">{shot.name}</span>
              <span className="text-xs tracking-[0.8px] text-[#9a9488] dark:text-[#8a8a9a]">
                {shot.note}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {opened !== null && (
        <GalleryLightbox
          shots={shots}
          index={opened}
          onMove={move}
          onClose={() => setOpened(null)}
        />
      )}
    </>
  );
}
