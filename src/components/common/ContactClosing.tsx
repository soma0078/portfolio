import { MY_EMAIL, MY_GITHUB_URL } from "@constants/urls";

const BUTTON = "rounded-full px-5 py-3 text-sm font-bold";

export default function ContactClosing() {
  return (
    <section className="flex flex-col items-start gap-5.5 pt-12">
      <h2 className="text-xl font-bold tracking-[-0.4px] lg:text-2xl">
        더 궁금한 것이 있다면
      </h2>

      <p className="text-base leading-7 text-muted dark:text-[#9a9aae]">
        작업 과정이나 코드에 대해 편하게 물어봐 주세요.
      </p>

      <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
        <a
          href={`mailto:${MY_EMAIL}`}
          className={`${BUTTON} bg-ink text-white transition-colors duration-300 hover:bg-ink-soft dark:bg-white dark:text-ink dark:hover:bg-[#e2e2ea]`}
        >
          이메일 보내기
        </a>

        <a
          href={MY_GITHUB_URL}
          target="_blank"
          rel="noreferrer noopener"
          className={`${BUTTON} ring-1 ring-black/12 transition-colors duration-300 hover:bg-surface dark:ring-white/20 dark:hover:bg-white/8`}
        >
          GitHub ↗
        </a>
      </div>
    </section>
  );
}
