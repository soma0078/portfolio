interface TechTagsProps {
  stack: string[];
  className?: string;
}

export default function TechTags({ stack, className = "" }: TechTagsProps) {
  return (
    <p className={`text-xs text-quiet ${className}`}>
      {stack.join(" · ")}
    </p>
  );
}
