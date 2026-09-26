import ANALYTICS_EVENTS, {
  type AnalyticsEventName,
} from "@constants/analyticsEvents";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean>;

export function trackEvent(
  action: AnalyticsEventName,
  params?: AnalyticsParams,
) {
  window.gtag?.("event", action, params);
}

export function trackPageView(path: string, title?: string) {
  window.gtag?.("event", ANALYTICS_EVENTS.pageView, {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}
