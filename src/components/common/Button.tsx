import { Link } from "react-router-dom";

interface ButtonProps {
  type?: "button" | "link";
  to?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const BUTTON_STYLE = [
  "relative z-0 inline-block overflow-hidden rounded-[40px] border border-(--legacy-text)",
  "px-5 py-2.5 text-sm font-medium text-(--legacy-text) no-underline transition-all duration-600",
  "hover:text-white",
  "before:absolute before:bottom-[-50%] before:left-1/2 before:-z-10 before:h-0 before:w-0",
  "before:-translate-x-1/2 before:rounded-full before:bg-[image:var(--primary-gradient)]",
  "before:transition-all before:duration-600 before:content-['']",
  "after:absolute after:bottom-[-50%] after:left-1/2 after:-z-10 after:h-0 after:w-0",
  "after:-translate-x-1/2 after:rounded-full after:bg-[image:var(--primary-gradient)]",
  "after:transition-all after:duration-600 after:content-['']",
  "hover:before:h-[200%] hover:before:w-[110%]",
  "hover:after:h-[240%] hover:after:w-[140%] hover:after:opacity-50",
].join(" ");

function Button({
  type = "button",
  to = "",
  children,
  className,
  onClick,
  ...rest
}: ButtonProps) {
  const merged = `${BUTTON_STYLE} ${className ?? ""}`;

  if (type === "link") {
    return (
      <Link to={to} className={merged}>
        {children}
      </Link>
    );
  }

  return (
    <button className={merged} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
