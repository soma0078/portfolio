import { FEATURED_POST, POSTS } from "@constants/about";
import { MY_BLOG_URL } from "@constants/urls";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";
import SectionHeader from "./SectionHeader";

const BLOG_HOST = MY_BLOG_URL.replace(/^https?:\/\//, "");

const ACCENT = "bg-[#b57328] dark:bg-[#d9a05b]";

export default function AboutLogs() {
  return (
    <section
      id="personal"
      className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X} flex flex-col gap-11`}
    >
      <SectionHeader title="Personal" />
      <a
        href={FEATURED_POST.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex flex-col items-start gap-4"
      >
        <span className="text-sm text-muted dark:text-[#9a9aae]">
          {FEATURED_POST.date} · {FEATURED_POST.tag}
        </span>

        <h3 className="text-2xl leading-9 font-bold tracking-[-0.5px] lg:text-[32px] lg:leading-11">
          <span className="link-underline">{FEATURED_POST.title}</span>
        </h3>

        <p className="max-w-[760px] text-base leading-7 text-[#6b6b78] dark:text-[#9a9aae]">
          {FEATURED_POST.excerpt}
        </p>
      </a>

      <span className="block h-px w-full bg-black/8 dark:bg-white/10" />

      <ul className="flex w-full flex-col">
        {POSTS.map((post, index) => (
          <li
            key={post.href}
            className={
              index < POSTS.length - 1
                ? "border-b border-black/8 dark:border-white/10"
                : ""
            }
          >
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-stretch gap-4 py-5 lg:gap-6"
            >
              <span
                className={`w-[3px] shrink-0 origin-top scale-y-0 rounded-full transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100 ${ACCENT}`}
              />

              <div className="flex flex-1 flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-base font-medium">
                    <span className="link-underline">{post.title}</span>
                  </span>
                  <span className="shrink-0 text-sm text-quiet">
                    {post.date}
                  </span>
                </div>

                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-2 text-sm leading-6 text-muted dark:text-[#9a9aae]">
                      <span className="text-quiet">{post.tag}</span>{" "}
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex w-full items-center justify-between gap-4 pt-2">
        <span className="text-sm text-quiet">{BLOG_HOST}</span>
        <a
          href={MY_BLOG_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="group text-sm font-semibold"
        >
          <span className="link-underline">전체 글 보기</span>
        </a>
      </div>
    </section>
  );
}
