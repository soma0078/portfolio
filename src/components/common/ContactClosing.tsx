import { MY_EMAIL } from "@constants/urls";

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
          className={`${BUTTON} bg-ink text-white transition-colors duration-300 hover:bg-ink-soft dark:bg-white dark:text-ink dark:hover:bg-[#e2e2ea]`}
        >
         협업 문의하기
        </a>
      </div>
    </section>
  );
}
