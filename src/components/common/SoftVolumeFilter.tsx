import { SOFT_VOLUME, type SoftVolume } from "src/utils/softVolume";

// 요소 윤곽(알파)을 따라 안쪽 빛·그림자와 바깥 그림자를 만드는 SVG 필터.
// 사각형이 아니라서 box-shadow를 쓸 수 없는 홈 폴더와 로고에 쓴다.
export default function SoftVolumeFilter({
  id,
  volume = SOFT_VOLUME,
}: {
  id: string;
  volume?: SoftVolume;
}) {
  const { innerShade, innerLight, contact, lift } = volume;

  return (
    <filter
      id={id}
      x="-15%"
      y="-15%"
      width="130%"
      height="140%"
      colorInterpolationFilters="sRGB"
    >
      {/* 윤곽을 흐린 뒤 왼쪽 위로 밀어 빼면 오른쪽 아래 안쪽 가장자리만 남는다 */}
      <feGaussianBlur
        in="SourceAlpha"
        stdDeviation={innerShade.blur}
        result="shadeBlur"
      />
      <feOffset
        in="shadeBlur"
        dx={innerShade.x}
        dy={innerShade.y}
        result="shadeOffset"
      />
      <feComposite
        in="SourceAlpha"
        in2="shadeOffset"
        operator="out"
        result="shadeEdge"
      />
      <feFlood floodColor="#000" floodOpacity={innerShade.opacity} />
      <feComposite in2="shadeEdge" operator="in" result="innerShade" />

      {/* 반대로 밀면 왼쪽 위 안쪽 가장자리가 남는다 */}
      <feGaussianBlur
        in="SourceAlpha"
        stdDeviation={innerLight.blur}
        result="lightBlur"
      />
      <feOffset
        in="lightBlur"
        dx={innerLight.x}
        dy={innerLight.y}
        result="lightOffset"
      />
      <feComposite
        in="SourceAlpha"
        in2="lightOffset"
        operator="out"
        result="lightEdge"
      />
      <feFlood floodColor="#fff" floodOpacity={innerLight.opacity} />
      <feComposite in2="lightEdge" operator="in" result="innerLight" />

      <feGaussianBlur
        in="SourceAlpha"
        stdDeviation={contact.blur}
        result="contactBlur"
      />
      <feOffset in="contactBlur" dy={contact.y} result="contactOffset" />
      <feFlood floodColor="#000" floodOpacity={contact.opacity} />
      <feComposite in2="contactOffset" operator="in" result="contactShadow" />

      <feGaussianBlur
        in="SourceAlpha"
        stdDeviation={lift.blur}
        result="liftBlur"
      />
      <feOffset in="liftBlur" dy={lift.y} result="liftOffset" />
      <feFlood floodColor="#000" floodOpacity={lift.opacity} />
      <feComposite in2="liftOffset" operator="in" result="liftShadow" />

      <feMerge>
        <feMergeNode in="liftShadow" />
        <feMergeNode in="contactShadow" />
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="innerShade" />
        <feMergeNode in="innerLight" />
      </feMerge>
    </filter>
  );
}
