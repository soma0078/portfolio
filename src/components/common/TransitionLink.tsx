import { Link, type LinkProps } from "react-router-dom";
import useTransitionNavigate from "@hooks/useTransitionNavigate";
import { isModifiedClick } from "src/utils/viewTransition";

export default function TransitionLink({
  to,
  onClick,
  target,
  ...rest
}: LinkProps) {
  const go = useTransitionNavigate();

  return (
    <Link
      to={to}
      target={target}
      {...rest}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || target || isModifiedClick(event)) return;

        event.preventDefault();
        go(to);
      }}
    />
  );
}
