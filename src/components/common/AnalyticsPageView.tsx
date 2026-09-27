import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "src/utils/analytics";

export default function AnalyticsPageView() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}
