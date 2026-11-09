import type { StackItem } from "@constants/projectDetails";

interface DetailStackProps {
  stack: StackItem[];
}

export default function DetailStack({ stack }: DetailStackProps) {
  return (
    <section className="flex w-full flex-col gap-5.5">
      <span className=" text-sm tracking-[1px] text-quiet">TECH STACK</span>
      <h2 className="text-2xl leading-9 font-semibold tracking-[-0.5px] lg:text-[28px] lg:leading-9">
        기술 스택
      </h2>
      <ul className="flex flex-wrap gap-2.5">
        {stack.map((tech) => (
          <li
            key={tech.name}
            className="rounded-md bg-[#b57328]/10 px-3.5 py-2 text-sm font-medium text-[#8a5a1f] dark:bg-[#d9a05b]/15 dark:text-[#d9a05b]"
          >
            {tech.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
