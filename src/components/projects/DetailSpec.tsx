import type { SpecSheet } from "@constants/projectDetails";

export default function DetailSpec({ spec }: { spec: SpecSheet }) {
  const items = [
    { label: "ROLE", lines: [spec.role] },
    { label: "PERIOD", lines: [spec.period] },
    { label: "TYPE", lines: [spec.type] },
    { label: "STACK", lines: spec.stack },
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-7 border-t-2 border-ink pt-6.5 lg:grid-cols-4 dark:border-white">
      {items.map(({ label, lines }) => (
        <div key={label} className="flex flex-col gap-2.5">
          <span className=" text-xs tracking-[1.4px] text-quiet">{label}</span>
          <p className="text-sm leading-6 font-medium">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}
