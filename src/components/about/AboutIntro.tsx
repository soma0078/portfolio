import { ABOUT_BIO, ABOUT_HERO } from "@constants/about";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";
import SectionHeader from "./SectionHeader";

function BioParagraph({ paragraph }: { paragraph: string }) {
  const sentenceEnd = paragraph.indexOf(". ");

  if (sentenceEnd === -1) return <p>{paragraph}</p>;

  return (
    <p>
      {paragraph.slice(0, sentenceEnd + 1)}
      <br />
      {paragraph.slice(sentenceEnd + 2)}
    </p>
  );
}

export default function AboutIntro() {
  return (
    <section
      className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X} flex flex-col gap-12`}
    >
      <SectionHeader title="How I Work" />

      <p className="flex flex-col gap-0.5 text-xl leading-7 font-bold tracking-[-0.4px] sm:text-[28px] sm:leading-10 sm:tracking-[-0.6px] lg:text-[40px] lg:leading-[57px] lg:tracking-[-1px]">
        {ABOUT_HERO.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5.5 leading-8 text-ink-soft dark:text-[#c7c7c7] *:leading-6">
          {ABOUT_BIO.map((paragraph) => (
            <BioParagraph
              key={paragraph.slice(0, 12)}
              paragraph={paragraph}
            />
          ))}
        </div>

        <span className="border-t-2 border-ink/30 pt-5.5 text-xs tracking-[0.6px] text-quiet dark:border-white/30"></span>
      </div>
    </section>
  );
}
