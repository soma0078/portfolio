import type { ShotItem } from "@constants/projectDetails";
import type { GalleryEntry } from "@constants/publishing";

function Spec({ shot }: { shot: ShotItem }) {
  if (!shot.fonts && !shot.colors) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {shot.fonts && (
        <div className="flex flex-col gap-3">
          <span className="text-xs tracking-[1.4px] text-white/45">
            TYPEFACE
          </span>
          <div className="flex flex-col gap-2.5">
            {shot.fonts.map((font) => (
              <span key={font.name} className="flex items-baseline gap-2.5">
                <b className="text-lg font-semibold tracking-[-0.2px] text-white">
                  {font.name}
                </b>
                {font.role && (
                  <span className="text-xs tracking-[1px] text-white/45">
                    {font.role}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {shot.colors && (
        <div className="flex flex-col gap-3">
          <span className="text-xs tracking-[1.4px] text-white/45">COLOR</span>
          <div className="flex flex-wrap gap-3">
            {shot.colors.map((color) => (
              <span key={color.hex} className="flex flex-col gap-1.5">
                <span
                  className="h-11 w-16 rounded-lg ring-1 ring-white/20"
                  style={{ backgroundColor: color.hex }}
                />
                <code className="text-xs tracking-[0.4px] text-white uppercase">
                  {color.hex}
                </code>
                <span className="text-xs tracking-[0.8px] text-white/45">
                  {color.role}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Reserved({ item }: { item: GalleryEntry }) {
  return (
    <div className="flex flex-col gap-7 pb-4">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="text-2xl font-bold tracking-[-0.4px] text-white">
          {item.year ? `${item.year}년 작업` : "작업"}
        </h3>
        <span className="text-xs tracking-[1.2px] text-white/45">
          솔라디자인 · 퍼블리싱
        </span>
      </div>

      <img
        src={item.src}
        alt={item.year ? `${item.year}년 작업 보드` : "작업 보드"}
        loading="lazy"
        className="w-full max-w-[520px] rounded-xl bg-white/6"
      />

      <div className="flex flex-col gap-3">
        <span className="text-xs tracking-[1.4px] text-white/45">준비 중</span>
        <div className="flex flex-col gap-2.5 rounded-xl border border-dashed border-white/20 px-5 py-6">
          {["TYPEFACE", "COLOR", "FULL PAGE"].map((label) => (
            <span
              key={label}
              className="text-sm tracking-[0.6px] text-white/35"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CaseSheet({ item }: { item: GalleryEntry }) {
  const shot = item.shot;
  if (!shot) return <Reserved item={item} />;

  return (
    <div className="flex flex-col gap-7 pb-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h3 className="text-2xl font-bold tracking-[-0.4px] text-white">
            {shot.name}
          </h3>
          <span className="text-xs tracking-[1.2px] text-white/45">
            {shot.note}
          </span>

          {shot.href && (
            <a
              href={shot.href}
              target="_blank"
              rel="noreferrer noopener"
              className="ml-auto rounded-full bg-white px-4 py-2 text-sm font-bold text-ink transition-colors duration-300 hover:bg-[#e2e2ea]"
            >
              사이트 보기 ↗
            </a>
          )}
        </div>

        {shot.summary && (
          <p className="text-base leading-7 text-white/75">
            {shot.summary}
          </p>
        )}
      </div>

      <Spec shot={shot} />

      <div className="flex flex-col gap-2.5">
        <span className="text-xs tracking-[1.4px] text-white/45">
          FULL PAGE
        </span>
        <img
          src={shot.src}
          alt={`${shot.name} 전체 페이지`}
          loading="lazy"
          className="w-full rounded-xl bg-white/6"
        />
      </div>
    </div>
  );
}
