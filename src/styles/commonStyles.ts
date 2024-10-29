import styled, { css } from "styled-components";

// 공통 섹션 스타일
const sectionCommonStyle = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const CommonSection = styled.section`
  ${sectionCommonStyle}
`;

export { sectionCommonStyle, CommonSection };
