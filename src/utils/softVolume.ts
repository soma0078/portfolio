import type { CSSProperties } from "react";

export interface SoftVolume {
  shade: { light: number; dark: number };
  glow: { x: number; y: number; radius: number; opacity: number };
  innerShade: { x: number; y: number; blur: number; opacity: number };
  innerLight: { x: number; y: number; blur: number; opacity: number };
  contact: { y: number; blur: number; opacity: number };
  lift: { y: number; blur: number; opacity: number };
}

// 왼쪽 위에서 빛을 받아 부푼 면처럼 보이게 하는 값. 홈 폴더(SVG)와 About 카드(CSS)가 같이 쓴다.
// blur는 가우시안 표준편차다. SVG stdDeviation에는 그대로, CSS box-shadow 흐림 반경에는 두 배로 넣는다.
export const SOFT_VOLUME: SoftVolume = {
  shade: { light: 6, dark: 8 },
  glow: { x: 70, y: 50, radius: 300, opacity: 0.14 },
  innerShade: { x: -4, y: -6, blur: 7, opacity: 0.2 },
  innerLight: { x: 3, y: 5, blur: 6, opacity: 0.2 },
  contact: { y: 2, blur: 1.5, opacity: 0.12 },
  lift: { y: 16, blur: 14, opacity: 0.14 },
};

// About 페이지 카드(Tech Stacks). 넓은 면 위에 글씨가 있어 폴더보다 하이라이트와 위쪽 밝기를 약하게 둔다
export const SOFT_VOLUME_CARD: SoftVolume = {
  ...SOFT_VOLUME,
  shade: { light: 4, dark: 8 },
  glow: { ...SOFT_VOLUME.glow, opacity: 0.06 },
};

// 폴더 크기(약 400×330)에 맞춘 값을 작은 요소에 맞게 줄인다. 색 비율과 불투명도는 그대로 둔다
export function scaleSoftVolume(
  volume: SoftVolume,
  factor: number,
): SoftVolume {
  const point = <T extends { x: number; y: number; blur: number }>(
    value: T,
  ) => ({
    ...value,
    x: value.x * factor,
    y: value.y * factor,
    blur: value.blur * factor,
  });

  return {
    ...volume,
    glow: {
      ...volume.glow,
      x: volume.glow.x * factor,
      y: volume.glow.y * factor,
      radius: volume.glow.radius * factor,
    },
    innerShade: point(volume.innerShade),
    innerLight: point(volume.innerLight),
    contact: {
      ...volume.contact,
      y: volume.contact.y * factor,
      blur: volume.contact.blur * factor,
    },
    lift: {
      ...volume.lift,
      y: volume.lift.y * factor,
      blur: volume.lift.blur * factor,
    },
  };
}

// 사이드바 로고 블롭(약 110×64)
export const SOFT_VOLUME_LOGO = scaleSoftVolume(SOFT_VOLUME, 0.25);

export function softVolumeShade(color: string, volume = SOFT_VOLUME) {
  const { light, dark } = volume.shade;

  return [
    { offset: 0, color: `color-mix(in oklab, ${color}, white ${light}%)` },
    { offset: 0.5, color },
    { offset: 1, color: `color-mix(in oklab, ${color}, black ${dark}%)` },
  ];
}

export function softVolumeStyle(
  color: string,
  volume = SOFT_VOLUME,
): CSSProperties {
  const { glow, innerShade, innerLight, contact, lift } = volume;
  const shade = softVolumeShade(color, volume)
    .map((stop) => `${stop.color} ${stop.offset * 100}%`)
    .join(", ");

  return {
    backgroundColor: color,
    backgroundImage: [
      `radial-gradient(circle ${glow.radius}px at ${glow.x}px ${glow.y}px, rgb(255 255 255 / ${glow.opacity}), rgb(255 255 255 / 0))`,
      `linear-gradient(to bottom, ${shade})`,
    ].join(", "),
    boxShadow: [
      `inset ${innerShade.x}px ${innerShade.y}px ${innerShade.blur * 2}px rgb(0 0 0 / ${innerShade.opacity})`,
      `inset ${innerLight.x}px ${innerLight.y}px ${innerLight.blur * 2}px rgb(255 255 255 / ${innerLight.opacity})`,
      `0 ${contact.y}px ${contact.blur * 2}px rgb(0 0 0 / ${contact.opacity})`,
      `0 ${lift.y}px ${lift.blur * 2}px rgb(0 0 0 / ${lift.opacity})`,
    ].join(", "),
  };
}
