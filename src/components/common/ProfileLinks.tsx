import styled from "styled-components";
import devices from "@constants/devices";
import SOCIAL_LINKS from "@constants/socialLinks";
import { MY_RESUME_URL } from "@constants/urls";

/**
 * 사이드바(데스크톱)와 메뉴 오버레이(모바일)에서 공통으로 쓰는 링크 요소.
 * 노출 뷰포트가 서로 달라 사이즈는 media query로 분기한다.
 * - 기본값: 사이드바(데스크톱)
 * - @media ${devices.md}: 메뉴 오버레이(모바일)
 */

const ResumeAnchor = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.solidBg};
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.solidText};
  text-decoration: none;

  @media ${devices.md} {
    padding: 12px 24px;
    font-size: 0.875rem;
  }
`;

const LangBtn = styled.button`
  border: none;
  background: none;
  text-align: left;
  font-family: inherit;
  font-size: 10px;
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;

  @media ${devices.md} {
    font-size: 13px;
    margin-top: 4px;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 6px;

  @media ${devices.md} {
    gap: 8px;
  }
`;

const SocialAnchor = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.solidBg};
  font-size: 12px;
  color: ${({ theme }) => theme.solidText};

  @media ${devices.md} {
    width: 36px;
    height: 36px;
    font-size: 0.875rem;
  }
`;

export function ResumeButton({ onClick }: { onClick?: () => void }) {
  return (
    <ResumeAnchor
      href={MY_RESUME_URL}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
    >
      이력서 보러가기&nbsp;&nbsp;↗
    </ResumeAnchor>
  );
}

export function LangButton() {
  return (
    <LangBtn type="button" onClick={() => alert("준비중입니다!")}>
      한국어 / EN
    </LangBtn>
  );
}

export function SocialLinks() {
  return (
    <SocialRow>
      {SOCIAL_LINKS.map(({ icon, href, label }) => (
        <SocialAnchor
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
        >
          {icon}
        </SocialAnchor>
      ))}
    </SocialRow>
  );
}
