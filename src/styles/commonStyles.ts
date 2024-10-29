import styled, { css } from "styled-components";

// 공통 섹션 스타일
const fullViewportSectionStyle = css`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const fullViewportSection = styled.section`
  ${fullViewportSectionStyle}
`;

const CenteredContentSection = styled(fullViewportSection)`
  max-width: 1400px;
  margin: 0 auto;
`;

export {
  fullViewportSectionStyle,
  fullViewportSection,
  CenteredContentSection,
};
