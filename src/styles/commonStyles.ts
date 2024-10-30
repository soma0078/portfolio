import styled, { css } from "styled-components";

// 공통 컬러 스타일
const hoverPrimaryColor = css`
  &:hover {
    color: var(--primary-color);
  }
`;

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

// 아이콘 스타일
const IconContainerStyle = css`
  display: flex;
  gap: 8px;

  svg {
    font-size: 1.5rem;
  }
`;

const LinkIconContainer = styled.div`
  ${IconContainerStyle}

  svg {
    cursor: pointer;
  }

  :hover {
    > {
      ${hoverPrimaryColor}
    }
  }
`;

const SkillIconContainer = styled.div`
  ${IconContainerStyle}
`;

export {
  hoverPrimaryColor,
  fullViewportSection,
  CenteredContentSection,
  IconContainerStyle,
  LinkIconContainer,
  SkillIconContainer,
};
