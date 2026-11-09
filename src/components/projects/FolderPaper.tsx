import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

export type PaperState = "closed" | "out" | "center";

// 문서 크기와 위치 조절 값
const OUT_WIDTH_RATIO = 0.8; // 폴더 카드 너비 대비 튀어나온 문서 너비
const OUT_ASPECT = 5 / 4; // 튀어나온 문서의 세로/가로 비율
// 정보 요소 윗선 위로 올라오는 문서 높이 비율. 1이면 문서 전체가 올라와 보인다
const OUT_VISIBLE_RATIO = 1;
// 시작 위치: 문서 높이의 이 비율만큼 정보 요소 윗선 아래에 숨어 있다
const START_DEPTH_RATIO = 0.25;
const CENTER_WIDTH = 800; // 가운데 보기 문서 너비(px)
const CENTER_MAX_HEIGHT_RATIO = 0.9; // 가운데 보기 최대 높이(화면 높이 대비)

interface FolderPaperProps {
  src: string;
  alt: string;
  state: PaperState;
  cardRef: RefObject<HTMLElement>;
  // 문서가 이 요소의 윗선 위로만 올라온다(정보 영역)
  boundaryRef: RefObject<HTMLElement>;
  onPaperClick: () => void;
  onBackdropClick: () => void;
}

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// 문서 크기는 카드 너비로 정한다. 움직이는 동안에는 바뀌지 않고 위치만 옮긴다
const outSize = (cardWidth: number) => {
  const width = cardWidth * OUT_WIDTH_RATIO;
  return { width, height: width * OUT_ASPECT };
};

// 문서의 가로 위치: 카드 가운데
const outX = (card: DOMRect, width: number) => card.left + (card.width - width) / 2;

// 세로 위치: t=0이면 정보 뒤에 숨은 자리, t=1이면 정보 윗선 위에 올라온 자리
const outY = (boundary: DOMRect, height: number, t: number) =>
  lerp(
    boundary.top + height * START_DEPTH_RATIO,
    boundary.top - height * OUT_VISIBLE_RATIO,
    t,
  );

// 정보 윗선 아래로 내려간 부분은 가려서, 문서가 정보 뒤에서 올라오는 것처럼 보이게 한다
const setClip = (paper: HTMLElement, hidden: number) => {
  paper.style.clipPath = hidden > 0 ? `inset(0px 0px ${hidden}px 0px)` : "none";
};

// 가운데에 있던 문서를 카드 위 자리(t=1)로 내린다. 끝나면 onDone을 부른다
const slideToRaised = (
  paper: HTMLElement,
  card: HTMLElement,
  boundary: HTMLElement,
  duration: number,
  onDone: () => void,
) => {
  const cardRect = card.getBoundingClientRect();
  const boundaryRect = boundary.getBoundingClientRect();
  const { width, height } = outSize(cardRect.width);
  gsap.to(paper, {
    x: outX(cardRect, width),
    y: outY(boundaryRect, height, 1),
    width,
    height,
    opacity: 1,
    duration: duration * 0.35,
    ease: "power2.inOut",
    onUpdate: () => {
      const b = boundary.getBoundingClientRect();
      setClip(paper, gsap.getProperty(paper, "y") as number + height - b.top);
    },
    onComplete: onDone,
  });
};

// 폴더 카드에서 꺼내지는 문서. 화면 위에 올라가야 해서 body에 포털로 붙인다
export default function FolderPaper({
  src,
  alt,
  state,
  cardRef,
  boundaryRef,
  onPaperClick,
  onBackdropClick,
}: FolderPaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // 카드 안(0)에서 카드 위(1)까지의 진행도
  const progressRef = useRef({ t: 0 });
  // follow: 카드 기준으로 위치를 잡는다 / manual: 가운데 보기처럼 직접 움직인다
  const modeRef = useRef<"follow" | "manual">("follow");
  // 마지막으로 적용한 값. 바뀐 경우에만 스타일을 쓴다
  const lastKeyRef = useRef("");
  // 닫힘 애니메이션이 끝날 때까지 문서를 유지한다
  const [visible, setVisible] = useState(false);

  if (state !== "closed" && !visible) setVisible(true);
  const rendered = state !== "closed" || visible;

  useLayoutEffect(() => {
    const paper = paperRef.current;
    const card = cardRef.current;
    const boundaryEl = boundaryRef.current;
    if (!rendered || !paper || !card || !boundaryEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0 : 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const ratio = imgRef.current?.naturalWidth
      ? imgRef.current.naturalHeight / imgRef.current.naturalWidth
      : 1.5;

    gsap.killTweensOf([paper, progressRef.current]);

    if (state === "out") {
      // 가운데에서 돌아온 경우: 올라오는 모션 없이 가운데 문서가 카드 위 자리로 줄어든다
      if (modeRef.current === "manual") {
        progressRef.current.t = 1;
        lastKeyRef.current = "";
        slideToRaised(paper, card, boundaryEl, duration, () => {
          modeRef.current = "follow";
          lastKeyRef.current = "";
        });
        return;
      }
      // 닫힌 상태에서 올라오는 경우: 정보 뒤에서 위로 올라온다
      modeRef.current = "follow";
      lastKeyRef.current = "";
      progressRef.current.t = 0;
      const { width, height } = outSize(card.getBoundingClientRect().width);
      gsap.set(paper, { width, height, left: 0, top: 0 });
      gsap.to(progressRef.current, { t: 1, duration:0.4, ease: "power2.out" });
    } else if (state === "center") {
      modeRef.current = "manual";
      setClip(paper, 0);
      // 화면 가운데에 1200px 너비로 보이는 자리. 세로가 넘치면 문서 안에서 스크롤한다
      const centerWidth = Math.min(CENTER_WIDTH, vw - 48);
      const centerHeight = Math.min(vh * CENTER_MAX_HEIGHT_RATIO, centerWidth * ratio);
      gsap.to(paper, {
        x: (vw - centerWidth) / 2,
        y: (vh - centerHeight) / 2,
        width: centerWidth,
        height: centerHeight,
        opacity: 1,
        duration: duration * 0.7,
        ease: "power3.inOut",
      });
    } else {
      // 가운데에서 닫는 경우 먼저 카드 위 자리로 돌아간 뒤 카드 안으로 들어간다
      const fromCenter = modeRef.current === "manual";
      modeRef.current = "manual";

      const retract = () => {
        modeRef.current = "follow";
        lastKeyRef.current = "";
        gsap.to(progressRef.current, {
          t: 0,
          duration: duration * 0.5,
          ease: "power2.in",
          onComplete: () => setVisible(false),
        });
      };

      if (fromCenter) {
        slideToRaised(paper, card, boundaryEl, duration, retract);
      } else {
        retract();
      }
    }
    // rendered는 열릴 때 한 번 바뀌므로 state 변화에만 반응한다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, rendered]);

  // 튀어나온 동안 카드 위치를 따라간다. 위치나 진행도가 그대로면 아무 것도 쓰지 않는다
  useEffect(() => {
    const paper = paperRef.current;
    const card = cardRef.current;
    const boundaryEl = boundaryRef.current;
    if (!paper || !card || !boundaryEl) return;

    const tick = () => {
      if (modeRef.current !== "follow") return;
      const cardRect = card.getBoundingClientRect();
      const boundaryRect = boundaryEl.getBoundingClientRect();
      const t = progressRef.current.t;
      const key = `${cardRect.left},${cardRect.width},${boundaryRect.top},${t}`;
      if (key === lastKeyRef.current) return;
      lastKeyRef.current = key;

      const { width, height } = outSize(cardRect.width);
      const y = outY(boundaryRect, height, t);
      gsap.set(paper, {
        x: outX(cardRect, width),
        y,
        opacity: clamp01(t),
      });
      setClip(paper, y + height - boundaryRect.top);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [cardRef, boundaryRef, rendered]);

  // 열려 있는 동안 Esc로 닫는다
  useEffect(() => {
    if (state === "closed") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onBackdropClick();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, onBackdropClick]);

  if (!rendered) return null;

  return createPortal(
    <>
      <div
        onClick={onBackdropClick}
        className="fixed inset-0 z-1000 bg-black/55 transition-opacity duration-300"
        style={{
          opacity: state === "center" ? 1 : 0,
          pointerEvents: state === "center" ? "auto" : "none",
        }}
      />
      <div
        ref={paperRef}
        onClick={onPaperClick}
        role="button"
        aria-label={`${alt} 크게 보기`}
        // 문서 위에서는 클릭 없이도 휠로 스크롤되고, 스크롤이 뒤 페이지로 넘어가지 않게 막는다
        className="fixed z-1001 cursor-pointer overflow-y-auto overscroll-contain bg-white shadow-[0_-5px_10px_rgba(0,0,0,0.1)]"
        style={{ left: 0, top: 0, width: 0, height: 0, opacity: 0 }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="eager"
          draggable={false}
          className="block h-auto w-full"
        />
      </div>
    </>,
    document.body,
  );
}
