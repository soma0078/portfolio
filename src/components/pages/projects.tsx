import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useQueryStates } from "nuqs";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import SmoothScroll from "@components/layout/SmoothScroll";
import ProjectRow from "@components/projects/ProjectRow";
import ProjectCard from "@components/projects/ProjectCard";
import ProjectViewToggle, {
  type ProjectView,
} from "@components/projects/ProjectViewToggle";
import ProjectFilter from "@components/projects/ProjectFilter";
import type { PaperState } from "@components/projects/FolderPaper";
import ContactClosing from "@components/common/ContactClosing";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";
import {
  LIST_ITEMS,
  matchesProjectFilters,
  toggleProjectFilter,
  type ProjectFilters,
} from "@constants/projects";
import {
  projectListParsers,
  projectListUrlKeys,
  saveProjectListSearch,
  serializeProjectListQuery,
} from "src/utils/projectListParams";

const PROJECT_VIEW_STORAGE_KEY = "projects-view";

function readStoredView(): ProjectView {
  try {
    const stored = window.sessionStorage.getItem(PROJECT_VIEW_STORAGE_KEY);
    return stored === "card" ? "card" : "list";
  } catch {
    return "list";
  }
}

gsap.registerPlugin(Flip);

// 필터가 바뀌면 살아남는 항목이 새 자리로 부드럽게 옮겨 간다
const FLIP_TARGET = ".js-project-item";

export default function ProjectPage() {
  const mainRef = useRef<HTMLElement>(null);
  const [view, setViewState] = useState<ProjectView>(readStoredView);

  const setView = (next: ProjectView) => {
    setViewState(next);
    try {
      window.sessionStorage.setItem(PROJECT_VIEW_STORAGE_KEY, next);
    } catch {
      // 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서는 보기 값만 유지한다.
    }
  };
  // nuqs는 set 시점에 내부 React 상태를 동기 갱신하므로 flushSync와 Flip이 그대로 동작한다.
  // startTransition을 넘기면 이 동기성이 깨진다
  const [query, setQuery] = useQueryStates(projectListParsers, {
    urlKeys: projectListUrlKeys,
    history: "replace",
    scroll: false,
  });
  const { platform, workType, involvement, stackQuery, includeSide } = query;

  // 상세 페이지에서 돌아올 때 같은 필터로 열 수 있도록 마지막 필터를 기억한다
  useEffect(() => {
    saveProjectListSearch(serializeProjectListQuery(query));
  }, [query]);
  const filters = useMemo<ProjectFilters>(
    () => ({ platform, workType, involvement }),
    [platform, workType, involvement],
  );

  // 열린 폴더는 한 번에 하나만. 다른 카드를 열면 이전 문서는 자동으로 들어간다
  const [folder, setFolder] = useState<{ id: number; state: PaperState } | null>(null);

  const scoped = useMemo(
    () =>
      LIST_ITEMS.filter((project) => includeSide || project.group === "work"),
    [includeSide],
  );
  const filtered = useMemo(
    () => scoped.filter((project) => matchesProjectFilters(project, filters, stackQuery)),
    [scoped, filters, stackQuery],
  );

  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null);

  // 바꾸기 전 위치를 기록하고, 동기 렌더 뒤 useLayoutEffect에서 Flip으로 이어 붙인다
  const runWithFlip = (change: () => void) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      change();
      return;
    }
    flipStateRef.current = Flip.getState(FLIP_TARGET);
    flushSync(change);
  };

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    if (!state) return;
    flipStateRef.current = null;

    Flip.from(state, {
      duration: 0.5,
      ease: "power2.out",
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        ),
    });
  }, [filtered]);

  const handleFilterChange = (key: keyof ProjectFilters, value: string | null) =>
    runWithFlip(() => {
      setQuery((prev) =>
        toggleProjectFilter(
          { platform: prev.platform, workType: prev.workType, involvement: prev.involvement },
          key,
          value,
        ),
      );
    });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".js-project-row, .js-project-card", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
      });
    },
    { scope: mainRef },
  );

  return (
    <SmoothScroll>
      <div className="min-h-dvh w-full overflow-x-hidden bg-white pb-30  text-sm lg:text-base text-ink lg:pl-(--sidebar-width) dark:bg-night dark:text-white">
        <main
          ref={mainRef}
          className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X} flex flex-col gap-16 pt-24 lg:pt-19`}
        >
          <h1 className="text-2xl font-bold tracking-[-0.6px] lg:text-[32px]">
            Projects
          </h1>

          <ProjectFilter
            items={scoped}
            filters={filters}
            stackQuery={stackQuery}
            onStackQueryChange={(value) =>
              runWithFlip(() => {
                setQuery({ stackQuery: value });
              })
            }
            onChange={handleFilterChange}
            includeSide={includeSide}
            onIncludeSideChange={(value) =>
              runWithFlip(() => {
                setQuery({ includeSide: value });
              })
            }
            onReset={() =>
              runWithFlip(() => {
                setQuery(null);
              })
            }
            total={scoped.length}
            matched={filtered.length}
          />

        <div>
          <div className="flex justify-end">
            <ProjectViewToggle value={view} onChange={setView} />
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-[#9a9488] dark:text-[#8a8a9a]">
              조건에 맞는 프로젝트가 없습니다.
            </p>
          ) : view === "list" ? (
            <ul className="flex flex-col">
              {filtered.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  open={folder?.id === project.id}
                  onOpenChange={(next) =>
                    setFolder(next ? { id: project.id, state: "center" } : null)
                  }
                />
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 pt-12">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  paperState={folder?.id === project.id ? folder.state : "closed"}
                  onPaperStateChange={(next) =>
                    setFolder(next === "closed" ? null : { id: project.id, state: next })
                  }
                />
              ))}
            </ul>
          )}
        </div>

          <ContactClosing />
        </main>
      </div>
    </SmoothScroll>
  );
}
