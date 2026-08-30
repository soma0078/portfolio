import { flushSync } from "react-dom";
import { useNavigate, type To } from "react-router-dom";
import { withViewTransition } from "src/utils/viewTransition";

export default function useTransitionNavigate() {
  const navigate = useNavigate();

  return (to: To) => {
    withViewTransition(() => flushSync(() => navigate(to)));
  };
}
