import SOCIAL_LINKS from "@constants/socialLinks";
import { MY_RESUME_URL } from "@constants/urls";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import type { ClickLocation } from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

const SOLID_SURFACE = "bg-ink text-white dark:bg-white dark:text-ink";

export function ResumeButton({
  onClick,
  location,
}: {
  onClick?: () => void;
  location: ClickLocation;
}) {
  return (
    <a
      href={MY_RESUME_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        onClick?.();
        trackEvent(ANALYTICS_EVENTS.resumeClick, { click_location: location });
      }}
      className={`group flex items-center justify-center rounded-full px-3.5 py-2.5 text-sm font-bold no-underline transition-colors duration-300 hover:bg-ink-soft dark:hover:bg-[#e2e2ea] max-lg:px-6 max-lg:py-3 max-lg:text-sm ${SOLID_SURFACE}`}
    >
      이력서 보기&nbsp;&nbsp;
    </a>
  );
}

export function SocialLinks({ location }: { location: ClickLocation }) {
  return (
    <div className="flex gap-1.5 max-lg:gap-2">
      {SOCIAL_LINKS.map(({ icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.socialClick, {
              label,
              click_location: location,
            })
          }
          className={`gradient-hover flex size-7.5 items-center justify-center rounded-full text-[12px] max-lg:size-9 max-lg:text-sm ${SOLID_SURFACE} motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-0.75 motion-safe:[&>svg]:transition-transform motion-safe:[&>svg]:duration-300 motion-safe:hover:[&>svg]:scale-[1.15]`}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
