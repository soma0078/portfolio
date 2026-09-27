interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h2 className="text-2xl font-extrabold tracking-[-0.6px] lg:text-[32px]">
      {title}
    </h2>
  );
}
