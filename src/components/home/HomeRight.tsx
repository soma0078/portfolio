import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import useTransitionNavigate from "@hooks/useTransitionNavigate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import FolderContent from "./FolderContents";
import FOLDERS, {
  FOLDER_HEADINGS,
  MAX_SPREAD_X,
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
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

function useStageFit(rootRef: RefObject<HTMLDivElement | null>) {
  const measure = useCallback(() => {
    const compact = window.matchMedia(COMPACT_QUERY).matches;

    const target = FOLDER_TARGET_WIDTH / FOLDER_WIDTH;

    if (compact) {
      const scale = Math.min(
        target,
        (window.innerWidth - PAGE_GUTTER) / FOLDER_WIDTH,
      );

      return {
        compact,
        scale,
        expandedScale: scale,
        spreadFit: 1,
        room: Infinity,
      };
    }

    const root = rootRef.current;
    const row = root?.parentElement;
    const hero = root?.previousElementSibling;

    if (!root || !row || !hero)
      return {
        compact,
        scale: 1,
        expandedScale: 1,
        spreadFit: 1,
        room: Infinity,
      };

    const style = getComputedStyle(row);

    if (style.flexDirection !== "row") {
      const room =
        row.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight) -
        STAGE_EDGE;
      const scale = Math.min(target, room / STAGE_WIDTH);

      return { compact, scale, expandedScale: scale, spreadFit: 1, room };
    }

    const available =
      row.clientWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight) -
      hero.getBoundingClientRect().width -
      (parseFloat(style.columnGap) || 0) -
      STAGE_EDGE;

    const byStage = available / STAGE_WIDTH;
    const byCard = available / FOLDER_WIDTH;
    const byHeight = (window.innerHeight - STAGE_VERTICAL_ROOM) / STAGE_HEIGHT;

    const wanted = Math.max(target, byStage);

    const scale = Math.min(wanted, byCard, byHeight, STAGE_MAX_SCALE);

    const spreadRoom =
      row.clientWidth -
      parseFloat(style.paddingLeft) -
      hero.getBoundingClientRect().width -
      (parseFloat(style.columnGap) || 0) -
      STAGE_EDGE;

    const expandedScale = Math.max(
      1,
      Math.min(scale, spreadRoom / STAGE_WIDTH),
    );

    const spreadFit = Math.min(
      1,
      Math.max(
        MIN_SPREAD_FIT,
        (spreadRoom / expandedScale - FOLDER_WIDTH) / MAX_SPREAD_X,
      ),
    );

    return { compact, scale, expandedScale, spreadFit, room: spreadRoom };
  }, [rootRef]);

  const [fit, setFit] = useState(measure);

  useEffect(() => {
    const remeasure = () => setFit(measure());

    remeasure();

    window.addEventListener("resize", remeasure);
    return () => window.removeEventListener("resize", remeasure);
  }, [measure]);

  return fit;
}

const COMPACT_QUERY = "(max-width: 1023px)";

const PAGE_GUTTER = 40;

const STAGE_EDGE = 24;

const MIN_SPREAD_FIT = 0.45;

const STAGE_VERTICAL_ROOM = 160;

const FOLDER_TARGET_WIDTH = 480;

const STAGE_MAX_SCALE = 1.5;
const ACTIVE_Z = 10;

const SETTLE_EASE = "back.out(1.4)";
const SETTLE_DURATION = 0.6;

function spreadPosition(
  spread: { x: number; y: number },
  fit: number,
  headroom: number,
) {
  const fanned = FOLDER_WIDTH + MAX_SPREAD_X * fit;

  return {
    x: alignInStage(fanned, headroom) + spread.x * fit,
    y: spread.y,
  };
}

function alignInStage(width: number, headroom: number) {
  return Math.min((STAGE_WIDTH - width) / 2, Math.max(0, headroom - width));
}

export default function HomeRight() {
  const navigate = useTransitionNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const folderRefs = useRef<Partial<Record<FolderId, HTMLDivElement | null>>>(
    {},
  );

  const prevExpandedRef = useRef<boolean | null>(null);
  const prevActiveRef = useRef<FolderId | null>(null);

  const { compact, scale, expandedScale, spreadFit, room } =
    useStageFit(rootRef);
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

      if (!compact && !introDone) return;

      FOLDERS.forEach((folder, index) => {
        const element = folderRefs.current[folder.id];
        if (!element) return;

        const position = compact
          ? { x: 0, y: 0 }
          : expanded
            ? spreadPosition(folder.spread, spreadFit, room / expandedScale)
            : {
                ...STACKED_POSITION,
                x: alignInStage(FOLDER_WIDTH, room / scale),
              };

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
    {
      scope: stageRef,
      dependencies: [expanded, compact, spreadFit, room, introDone],
    },
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

        gsap.set(
          element,
          spreadPosition(folder.spread, spreadFit, room / expandedScale),
        );
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
    trackEvent(ANALYTICS_EVENTS.folderClick, {
      folder_id: id,
      click_location: CLICK_LOCATIONS.home,
    });
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
            className="absolute left-0 top-0 origin-top-left transition-transform duration-600 ease-out"
            style={{
              width: stageWidth,
              height: stageHeight,
              transform: `scale(${expanded && !compact ? expandedScale : scale})`,
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
                      className="absolute top-[12.6px] text-sm font-twayfly"
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
                                className="text-base font-bold tracking-[0.2px] font-twayfly"
                                style={{ color: folder.labelColor }}
                              >
                                {FOLDER_HEADINGS[folder.id]}
                              </span>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  trackEvent(ANALYTICS_EVENTS.folderNavClick, {
                                    folder_id: folder.id,
                                    target: folder.href,
                                    click_location: CLICK_LOCATIONS.home,
                                  });
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
          <span className=" text-xs font-medium tracking-[0.8px] text-quiet">
            {compact
              ? "탭을 누르면 폴더가 바뀌어요"
              : "탭을 누르면 폴더가 펼쳐져요"}
          </span>
        </p>
      </div>
    </div>
  );
}
