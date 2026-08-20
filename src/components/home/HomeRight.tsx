import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FolderContent from "./FolderContents";
import FOLDERS, {
  FOLDER_HEADINGS,
  FOLDER_HEIGHT,
  FOLDER_WIDTH,
  STACKED_POSITION,
  STAGE_HEIGHT,
  STAGE_WIDTH,
  TAB_HEIGHT,
  TAB_SHAPE,
  TAB_WIDTH,
  type FolderId,
} from "./folders";
import HOME_INTRO from "@constants/homeIntro";

function useStageFit() {
  const measure = () => {
    const compact = window.matchMedia(COMPACT_QUERY).matches;

    return {
      compact,
      scale: compact
        ? Math.min(1, (window.innerWidth - PAGE_GUTTER) / FOLDER_WIDTH)
        : null,
    };
  };

  const [fit, setFit] = useState(measure);

  useEffect(() => {
    const handleResize = () => setFit(measure());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return fit;
}

const COMPACT_QUERY = "(max-width: 1023px)";

const PAGE_GUTTER = 40;

const ACTIVE_Z = 10;

const SETTLE_EASE = "back.out(1.4)";
const SETTLE_DURATION = 0.6;

export default function HomeRight() {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const folderRefs = useRef<Partial<Record<FolderId, HTMLDivElement | null>>>(
    {},
  );
  const prevExpandedRef = useRef<boolean | null>(null);
  const prevActiveRef = useRef<FolderId | null>(null);

  const { compact, scale } = useStageFit();
  const [activeId, setActiveId] = useState<FolderId>("about");
  const [expanded, setExpanded] = useState(false);
  const [introDone, setIntroDone] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const stageWidth = compact ? FOLDER_WIDTH : STAGE_WIDTH;
  const stageHeight = compact ? FOLDER_HEIGHT : STAGE_HEIGHT;
  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const moved =
        prevExpandedRef.current !== null &&
        prevExpandedRef.current !== expanded &&
        !reduced;
      prevExpandedRef.current = expanded;

      FOLDERS.forEach((folder, index) => {
        const element = folderRefs.current[folder.id];
        if (!element) return;

        const position = compact
          ? { x: 0, y: 0 }
          : expanded
            ? folder.spread
            : STACKED_POSITION;

        if (!moved) {
          gsap.set(element, position);
          return;
        }

        gsap.to(element, {
          ...position,
          duration: SETTLE_DURATION,
          ease: SETTLE_EASE,
          delay: (expanded ? index : FOLDERS.length - 1 - index) * 0.05,
        });
      });
    },
    { scope: stageRef, dependencies: [expanded, compact] },
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (compact) {
        gsap.from(Object.values(folderRefs.current), {
          opacity: 0,
          y: 14,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          delay: HOME_INTRO.folders,
        });
        return;
      }

      setIntroDone(false);

      FOLDERS.forEach((folder, index) => {
        const element = folderRefs.current[folder.id];
        if (!element) return;

        gsap.set(element, folder.spread);
        gsap.from(element, {
          opacity: 0,
          yPercent: 8,
          duration: 0.7,
          ease: "power3.out",
          delay: HOME_INTRO.folders + index * 0.08,
        });
        gsap.to(element, {
          ...STACKED_POSITION,
          duration: SETTLE_DURATION,
          ease: SETTLE_EASE,
          delay:
            HOME_INTRO.foldersCollapse + (FOLDERS.length - 1 - index) * 0.05,
          onComplete: index === 0 ? () => setIntroDone(true) : undefined,
        });
      });
    },
    { scope: stageRef },
  );

  useGSAP(
    () => {
      const changed =
        prevActiveRef.current !== null && prevActiveRef.current !== activeId;
      prevActiveRef.current = activeId;
      if (!changed) return;

      const element = folderRefs.current[activeId];
      if (!element) return;

      gsap.fromTo(
        element,
        { scale: 0.97 },
        { scale: 1, duration: 0.5, ease: "back.out(2.2)" },
      );
    },
    { scope: stageRef, dependencies: [activeId] },
  );

  const handleFolderClick = (id: FolderId) => {
    setActiveId(id);
    if (!compact) setExpanded((prev) => !prev);
  };

  return (
    <div
      ref={rootRef}
      className="flex shrink-0 items-center [--stage-scale:1]"
      style={
        scale === null
          ? undefined
          : ({ "--stage-scale": scale } as CSSProperties)
      }
    >
      <div
        className="flex flex-col gap-4 lg:gap-6"
        style={{ width: `calc(${stageWidth}px * var(--stage-scale))` }}
      >
        <div
          className="relative shrink-0"
          style={{
            width: `calc(${stageWidth}px * var(--stage-scale))`,
            height: `calc(${stageHeight}px * var(--stage-scale))`,
          }}
        >
          <div
            ref={stageRef}
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: stageWidth,
              height: stageHeight,
              transform: "scale(var(--stage-scale))",
            }}
          >
            {FOLDERS.map((folder) => {
              const active = folder.id === activeId;
              const shape = TAB_SHAPE[folder.tab.shape];
              const showContent =
                active || (!compact && (expanded || !introDone));

              return (
                <div
                  key={folder.id}
                  ref={(element) => {
                    folderRefs.current[folder.id] = element;
                  }}
                  className="pointer-events-none absolute left-0 top-0"
                  style={{
                    width: FOLDER_WIDTH,
                    height: FOLDER_HEIGHT,
                    zIndex: active ? ACTIVE_Z : folder.baseZ,
                  }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={active && expanded}
                    aria-label={`${folder.label} 폴더`}
                    onClick={() => handleFolderClick(folder.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleFolderClick(folder.id);
                      }
                    }}
                    className={`relative size-full cursor-pointer transition-transform duration-300 *:pointer-events-auto ${
                      expanded ? "hover:-translate-y-1.5" : ""
                    } pointer-events-none`}
                  >
                    <svg
                      viewBox={shape.viewBox}
                      preserveAspectRatio="none"
                      aria-hidden
                      className="absolute top-0 overflow-visible"
                      style={{
                        left: folder.tab.left,
                        width: TAB_WIDTH,
                        height: TAB_HEIGHT,
                        transform: folder.tab.mirrored
                          ? "scaleX(-1)"
                          : undefined,
                      }}
                    >
                      <path d={shape.d} fill={folder.color} />
                    </svg>

                    <span
                      className="absolute top-[12.6px] text-sm"
                      style={{
                        left: folder.tab.labelLeft,
                        color: folder.labelColor,
                      }}
                    >
                      {folder.label}
                    </span>

                    <div
                      className="absolute left-0 top-[36.9px] h-[295.3px] w-[396.83px] rounded-3xl"
                      style={{ backgroundColor: folder.color }}
                    />

                    {showContent && (
                      <div className="absolute left-6 top-[61px] flex h-[247px] w-[349px] flex-col gap-3.5 overflow-hidden">
                        <FolderContent
                          id={folder.id}
                          header={
                            <div className="group flex w-full shrink-0 items-center justify-between">
                              <span
                                className="text-base font-bold tracking-[0.2px]"
                                style={{ color: folder.labelColor }}
                              >
                                {FOLDER_HEADINGS[folder.id]}
                              </span>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  navigate(folder.href);
                                }}
                                aria-label={`${FOLDER_HEADINGS[folder.id]} 페이지로 이동`}
                                className="text-xl leading-none transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                style={{ color: folder.labelColor }}
                              >
                                ↗
                              </button>
                            </div>
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p
          className={`flex items-center gap-2.5 transition-opacity duration-300 ${
            expanded || !introDone ? "opacity-0" : "opacity-100"
          }`}
          style={{
            paddingLeft: compact
              ? 0
              : `calc(${STACKED_POSITION.x}px * var(--stage-scale))`,
          }}
          aria-hidden={expanded || !introDone}
        >
          <span className="text-sm font-semibold text-quiet">↑</span>
          <span className="font-mono text-xs font-medium tracking-[0.8px] text-quiet">
            {compact
              ? "탭을 누르면 폴더가 바뀌어요"
              : "탭을 누르면 폴더가 펼쳐져요"}
          </span>
        </p>
      </div>
    </div>
  );
}
