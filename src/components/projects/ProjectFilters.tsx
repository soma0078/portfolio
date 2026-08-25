import {
  countProjects,
  PROJECT_FILTERS,
  type ProjectFilterKey,
} from "@constants/projects";

const CHIP =
  "cursor-pointer rounded-full px-4 py-2 font-mono text-xs font-medium tracking-[1.2px] transition-colors duration-300";

const CHIP_ACTIVE = "bg-ink text-white dark:bg-white dark:text-ink";

const CHIP_IDLE = [
  "text-muted ring-1 ring-black/10 hover:text-ink",
  "dark:text-[#9a9ab0] dark:ring-white/15 dark:hover:text-white",
].join(" ");

interface ProjectFiltersProps {
  value: ProjectFilterKey;
  onChange: (key: ProjectFilterKey) => void;
}

export default function ProjectFilters({
  value,
  onChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {PROJECT_FILTERS.map(({ key, label }) => {
        const count = countProjects(key);
        if (count === 0) return null;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={value === key}
            className={`${CHIP} ${value === key ? CHIP_ACTIVE : CHIP_IDLE}`}
          >
            {label} {count}
          </button>
        );
      })}
    </div>
  );
}
