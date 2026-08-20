import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import HOME_INTRO from "@constants/homeIntro";
import { MY_BLOG_URL } from "@constants/urls";

const HEADLINE = ["빠른 구현을 넘어", "구조와 지표로", "완성합니다"];

export default function HomeLeft() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduced) return;

          const tl = gsap.timeline({
            delay: HOME_INTRO.left,
            defaults: { ease: "power3.out", duration: 0.6 },
          });

          tl.from(".js-kicker", { opacity: 0, y: 12 }, 0)
            .from(
              ".js-line",
              { yPercent: 115, duration: 0.75, stagger: 0.09 },
              0.2,
            )
            .from(
              ".js-rule",
              { scaleX: 0, transformOrigin: "left center", duration: 0.5 },
              0.85,
            )
            .from(".js-intro", { opacity: 0, y: 14 }, 1)
            .from(".js-link", { opacity: 0, y: 10 }, 1.15)
            .from(".js-now", { opacity: 0, y: 14 }, 1.35);

          gsap.to(".js-now-ping", {
            scale: 2.6,
            opacity: 0,
            duration: 1.8,
            ease: "power1.out",
            repeat: -1,
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="flex w-120 max-w-full shrink-0 flex-col justify-between gap-10 xl:h-dvh xl:gap-0 xl:px-11 xl:pt-16 xl:pb-14"
    >
      <div className="flex flex-col gap-5 lg:gap-7">
        <p className="js-kicker font-mono text-[10.5px] tracking-[2px] text-quiet">
          PORTFOLIO · 2026
        </p>

        <h1 className="flex flex-col gap-0.5">
          {HEADLINE.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="js-line block text-[32px] leading-11 font-extrabold tracking-[-1px] lg:text-[42px] lg:leading-[57px] lg:tracking-[-1.4px]">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <span className="js-rule block h-0.5 w-18 bg-ink dark:bg-white" />

        <div className="flex flex-col items-start gap-3">
          <p className="js-intro text-[14.5px] leading-6.75 text-ink-soft dark:text-[#c7c7c7]">
            React와 Next.js를 기반으로 서비스를 빠르게 빌드합니다. 코드 작성의
            수고를 덜어낸 만큼, 화면 뒤의 데이터 구조를 단단하게 설계하고 배포
            이후 실제 사용자 환경의 지표를 검증하며 서비스의 안정성을
            높여갑니다.
          </p>

          <a
            href={MY_BLOG_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="js-link group inline-flex w-fit items-center gap-1.5 text-xs font-medium text-quiet transition-colors duration-300"
          >
            Core Web Vitals 개선 기록 보기{" "}
            <span className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all">
              ↗
            </span>
          </a>
        </div>
      </div>

      <div className="js-now flex flex-col gap-2.25 border-t border-black/10 pt-5 dark:border-white/10">
        <span className="flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="js-now-ping absolute inset-0 rounded-full bg-folder-experience" />
            <span className="relative size-1.5 rounded-full bg-folder-experience" />
          </span>
          <span className="font-mono text-[9.5px] tracking-[1.4px] text-quiet">
            OPEN TO WORK
          </span>
        </span>
        <span className="text-[13.5px] font-medium">
          프론트엔드 개발자 · 새로운 팀을 찾는 중입니다
        </span>
      </div>
    </section>
  );
}
