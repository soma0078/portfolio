import { Outlet } from "react-router-dom";
import gsap, { ScrollTrigger, TextPlugin, ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Footer from "@components/layout/Footer";

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollSmoother);

export default function Layout() {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      smoothTouch: 0.1,
      effects: false,
    });

    return () => {
      smoother?.kill();
    };
  }, []);

  return (
    <>
      <div id="smooth-wrapper">
        <div id="smooth-content" className="pl-0 lg:pl-(--sidebar-width)">
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
