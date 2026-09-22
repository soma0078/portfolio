import { useLocation } from "react-router-dom";
import gsap, { ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import SmoothScroll from "@components/layout/SmoothScroll";
import AboutIntro from "@components/about/AboutIntro";
import AboutExperience from "@components/about/AboutExperience";
import AboutSkills from "@components/about/AboutSkills";
import AboutLogs from "@components/about/AboutLogs";
import ContactClosing from "@components/common/ContactClosing";
import { PAGE_GUTTER_X, PAGE_MAX_WIDTH } from "@constants/layout";

export default function AboutPage() {
  const { hash } = useLocation();

  useGSAP(
    () => {
      const id = hash.slice(1);
      if (!id) return;

      const jump = () => {
        const target = document.getElementById(id);
        if (!target) return;
        const y = target.getBoundingClientRect().top + window.scrollY - 24;

        const smoother = ScrollSmoother.get();
        if (smoother) smoother.scrollTop(y);
        else window.scrollTo(0, y);
      };

      const settle = gsap.delayedCall(0.35, jump);
      return () => settle.kill();
    },
    { dependencies: [hash] },
  );

  return (
    <SmoothScroll>
      <div className="min-h-dvh w-full overflow-x-hidden bg-white pb-30  text-ink lg:pl-(--sidebar-width) dark:bg-night dark:text-white">
        <main className="flex flex-col gap-25 pt-24 lg:gap-35 lg:pt-19">
          <AboutIntro />
          <AboutExperience />
          <AboutSkills />
          <AboutLogs />

          <div className={`${PAGE_MAX_WIDTH} ${PAGE_GUTTER_X}`}>
            <ContactClosing />
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
