import SoftVolumeFilter from "./SoftVolumeFilter";
import { tabPath, type TabGeometry } from "src/utils/tabPath";
import {
  SOFT_VOLUME,
  softVolumeShade,
  type SoftVolume,
} from "src/utils/softVolume";

// 홈 폴더처럼 탭이 달린 카드 바탕. 본체는 부모 크기를 따라 늘어나고,
// 탭과 본체를 한 윤곽으로 묶어 말랑한 볼륨을 건다. 부모는 position이 있어야 한다.
export default function TabbedSurface({
  id,
  color,
  tab,
  tabHeight,
  radius,
  volume = SOFT_VOLUME,
}: {
  id: string;
  color: string;
  tab: TabGeometry;
  // 본체 위로 보이는 탭 높이
  tabHeight: number;
  radius: number;
  volume?: SoftVolume;
}) {
  const { glow } = volume;

  const silhouette = (
    <>
      <path d={tabPath(tab, tabHeight, radius)} />
      <rect y={tabHeight} width="100%" height="100%" rx={radius} />
    </>
  );

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
    >
      <defs>
        {/* 탭과 본체가 같은 그라데이션을 이어 쓰도록 카드 좌표 기준으로 칠한다 */}
        <linearGradient
          id={`${id}-fill`}
          gradientUnits="userSpaceOnUse"
          x1={0}
          y1={0}
          x2={0}
          y2="100%"
        >
          {softVolumeShade(color, volume).map((stop) => (
            <stop
              key={stop.offset}
              offset={stop.offset}
              style={{ stopColor: stop.color }}
            />
          ))}
        </linearGradient>

        <radialGradient
          id={`${id}-glow`}
          gradientUnits="userSpaceOnUse"
          cx={glow.x}
          cy={glow.y}
          r={glow.radius}
        >
          <stop offset={0} stopColor="#fff" stopOpacity={glow.opacity} />
          <stop offset={1} stopColor="#fff" stopOpacity={0} />
        </radialGradient>

        <clipPath id={`${id}-clip`}>{silhouette}</clipPath>

        <SoftVolumeFilter id={`${id}-depth`} volume={volume} />
      </defs>

      <g filter={`url(#${id}-depth)`}>
        <g fill={`url(#${id}-fill)`}>{silhouette}</g>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-glow)`}
          clipPath={`url(#${id}-clip)`}
        />
      </g>
    </svg>
  );
}
