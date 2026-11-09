import {
  BODY_HEIGHT,
  BODY_RADIUS,
  BODY_TOP,
  BODY_WIDTH,
  FOLDER_HEIGHT,
  FOLDER_WIDTH,
  type Folder,
} from "./folders";
import SoftVolumeFilter from "@components/common/SoftVolumeFilter";
import { tabPath } from "src/utils/tabPath";
import { SOFT_VOLUME, softVolumeShade } from "src/utils/softVolume";

const { glow } = SOFT_VOLUME;

// 탭과 본체를 한 SVG에 그려 합친 윤곽 하나에 빛과 그림자를 건다.
// 따로 그리면 안쪽 그림자가 둘이 만나는 선을 따라 생긴다.
export default function FolderShape({ folder }: { folder: Folder }) {
  const id = `folder-${folder.id}`;

  const silhouette = (
    <>
      <path d={tabPath(folder.tab, BODY_TOP, BODY_RADIUS)} />
      <rect
        y={BODY_TOP}
        width={BODY_WIDTH}
        height={BODY_HEIGHT}
        rx={BODY_RADIUS}
      />
    </>
  );

  return (
    <svg
      aria-hidden
      width={FOLDER_WIDTH}
      height={FOLDER_HEIGHT}
      className="absolute left-0 top-0 overflow-visible"
      // 사각형 전체가 아니라 칠해진 윤곽만 클릭을 받아야 뒤 폴더의 탭을 누를 수 있다
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient
          id={`${id}-fill`}
          gradientUnits="userSpaceOnUse"
          x1={0}
          y1={0}
          x2={0}
          y2={FOLDER_HEIGHT}
        >
          {softVolumeShade(folder.color).map((stop) => (
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

        <SoftVolumeFilter id={`${id}-depth`} />
      </defs>

      <g
        filter={`url(#${id}-depth)`}
        style={{ pointerEvents: "visiblePainted" }}
      >
        <g fill={`url(#${id}-fill)`}>{silhouette}</g>
        <rect
          width={FOLDER_WIDTH}
          height={FOLDER_HEIGHT}
          fill={`url(#${id}-glow)`}
          clipPath={`url(#${id}-clip)`}
        />
      </g>
    </svg>
  );
}
