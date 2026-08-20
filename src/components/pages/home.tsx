import HomeLeft from "@components/home/HomeLeft";
import HomeRight from "@components/home/HomeRight";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center-safe gap-10 overflow-x-hidden bg-white px-5 pt-20 pb-12 font-sans text-ink lg:pt-8 lg:pr-10 lg:pl-[calc(var(--sidebar-width)+2.5rem)] xl:flex-row xl:gap-16 xl:py-0 dark:bg-night dark:text-white">
      <HomeLeft />
      <HomeRight />
    </div>
  );
}
