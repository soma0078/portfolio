import { useState } from "react";
import { LuCheck, LuChevronDown, LuSearch, LuX } from "react-icons/lu";
import {
  PROJECT_FILTER_GROUPS,
  matchesProjectFilters,
  type ProjectFilters,
  type ProjectSummary,
} from "@constants/projects";

type FilterKey = keyof ProjectFilters;

interface ProjectFilterProps {
  // 구분 토글이 반영된 전체 목록. 옵션별 건수 계산에 쓴다
  items: ProjectSummary[];
  filters: ProjectFilters;
  stackQuery: string;
  onStackQueryChange: (value: string) => void;
  onChange: (key: FilterKey, value: string | null) => void;
  includeSide: boolean;
  onIncludeSideChange: (value: boolean) => void;
  onReset: () => void;
  total: number;
  matched: number;
}

const ALL_LABEL = "전체";
const ACCENT_TEXT = "text-[#b57328] dark:text-[#d9a05b]";

export default function ProjectFilter({
  items,
  filters,
  stackQuery,
  onStackQueryChange,
  onChange,
  includeSide,
  onIncludeSideChange,
  onReset,
  total,
  matched,
}: ProjectFilterProps) {
  // 모바일에서만 쓰는 접힘 상태. 데스크톱은 항상 펼쳐 있다
  const [open, setOpen] = useState(false);

  // 다른 그룹의 조건은 그대로 두고, 이 그룹에서 이 옵션 하나만 골랐을 때의 건수
  const countFor = (key: FilterKey, option: string) =>
    items.filter((project) =>
      matchesProjectFilters(
        project,
        { ...filters, [key]: [option] } as ProjectFilters,
        stackQuery,
      ),
    ).length;

  const activeChips = [
    ...PROJECT_FILTER_GROUPS.flatMap(({ key }) =>
      (filters[key] as string[]).map((value) => ({
        id: `${key}-${value}`,
        label: value,
        remove: () => onChange(key, value),
      })),
    ),
    ...(stackQuery.trim()
      ? [
          {
            id: "stack",
            label: `스택: ${stackQuery.trim()}`,
            remove: () => onStackQueryChange(""),
          },
        ]
      : []),
    ...(includeSide
      ? [{ id: "side", label: "사이드 프로젝트", remove: () => onIncludeSideChange(false) }]
      : []),
  ];
  const activeCount = activeChips.length;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-black/12 md:hidden dark:ring-white/20"
        >
          필터
          {activeCount > 0 && (
            <span className="rounded-full bg-ink px-1.5 text-xs text-white dark:bg-white dark:text-night">
              {activeCount}
            </span>
          )}
          <LuChevronDown
            aria-hidden
            className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <label className="ml-auto flex cursor-pointer items-center gap-2.5 text-sm text-[#4a4a55] dark:text-[#d2d2dc]">
          <input
            type="checkbox"
            checked={includeSide}
            onChange={(event) => onIncludeSideChange(event.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="flex size-4.5 items-center justify-center rounded-[4px] border border-black/12 bg-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#b57328]/40"
          >
            <LuCheck
              strokeWidth={3}
              className={`size-3 text-[#b57328] transition-opacity ${
                includeSide ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
          사이드 프로젝트 포함
        </label>
      </div>

      <div
        className={`${
          open ? "flex" : "hidden"
        } flex-col gap-4 rounded-[14px] border border-black/8 bg-white p-6 md:flex dark:border-white/10 dark:bg-white/5`}
      >
        {PROJECT_FILTER_GROUPS.map(({ key, label, options }) => {
          const selected = filters[key] as string[];
          const chips: (string | null)[] = [null, ...options];

          return (
            <div key={key} className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
              <span className="shrink-0 pt-1.5 text-[13px] font-medium tracking-[0.8px] text-quiet md:w-20">
                {label}
              </span>
              <div role="group" aria-label={label} className="flex flex-wrap gap-2">
                {chips.map((option) => {
                  // 전체는 아무것도 고르지 않았을 때, 나머지는 그 값이 포함됐을 때 켜진다
                  const active =
                    option === null ? selected.length === 0 : selected.includes(option);
                  const count = option === null ? null : countFor(key, option);
                  const disabled = count === 0 && !active;

                  return (
                    <button
                      key={option ?? ALL_LABEL}
                      type="button"
                      aria-pressed={active}
                      disabled={disabled}
                      onClick={() => onChange(key, option)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                        active
                          ? "bg-ink font-semibold text-white dark:bg-white dark:text-night"
                          : "text-muted ring-1 ring-black/12 hover:bg-surface dark:text-[#9a9ab0] dark:ring-white/20 dark:hover:bg-white/8"
                      }`}
                    >
                      {option ?? ALL_LABEL}
                      {count !== null && (
                        <span className="text-xs tabular-nums opacity-60">{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
          <label
            htmlFor="project-stack-search"
            className="shrink-0 pt-1.5 text-[13px] font-medium tracking-[0.8px] text-quiet md:w-20"
          >
            기술 스택
          </label>
          <div className="relative w-full md:max-w-80">
            <LuSearch
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-quiet"
            />
            <input
              id="project-stack-search"
              type="search"
              value={stackQuery}
              onChange={(event) => onStackQueryChange(event.target.value)}
              placeholder="예: React, TypeScript"
              autoComplete="off"
              className="w-full rounded-full bg-transparent py-1.5 pr-4 pl-10 text-sm text-ink ring-1 ring-black/12 outline-none transition-shadow placeholder:text-quiet focus-visible:ring-2 focus-visible:ring-[#b57328]/50 dark:text-white dark:ring-white/20"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm tracking-[0.4px]">
        {activeChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={chip.remove}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 font-medium text-ink ring-1 ring-black/8 dark:bg-white/8 dark:text-white dark:ring-white/10"
          >
            {chip.label}
            <LuX aria-label="조건 해제" className="size-3.5 text-quiet" />
          </button>
        ))}
        <span className="ml-auto text-quiet">
          {matched}건 / 전체 {total}건
        </span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className={`font-semibold hover:underline ${ACCENT_TEXT}`}
          >
            초기화
          </button>
        )}
      </div>
    </section>
  );
}
