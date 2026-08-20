export default function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-(image:--primary-gradient) px-5 py-2 text-[#cecece]">
      <span>{text}</span>
    </span>
  );
}
