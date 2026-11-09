import { LuLayoutGrid, LuList } from "react-icons/lu";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

export type ProjectView = "list" | "card";

const OPTIONS: { value: ProjectView; label: string; Icon: typeof LuList }[] = [
  { value: "list", label: "리스트형 보기", Icon: LuList },
  { value: "card", label: "카드형 보기", Icon: LuLayoutGrid },
];

interface ProjectViewToggleProps {
  value: ProjectView;
  onChange: (view: ProjectView) => void;
}

export default function ProjectViewToggle({
  value,
  onChange,
}: ProjectViewToggleProps) {
  return (
    <div role="group" aria-label="목록 보기 방식" className="flex shrink-0 gap-1.5">
      {OPTIONS.map(({ value: option, label, Icon }) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            aria-label={label}
            aria-pressed={active}
            title={label}
            onClick={() => {
              // 이미 선택된 보기를 다시 누른 건 전환이 아니라서 보내지 않는다
              if (!active) {
                trackEvent(ANALYTICS_EVENTS.projectViewToggle, {
                  view: option,
                  click_location: CLICK_LOCATIONS.projectList,
                });
              }
              onChange(option);
            }}
            className={`flex size-9 items-center justify-center rounded-lg border transition-colors ${
              active
                ? "border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-night"
                : "border-black/10 text-[#9a9488] hover:bg-[#f6f3ef] dark:border-white/10 dark:text-[#8a8a9a] dark:hover:bg-white/8"
            }`}
          >
            <Icon className="size-4.5" aria-hidden />
          </button>
        );
      })}
    </div>
  );
}
