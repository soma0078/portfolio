import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ScrollSmoother } from "gsap/all";
import styled from "styled-components";
import devices from "@constants/devices";

/**
 * 프로젝트 화면을 크게 넘겨보는 팝오버.
 *
 * document.body로 포탈시킨다. ScrollSmoother가 #smooth-wrapper를
 * position: fixed + transform으로 만들기 때문에, 그 안에서 fixed를 쓰면
 * 화면이 아니라 변형된 콘텐츠를 기준으로 붙어버린다.
 */

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background-color: #000000c4;

  @media ${devices.md} {
    padding: 1rem;
  }
`;

const Frame = styled.div`
  position: relative;
  width: min(72rem, 100%);
  max-height: 100%;
  overflow: hidden;
  border-radius: 1.5rem;
  background-color: #1f1f1f;
`;

const Track = styled.div<{ $index: number }>`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  transform: translateX(${({ $index }) => $index * -100}%);
`;

const Slide = styled.div`
  flex: 0 0 100%;
  aspect-ratio: 16 / 10;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const RoundButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 99px;
  background-color: #00000072;
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-size: 1.25rem;
  line-height: 1;
  transition: 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #000000c4;
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const PrevButton = styled(RoundButton)`
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
`;

const NextButton = styled(RoundButton)`
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
`;

const CloseButton = styled(RoundButton)`
  top: 1rem;
  right: 1rem;
`;

const Counter = styled.p`
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  padding: 0.375rem 0.875rem;
  border-radius: 99px;
  background-color: #00000072;
  color: #ffffff;
  font-size: 0.75rem;
`;

type Props = {
  images: string[];
  index: number;
  alt: string;
  onChange: (next: number) => void;
  onClose: () => void;
};

export default function GalleryPopover({
  images,
  index,
  alt,
  onChange,
  onClose,
}: Props) {
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  // 열려 있는 동안 뒤쪽 스크롤을 멈춘다
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);

    return () => {
      smoother?.paused(false);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasPrev) onChange(index - 1);
      if (event.key === "ArrowRight" && hasNext) onChange(index + 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, hasPrev, hasNext, onChange, onClose]);

  return createPortal(
    <Backdrop
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      {/* 이미지 영역 클릭은 닫기로 이어지지 않게 한다 */}
      <Frame onClick={(event) => event.stopPropagation()}>
        <Track $index={index}>
          {images.map((src, i) => (
            <Slide key={src}>
              <img src={src} alt={`${alt} ${i + 1}`} />
            </Slide>
          ))}
        </Track>

        <PrevButton
          type="button"
          onClick={() => onChange(index - 1)}
          disabled={!hasPrev}
          aria-label="이전 화면"
        >
          ←
        </PrevButton>

        <NextButton
          type="button"
          onClick={() => onChange(index + 1)}
          disabled={!hasNext}
          aria-label="다음 화면"
        >
          →
        </NextButton>

        <CloseButton type="button" onClick={onClose} aria-label="닫기">
          ×
        </CloseButton>

        <Counter>
          {index + 1} / {images.length}
        </Counter>
      </Frame>
    </Backdrop>,
    document.body,
  );
}
