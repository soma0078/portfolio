import { useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import styled, { css, keyframes } from "styled-components";
import { data } from "src/assets/data";
import { Project } from "src/type/types";
import devices from "@constants/devices";
import GalleryPopover from "@components/common/GalleryPopover";
import Button from "@components/common/Button";
import { BsArrowDown } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

/** 카드를 고정해둘 화면 상단 여백 (px) */
const STICKY_OFFSET = 40;
/** 이미지 영역 안쪽 여백과 눈 버튼 크기 (px) — 눈의 기본 위치 계산에 함께 쓴다 */
const IMAGE_PADDING = 32;
const EYE_SIZE = 56;
/**
 * 눈 중심을 커서에서 대각선으로 이만큼 떨어뜨린다 (각 축 px).
 * 0이면 눈 중심이 커서와 정확히 겹쳐 커서 화살표가 눈 한가운데를 찌르는
 * 모양이 된다. 커서보다 살짝 오른쪽 아래에서 따라오도록 간격을 둔다.
 */
const EYE_CURSOR_OFFSET = 28;
/** 놓았을 때 다음/이전으로 넘길지 가르는 드래그 거리 (px) */
const SWIPE_THRESHOLD = 60;
/** 이보다 적게 움직이면 탭으로 보고 팝오버를 연다 */
const SWIPE_TAP_THRESHOLD = 10;

/**
 * 뷰포트에 따라 부드럽게 변하는 타이포 스케일.
 *
 * clamp(최소, 기준rem + 가변vw, 최대) 형태라 320px에서 최소값, 1280px에서
 * 최대값에 도달하고 그 사이는 선형으로 이어진다. 브레이크포인트마다 크기가
 * 툭 끊기지 않고, 태블릿처럼 어중간한 폭에서도 항상 읽기 좋은 크기가 된다.
 *
 * vw만 쓰면 브라우저 확대/축소나 사용자 기본 글꼴 설정을 무시하게 되므로,
 * rem을 함께 더해 접근성 설정이 그대로 반영되도록 한다.
 */
const FONT = {
  /** 프로젝트명 — 화면에서 가장 큰 타이틀 (28 → 40px) */
  display: "clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem)",
  /** 아코디언 묶음 제목 (18 → 24px) */
  heading: "clamp(1.125rem, 1rem + 0.625vw, 1.5rem)",
  /** 아코디언 항목 제목, 하단 버튼 라벨 (15 → 18px) */
  title: "clamp(0.9375rem, 0.875rem + 0.3125vw, 1.125rem)",
  /** 본문 (14 → 16px) */
  body: "clamp(0.875rem, 0.833rem + 0.208vw, 1rem)",
  /** 태그·캡션 (12 → 13px) */
  caption: "clamp(0.75rem, 0.729rem + 0.104vw, 0.8125rem)",
};

const CATEGORY_LABEL: Record<Project["category"], string> = {
  team: "Team Project",
  personal: "Side Project",
  work: "Publishing",
};

type AccordionItem = {
  title: string;
  body: string[];
};

type AccordionGroup = {
  label: string;
  items: AccordionItem[];
};

const toArray = (value: string | string[]) =>
  Array.isArray(value) ? value : [value];

/**
 * 카테고리에 따라 노출할 묶음이 달라진다.
 * work(퍼블리싱)은 타입상 task·troubleShooting이 없어 MVP만 보여준다.
 */
function buildGroups(project: Project): AccordionGroup[] {
  const groups: AccordionGroup[] = [
    {
      label: "핵심 기능",
      items: [
        {
          title: project.feature.title,
          body: toArray(project.feature.description),
        },
      ],
    },
  ];

  if (project.category === "work") return groups;

  if (project.task.length > 0) {
    groups.push({
      label: "담당 작업 / 구현한 기능",
      items: project.task.map((item) => ({
        title: item.title,
        body: item.description,
      })),
    });
  }

  groups.push({
    label: "트러블슈팅",
    items: [
      {
        title: project.troubleShooting.title,
        body: project.troubleShooting.description,
      },
    ],
  });

  return groups;
}

const Page = styled.div`
  color: ${({ theme }) => theme.textColor};
`;

/*
 * 좌측 카드와 우측 아코디언을 4:6으로 나눠 화면 너비를 채운다.
 *
 * flex 대신 grid를 쓰는 이유: 카드에 ScrollTrigger 핀이 걸리면 GSAP이 카드를
 * .pin-spacer로 감싸고 측정한 폭을 px로 박아넣는다(ScrollTrigger.js의 spacerStyle).
 * 자식이 비율을 들고 있으면 그 자식이 스페이서로 바뀌는 순간 비율이 사라지지만,
 * 트랙 비율은 컨테이너가 쥐고 있어 무엇으로 감싸든 4:6이 유지된다.
 */
const Hero = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  align-items: start;
  gap: 1.5rem;
  padding: 2.5rem;

  @media ${devices.lg} {
    grid-template-columns: 1fr;
    padding: 1.5rem 1rem 0;
  }
`;

/*
 * 스크롤 중 고정은 CSS position: sticky가 아니라 ScrollTrigger 핀으로 처리한다.
 * ScrollSmoother가 #smooth-wrapper를 position: fixed + overflow: hidden으로 만들고
 * 콘텐츠를 transform으로 밀기 때문에, 안쪽에는 스크롤되는 조상이 없어
 * sticky가 붙을 기준면 자체가 생기지 않는다.
 */
const ProjectCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  /* 그리드 아이템 기본값 min-width: auto 때문에 내용이 트랙을 밀지 않도록 한다 */
  min-width: 0;
  /* 고정된 동안 화면을 꽉 채우도록 위아래 여백만 남기고 뷰포트에 맞춘다 */
  height: calc(100vh - ${STICKY_OFFSET * 2}px);
  background-color: ${({ theme }) => theme.flipCardBgOpacity};
  border-radius: 2rem;
  padding: 1.75rem;

  @media ${devices.lg} {
    height: auto;
  }
`;

const chipBase = css`
  display: inline-block;
  border-radius: 20px;
  padding: 0.375rem 0.875rem;
  font-size: ${FONT.caption};
  white-space: nowrap;
`;

/*
 * Chip·GroupChip이 서로의 스타일을 가져다 쓸 수 있게 두 톤을 독립적으로
 * 정의해둔다. GroupChip이 styled(Chip)으로 상속하는 구조면 톤을 바꿀 때마다
 * 얽히므로, 톤 자체를 재사용 가능한 조각으로 분리했다.
 */
const outlineTone = css`
  border: 1px solid #555;
  color: ${({ theme }) => theme.mutedText};
`;

const gradientTone = css`
  border: none;
  background: var(--primary-gradient);
  color: #f0eaf5;
`;

/* 카테고리 라벨(Team Project 등) — 사이트의 "누를 수 있는 태그" 언어를 가져와 눈에 띈다 */
const Chip = styled.span`
  ${chipBase}
  ${gradientTone}
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

/* 묶음 이름 태그 — 누르면 같은 이름의 아코디언으로 스크롤 이동한다 */
const GroupChip = styled.span`
  ${chipBase}
  ${outlineTone}
  background-color: ${({ theme }) => theme.surfaceHoverBg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.solidBg};
    color: ${({ theme }) => theme.solidText};
  }
`;

const ImageArea = styled.div<{ $dragging: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-radius: 2.5rem;
  padding: 2rem;
  /* 카드 높이가 뷰포트에 묶여 있으므로 남는 공간을 이미지가 채운다 */
  flex: 1;
  min-height: 0;
  overflow: hidden;
  cursor: ${({ $dragging }) => ($dragging ? "grabbing" : "grab")};
  /* 드래그 중 텍스트·이미지가 선택되며 파랗게 물드는 것을 막는다 */
  user-select: none;

  @media ${devices.lg} {
    flex: none;
    aspect-ratio: 480 / 306;
  }
`;

/*
 * 화살표·터치 드래그로 넘길 때 가로로 밀리는 트랙.
 * 드래그 중에는 손가락을 그대로 따라가야 하므로 transition을 끄고,
 * 손을 떼는 순간(현재 위치가 정해진 순간)부터 다시 트랜지션으로 안착시킨다.
 */
const SlideTrack = styled.div<{
  $index: number;
  $dragX: number;
  $dragging: boolean;
}>`
  position: absolute;
  inset: 0;
  display: flex;
  touch-action: pan-y;
  transition: ${({ $dragging }) =>
    $dragging ? "none" : "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)"};
  transform: translateX(
    calc(${({ $index }) => $index * -100}% + ${({ $dragX }) => $dragX}px)
  );
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* 브라우저 기본 이미지 드래그(고스트 아이콘)를 막는다 */
    -webkit-user-drag: none;
    pointer-events: none;
  }
`;

/*
 * 눈은 두 요소로 나눈다. 위치(x/y)는 GSAP이, 크기(scale)는 CSS가 맡는다.
 * 한 요소에 둘 다 걸면 같은 transform 속성을 두고 서로 덮어쓰게 된다.
 */
const EyeTracker = styled.div`
  position: relative;
  flex-shrink: 0;
  pointer-events: none;
`;

const EyeDot = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${EYE_SIZE}px;
  height: ${EYE_SIZE}px;
  border-radius: 99px;
  background-color: #00000072;
  backdrop-filter: blur(2px);
  font-size: 1.25rem;
  transform: scale(${({ $visible }) => ($visible ? 1 : 0)});
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

/* 이미지 오른쪽 끝에 붙는 화살표 영역 (디자인 Frame 7) */
/*
 * 데스크톱: 이미지 오른쪽 끝 중앙에 세로 스트립(↑↓).
 * 모바일: 오른쪽에 붙일 자리가 마땅치 않아 하단 중앙으로 옮기고,
 * 세로 스트립을 그대로 눕히는 대신 가로 스트립(← →)으로 바꾼다 —
 * 화면 밖 가장자리에 반쯤 잘려 붙어 있던 모양을 그대로 중앙에 띄우면 어색하다.
 */
const ArrowStrip = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 66px;
  border-radius: 12px 0 0 12px;
  background-color: ${({ theme }) => theme.flipCardBgOpacity};

  @media ${devices.lg} {
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
    width: 66px;
    height: 32px;
    border-radius: 12px 12px 0 0;
  }
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 27px;
  font-size: ${FONT.caption};
  font-weight: 600;
  line-height: 1;
  background-color: transparent;
  color: #333;

  &:disabled {
    color: #bbbbbb;
    cursor: default;
  }

  @media ${devices.lg} {
    width: 27px;
    height: 100%;
  }
`;

const ArrowDivider = styled.span`
  width: 12px;
  height: 1px;
  background-color: #1f1f1f;

  @media ${devices.lg} {
    width: 1px;
    height: 12px;
  }
`;

const CardTitle = styled.h2`
  font-size: ${FONT.display};
  font-weight: 900;
  line-height: 1.1;
`;

const CardBody = styled.p`
  font-size: ${FONT.body};
  line-height: 1.7;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;

  @media ${devices.lg} {
    padding: 1.5rem 0 0;
  }
`;

const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

/*
 * 좌우 화살표가 헤더 위쪽 바깥(음수 위치, 안 보이는 지점)에서 시작해
 * 아래로 흘러내리다 헤더 아래쪽 바깥으로 빠져나간다. GroupHeader의
 * overflow: hidden이 위아래 모두 잘라내므로 opacity 없이도 자연스럽게
 * 나타났다 사라진다. 100%에서 0%로는 항상 순간 복귀라, 다시 위쪽 바깥에서
 * 떨어지는 사이클이 반복된다.
 * 아래로 늘어나야 하므로 scaleY 기준점을 위쪽(transform-origin: top)에 둔다.
 */
const arrowBounce = keyframes`
  0% {
    transform: translateY(-180%) scaleY(1);
  }
  /* 헤더 한가운데(제자리)에 도착하면 잠시 멈춘다 */
  35% {
    transform: translateY(0%) scaleY(1);
  }
  55% {
    transform: translateY(0%) scaleY(1);
  }
  100% {
    transform: translateY(220%) scaleY(1.8);
  }
`;

const GroupHeader = styled.h3`
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.flipCardBgOpacity};
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  height: 5.5rem;
  font-size: ${FONT.heading};
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};

  @media ${devices.md} {
    height: 4.5rem;
  }

  .title {
    flex: 1;
    text-align: center;
  }

  .arrow {
    text-align: center;
    transform-origin: top;
    animation: ${arrowBounce} 2.2s ease-in-out infinite;
    font-size: 0.9em;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  /* 바깥쪽 화살표는 안쪽보다 크게 — em이라 헤더 폰트 크기 반응형을 그대로 따라간다 */
  .arrow:nth-child(1),
  .arrow:nth-child(5) {
    animation-delay: 0.12s;
    font-size: 1.2em;
    width: 2.5rem;

    @media ${devices.sm} {
      width: 1.9rem;
    }
  }

  .arrow:nth-child(2),
  .arrow:nth-child(4) {
    animation-delay: 0s;
  }
`;

/*
 * hover 표시는 ItemHeader(버튼)가 아니라 이 부모 카드 전체에 준다.
 * $open의 배경/테두리와 겹치는 자리라, hover가 임시 상태이므로 우선한다.
 */
const Item = styled.div<{ $open: boolean }>`
  border-radius: 1rem;
  background-color: ${({ $open, theme }) =>
    $open ? theme.flipCardBgOpacity : "transparent"};
  border: 1px solid ${({ $open }) => ($open ? "transparent" : "#555")};
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.flipCardBgOpacity};
  }
`;

const ItemHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem;
  text-align: left;
  color: ${({ theme }) => theme.textColor};
  background-color: transparent;

  .label {
    font-size: ${FONT.title};
    font-weight: 600;
    line-height: 1.5;
  }
`;

/*
 * 닫힘 +, 열림 x. 글리프를 갈아끼우는 대신 45도 돌린다.
 * 회전한 +가 곧 x라 모양은 디자인과 같으면서 전환이 이어진다.
 */
const Toggle = styled.span<{ $open: boolean }>`
  flex-shrink: 0;
  /* 옆 라벨(FONT.title)을 상속해 그보다 한 급 크게 — 라벨과 함께 반응한다 */
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1;
  --toggle-rotate: ${({ $open }) => ($open ? "45deg" : "0deg")};
  transform: rotate(var(--toggle-rotate));
  transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
`;

/*
 * 열림/닫힘은 grid-template-rows를 0fr <-> 1fr로 전환해 처리한다.
 * max-height 방식과 달리 임의의 큰 값을 넣지 않아도 되고, 내용 분량에 상관없이
 * 실제 높이만큼만 움직여 속도가 일정하다.
 */
const ItemBodyWrap = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.4s cubic-bezier(0.65, 0, 0.35, 1);
`;

/* 0fr 구간에서 내용이 삐져나오지 않게 잘라준다 */
const ItemBodyClip = styled.div`
  overflow: hidden;
`;

const ItemBody = styled.ul<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* margin이면 닫힌 상태에서도 자리를 차지하므로 padding으로 둔다 */
  padding: 1.5rem;
  padding-top: 0;
  /* 높이만 움직이면 글자가 잘려나가는 것처럼 보여 투명도를 같이 준다 */
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: opacity 0.35s ease;

  li {
    font-size: ${FONT.body};
    color: ${({ theme }) => theme.textColor};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 2.5rem;

  @media ${devices.lg} {
    padding: 1.5rem 1rem 2.5rem;
  }

  & > *:not(:last-child) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: ${FONT.title};

    &:hover {
      filter: brightness(0.95);
    }

    @media ${devices.md} {
      height: 3.5rem;
    }
  }
`;

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 5.375rem;
  height: 5.375rem;
  border-radius: 1rem;
  background-color: #1f1f1f;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;

  @media ${devices.md} {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.25rem;
  }
`;

function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = data.projects.find((item) => String(item.id) === projectId);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  // group.label로 각 아코디언 묶음 DOM을 찾아 스크롤 이동에 쓴다
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});
  const eyeRef = useRef<HTMLDivElement>(null);
  const eyeMoveRef = useRef<{
    x: ReturnType<typeof gsap.quickTo>;
    y: ReturnType<typeof gsap.quickTo>;
  } | null>(null);

  // 카드 이미지 영역과 팝오버는 각자 자기 슬라이드 위치를 갖는다. 팝오버를 열
  // 때 카드가 보여주던 장면으로 시작만 맞추고, 그 뒤로는 서로 넘겨도 영향이 없다
  const [shotIndex, setShotIndex] = useState(0);
  const [popoverIndex, setPopoverIndex] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [eyeVisible, setEyeVisible] = useState(false);

  // 터치 드래그 중 손가락을 따라가는 오프셋. 시작 x는 매 렌더마다 새로 만들
  // 필요가 없어 state가 아닌 ref로 둔다
  const touchStartX = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // 드래그로 화면을 넘긴 뒤 손을 뗄 때 같이 발생하는 click까지 팝오버를 열지
  // 않도록, 의미 있게 움직였으면 그 클릭 하나만 막는다
  const suppressNextClick = useRef(false);

  // 펼침 여부를 바꾼 항목만 담는다. 손대지 않은 항목은 defaultOpen을 따른다
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  // 다른 프로젝트로 이동해도 이전 페이지의 스크롤 위치가 그대로 이어진다.
  // ScrollSmoother는 스크롤을 transform으로 흉내 내므로 window.scrollTo가
  // 아니라 smoother.scrollTo로 옮겨야 한다. 핀(ScrollTrigger) 설정보다
  // 먼저 실행되도록 이 훅을 그 앞에 둔다
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(0, false);
    } else {
      window.scrollTo(0, 0);
    }
  }, [projectId]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // 좌우 2단인 데스크톱에서만 고정한다. 세로로 쌓이는 화면에선 의미가 없다
      mm.add("(min-width: 1025px)", () => {
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: `top top+=${STICKY_OFFSET}`,
          // sticky와 같은 기준으로 푼다: 아코디언의 아래끝이 카드의 아래끝과
          // 만나는 지점. "bottom bottom"(아코디언 아래끝이 화면 아래끝에 닿는
          // 시점)은 이보다 한참 이르러서 중간에 풀려버린다.
          // 카드 높이는 펼침 상태에 따라 달라지므로 refresh마다 다시 잰다
          endTrigger: panelRef.current,
          end: () =>
            `bottom top+=${STICKY_OFFSET + (cardRef.current?.offsetHeight ?? 0)}`,
          pin: true,
          // ScrollSmoother 안의 콘텐츠는 transform으로 스크롤된다
          pinType: "transform",
          // 아코디언 쪽 높이가 이미 자리를 차지하므로 여백을 더하지 않는다
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      return () => mm.revert();
    },
    { scope: heroRef, dependencies: [projectId] },
  );

  // 아코디언을 펼치거나 접으면 오른쪽 높이가 달라진다. 핀의 start/end는 생성 시점의
  // 높이로 계산돼 있으므로, 높이가 바뀔 때마다 다시 재도록 갱신해줘야 한다
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [openKeys]);

  // 커서 추적만 GSAP이 맡는다. 표시 여부는 eyeVisible + CSS transition이 처리한다.
  // 매 mousemove마다 트윈을 새로 만들지 않도록 quickTo 세터를 만들어 보관한다
  useGSAP(
    () => {
      const eye = eyeRef.current;
      if (!eye) return;

      eyeMoveRef.current = {
        x: gsap.quickTo(eye, "x", { duration: 0.5, ease: "power3" }),
        y: gsap.quickTo(eye, "y", { duration: 0.5, ease: "power3" }),
      };

      return () => {
        eyeMoveRef.current = null;
      };
    },
    { scope: cardRef, dependencies: [projectId] },
  );

  /**
   * 눈을 커서 옆자리로 옮긴다 (EYE_CURSOR_OFFSET만큼 대각선으로 띄운 지점).
   *
   * 레이아웃상 기본 자리(우하단)를 기준점으로 두고 그만큼만 밀어낸다.
   * instant면 시작값까지 목표값으로 지정해 애니메이션 없이 곧바로 옮긴다.
   * 나타나는 순간에는 이게 필요하다. 아니면 우하단에서 커진 뒤 커서로
   * 미끄러져 와서 한 방향으로 쏠려 보인다.
   */
  const placeEye = (event: React.MouseEvent, instant = false) => {
    const area = imageRef.current;
    const move = eyeMoveRef.current;
    if (!area || !move) return;

    const rect = area.getBoundingClientRect();
    const restX = rect.width - IMAGE_PADDING - EYE_SIZE / 2;
    const restY = rect.height - IMAGE_PADDING - EYE_SIZE / 2;

    const x = event.clientX - rect.left + EYE_CURSOR_OFFSET - restX;
    const y = event.clientY - rect.top + EYE_CURSOR_OFFSET - restY;

    move.x(x, instant ? x : undefined);
    move.y(y, instant ? y : undefined);
  };

  if (!project) return <div>프로젝트를 찾을 수 없습니다.</div>;

  const groups = buildGroups(project);

  // work 프로젝트는 screenShots가 빈 문자열로 채워져 있어 걸러낸다.
  // 남는 게 없으면 목록 썸네일 한 장으로 대체한다
  const shots = project.screenShots.filter(Boolean);
  const gallery =
    shots.length > 0 ? shots : [`/images/sections/04/${project.imgSrc}.png`];
  const current = Math.min(shotIndex, gallery.length - 1);

  // 드래그를 끝낼 때 공통으로 쓰는 판정. 터치·마우스 둘 다 여기로 모인다
  const commitSwipe = (delta: number) => {
    if (Math.abs(delta) >= SWIPE_TAP_THRESHOLD) {
      suppressNextClick.current = true;
    }

    if (delta <= -SWIPE_THRESHOLD && current < gallery.length - 1) {
      setShotIndex(current + 1);
    } else if (delta >= SWIPE_THRESHOLD && current > 0) {
      setShotIndex(current - 1);
    }

    setDragX(0);
    setIsDragging(false);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    setDragX(event.touches[0].clientX - touchStartX.current);
  };

  const handleTouchEnd = () => {
    commitSwipe(dragX);
    touchStartX.current = null;
  };

  /*
   * 마우스는 터치와 달리 버튼을 누른 채 요소 밖으로 나갈 수 있어(암묵적 포인터
   * 캡처가 없음), 이동·해제를 window에 걸어야 놓치지 않는다. 이 리스너들은
   * mousedown이 일어난 순간 한 번만 만들어지므로, 그 순간의 dragX(항상 0)가
   * 아니라 지역 변수 latestDelta로 최신 이동량을 추적해 mouseup에서 읽는다.
   */
  const handleMouseDown = (event: React.MouseEvent) => {
    // 이미지의 기본 드래그 고스트를 막는다
    event.preventDefault();

    const startX = event.clientX;
    let latestDelta = 0;

    setIsDragging(true);

    const onWindowMouseMove = (moveEvent: MouseEvent) => {
      latestDelta = moveEvent.clientX - startX;
      setDragX(latestDelta);
    };

    const onWindowMouseUp = () => {
      commitSwipe(latestDelta);
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
  };

  // 카드가 지금 보여주는 장면으로 팝오버의 시작 위치를 맞춘다
  const openPopover = () => {
    setPopoverIndex(current);
    setPopoverOpen(true);
  };

  const handleImageClick = () => {
    if (suppressNextClick.current) {
      suppressNextClick.current = false;
      return;
    }
    openPopover();
  };

  // buildGroups가 MVP를 항상 첫 묶음으로 넣는다. 그 첫 항목만 펼친 채로 시작하고
  // 나머지 묶음은 모두 접힌 상태로 둔다
  const defaultOpen = (groupIndex: number, itemIndex: number) =>
    groupIndex === 0 && itemIndex === 0;

  const isOpen = (groupIndex: number, itemIndex: number) =>
    openKeys[`${groupIndex}-${itemIndex}`] ??
    defaultOpen(groupIndex, itemIndex);

  const toggle = (groupIndex: number, itemIndex: number) => {
    const key = `${groupIndex}-${itemIndex}`;
    setOpenKeys((prev) => ({
      ...prev,
      [key]: !(prev[key] ?? defaultOpen(groupIndex, itemIndex)),
    }));
  };

  // 이미지 영역의 묶음 태그를 누르면 같은 이름의 아코디언 위치로 스크롤한다.
  // ScrollSmoother가 실제 스크롤을 transform으로 대신하고 있어
  // window/element.scrollIntoView로는 움직이지 않는다
  const scrollToGroup = (label: string) => {
    const target = groupRefs.current[label];
    if (!target) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(target, true, `top top+=${STICKY_OFFSET}`);
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Page>
      <Hero ref={heroRef}>
        <ProjectCard ref={cardRef}>
          <div>
            <Chip>{CATEGORY_LABEL[project.category]}</Chip>
          </div>

          <ImageArea
            ref={imageRef}
            $dragging={isDragging}
            onClick={handleImageClick}
            onMouseEnter={(event) => {
              // 커서 자리로 먼저 옮긴 뒤 그 자리에서 커지게 한다
              placeEye(event, true);
              setEyeVisible(true);
            }}
            onMouseMove={(event) => placeEye(event)}
            onMouseLeave={() => setEyeVisible(false)}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="button"
            tabIndex={0}
            aria-label={`${project.title} 화면 크게 보기`}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPopover();
              }
            }}
          >
            <SlideTrack $index={current} $dragX={dragX} $dragging={isDragging}>
              {gallery.map((src, i) => (
                <Slide key={src}>
                  <img src={src} alt={`${project.title} 화면 ${i + 1}`} />
                </Slide>
              ))}
            </SlideTrack>

            <EyeTracker ref={eyeRef}>
              <EyeDot $visible={eyeVisible}>👁️</EyeDot>
            </EyeTracker>

            {/* 화살표는 카드 안에서 화면만 넘긴다. 팝오버는 열지 않는다 */}
            {/* 화살표 위에서는 눈을 숨긴다. 벗어나면 아직 이미지 영역 안이라 다시 키운다 */}
            <ArrowStrip
              onClick={(event) => event.stopPropagation()}
              onMouseEnter={() => setEyeVisible(false)}
              onMouseLeave={() => setEyeVisible(true)}
            >
              <ArrowButton
                type="button"
                onClick={() => setShotIndex(current - 1)}
                disabled={current === 0}
                aria-label="이전 화면"
              >
                ←
              </ArrowButton>
              <ArrowDivider />
              <ArrowButton
                type="button"
                onClick={() => setShotIndex(current + 1)}
                disabled={current === gallery.length - 1}
                aria-label="다음 화면"
              >
                →
              </ArrowButton>
            </ArrowStrip>
          </ImageArea>

          <CardTitle>{project.title}</CardTitle>
          <CardBody>{project.projectTitle}</CardBody>

          <ChipRow>
            {groups.map((group) => (
              <GroupChip
                key={group.label}
                onClick={() => scrollToGroup(group.label)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    scrollToGroup(group.label);
                  }
                }}
              >
                {group.label}
              </GroupChip>
            ))}
          </ChipRow>
        </ProjectCard>

        <Panel ref={panelRef}>
          {groups.map((group, groupIndex) => (
            <Group
              key={group.label}
              ref={(el) => {
                groupRefs.current[group.label] = el;
              }}
            >
              <GroupHeader>
                <span className="arrow">
                  <BsArrowDown />
                </span>
                <span className="arrow">
                  <BsArrowDown />
                </span>
                <span className="title">{group.label}</span>
                <span className="arrow">
                  <BsArrowDown />
                </span>
                <span className="arrow">
                  <BsArrowDown />
                </span>
              </GroupHeader>

              {group.items.map((item, itemIndex) => {
                const open = isOpen(groupIndex, itemIndex);

                return (
                  <Item key={item.title} $open={open}>
                    <ItemHeader
                      type="button"
                      onClick={() => toggle(groupIndex, itemIndex)}
                      aria-expanded={open}
                    >
                      <span className="label">{item.title}</span>
                      <Toggle $open={open}>+</Toggle>
                    </ItemHeader>

                    <ItemBodyWrap
                      $open={open}
                      aria-hidden={!open}
                      // 애니메이션이 끝난 높이로 핀 구간을 다시 잡는다
                      onTransitionEnd={(event) => {
                        if (event.propertyName === "grid-template-rows") {
                          ScrollTrigger.refresh();
                        }
                      }}
                    >
                      <ItemBodyClip>
                        <ItemBody $open={open}>
                          {item.body.map((line) => (
                            <li key={line}>• {line}</li>
                          ))}
                        </ItemBody>
                      </ItemBodyClip>
                    </ItemBodyWrap>
                  </Item>
                );
              })}
            </Group>
          ))}
        </Panel>
      </Hero>

      <Actions>
        <Button
          type="link"
          to={project.url.view}
          target="_blank"
          rel="noopener noreferrer"
        >
          사이트 보기
        </Button>
        {project.category !== "work" && (
          <Button
            to={project.url.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            Github
          </Button>
        )}

        <ActionIcon>↗</ActionIcon>
      </Actions>

      {popoverOpen && (
        <GalleryPopover
          images={gallery}
          index={popoverIndex}
          alt={`${project.title} 화면`}
          onChange={setPopoverIndex}
          onClose={() => setPopoverOpen(false)}
        />
      )}
    </Page>
  );
}

export default ProjectDetailPage;
