import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollSmoother } from "gsap/all";

// BrowserRouter는 화면을 바꿔도 window 스크롤을 그대로 두므로 경로가 바뀌면 맨 위로 올린다.
// 새 페이지가 이전 위치로 한 번 그려졌다가 튀지 않도록 그리기 전에 맞춘다
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    ScrollSmoother.get()?.scrollTo(0);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
