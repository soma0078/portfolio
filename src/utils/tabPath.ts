export interface TabGeometry {
  // 탭 아래쪽(본체와 만나는 선) 기준 왼쪽 끝과 너비
  left: number;
  width: number;
  // 비스듬한 옆선의 가로 길이
  slope: number;
  // 위쪽 모서리의 둥근 정도
  corner: number;
  // 옆선이 본체 윗변과 만나는 곳의 오목한 곡선 크기
  fillet: number;
  // 카드 왼쪽·오른쪽 끝에 붙는 탭이면 그쪽 면을 곧게 세운다
  flushLeft?: boolean;
  flushRight?: boolean;
}

// 폴더 탭 윤곽을 px로 그린다. 정해 둔 path를 늘려 쓰면 모서리가 찌그러지고 옆선과 꺾이므로,
// 위쪽 모서리는 옆선과 윗변에 접하게, 옆선 아래는 본체 윗변과 이어지게 둥글린다.
// height는 본체 위로 보이는 탭 높이, bodyRadius는 본체 모서리 반지름이다.
export function tabPath(
  {
    left,
    width,
    slope,
    corner,
    fillet,
    flushLeft = false,
    flushRight = false,
  }: TabGeometry,
  height: number,
  bodyRadius: number,
) {
  const right = left + width;
  const length = Math.hypot(slope, height);
  const ux = slope / length;
  const uy = height / length;

  // 본체 안쪽까지 내려 그려 둘이 한 덩어리가 되게 한다.
  // 끝에 붙는 쪽은 본체의 둥근 모서리를 덮을 만큼 더 내린다
  const shallow = height + 2;
  const deep = height + bodyRadius;

  const leftSide = flushLeft
    ? [
        `M ${left} ${deep}`,
        `L ${left} ${corner}`,
        `Q ${left} 0 ${left + corner} 0`,
      ]
    : [
        `M ${left - fillet} ${shallow}`,
        `L ${left - fillet} ${height}`,
        `Q ${left} ${height} ${left + ux * fillet} ${height - uy * fillet}`,
        `L ${left + slope - ux * corner} ${uy * corner}`,
        `Q ${left + slope} 0 ${left + slope + corner} 0`,
      ];

  const apex = right - slope;
  const rightSide = flushRight
    ? [
        `L ${right - corner} 0`,
        `Q ${right} 0 ${right} ${corner}`,
        `L ${right} ${deep}`,
      ]
    : [
        `L ${apex - corner} 0`,
        `Q ${apex} 0 ${apex + ux * corner} ${uy * corner}`,
        `L ${right - ux * fillet} ${height - uy * fillet}`,
        `Q ${right} ${height} ${right + fillet} ${height}`,
        `L ${right + fillet} ${shallow}`,
      ];

  return [...leftSide, ...rightSide, "Z"].join(" ");
}
