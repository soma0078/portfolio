import { MY_EMAIL } from "@constants/urls";
import ANALYTICS_EVENTS from "@constants/analyticsEvents";
import CLICK_LOCATIONS from "@constants/clickLocations";
import { trackEvent } from "src/utils/analytics";

const BUTTON = "rounded-full px-5 py-3 text-sm font-bold";

export default function ContactClosing() {
  return (
    <section className="flex flex-col items-start gap-5.5 pt-12">
      <p className="text-2xl leading-9 tracking-[-0.5px] lg:text-[32px] lg:leading-11">
        사용자에게 필요한 경험을 고민하고<br/>더 나은 방법을 함께 찾아갑니다.
      </p>

      <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
        <a
          href={`mailto:${MY_EMAIL}`}
          onClick={() =>
            // 어바웃과 프로젝트 목록 하단에 같이 쓰여서 어느 페이지에서 눌렀는지 함께 보낸다
            trackEvent(ANALYTICS_EVENTS.contactClick, {
              method: "email",
              page_path: window.location.pathname,
              click_location: CLICK_LOCATIONS.footer,
            })
          }
          className={`${BUTTON} bg-ink text-white transition-colors duration-300 hover:bg-ink-soft dark:bg-white dark:text-ink dark:hover:bg-[#e2e2ea]`}
        >
         협업 문의하기
        </a>
      </div>
    </section>
  );
}
