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

const flexStyle = css`
  display: flex;
  gap: 8px;
`;

const StyledSubTitle = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 24px;
  padding: 4px 12px 4px 28px;
  position: relative;
  font-size: 0.75rem;
  margin: 0 auto;
  left: 51%;
  transform: translateX(-50%);
  display: inline-block;

  &:before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.dotColor};
    position: absolute;
    top: 35%;
    left: 12px;
  }
`;

const StyledSectionTitle = styled.h2`
  font-family: "Caveat", cursive;
  font-size: 4rem;
  text-align: center;
  margin: 8px 0 48px;
`;

const imgOutlineStyle = css`
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  overflow: hidden;
`;

export {
  hoverPrimaryColor,
  fullViewportSection,
  CenteredContentSection,
  IconContainerStyle,
  LinkIconContainer,
  SkillIconContainer,
  flexStyle,
  StyledSubTitle,
  StyledSectionTitle,
  imgOutlineStyle,
};
