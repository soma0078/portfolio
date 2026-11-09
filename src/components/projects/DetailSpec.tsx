import type { SpecSheet } from "@constants/projectDetails";

interface SpecItem {
  label: string;
  value: string;
}

export default function DetailSpec({ spec }: { spec: SpecSheet }) {
  const items: SpecItem[] = [
    { label: "개발 기간", value: spec.duration },
    { label: "역할", value: spec.role },
    { label: "투입 인원", value: spec.headcount ?? "" },
    { label: spec.featureLabel ?? "주요 기능", value: spec.feature ?? "" },
  ].filter((item) => item.value !== "");

  return (
    <dl className="grid w-full grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3.5">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2.5 rounded-2xl bg-surface px-4 py-7 text-center dark:bg-white/5"
        >
          <dt className="text-sm text-quiet">{label}</dt>
          <dd className="text-base font-medium text-ink dark:text-white">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
