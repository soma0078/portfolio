import styled from "styled-components";
import { IoMdArrowUp } from "react-icons/io";
import devices from "@constants/devices";
import Badge from "@components/common/Badge";
import { MY_EMAIL, MY_GITHUB_URL, MY_VELOG_URL } from "@constants/urls";

const FooterLayout = styled.footer`
  width: 100%;
  position: relative;

  &:before {
    content: "LEESONGA";
    font-size: 17.5vw;
    line-height: normal;
    font-weight: 800;
    letter-spacing: -2px;
    color: ${({ theme }) => theme.textColorOpacity};
    margin-left: -1.25rem;

    @media ${devices.sm} {
      margin-left: 0;
    }
  }
`;

const ScrollToTopButton = styled.button`
  position: absolute;
  left: 24px;
  bottom: 85%;
  font-size: 1rem;
  transition: all 0.3s;
  z-index: 999;
  display: flex;
  align-items: center;

  .scroll-text {
    position: absolute;
    left: 24px;
    height: 20px;
    transition: all 300ms;
    width: 100px;
    overflow: hidden;
    font-weight: 500;

    span {
      position: absolute;
      left: 0;
      transition: all 300ms;
    }
    .top-text-hover {
      transform: translateY(100%);
    }
  }

  &:hover .top-text {
    transform: translateY(-100%);
  }
  &:hover .top-text-hover {
    transform: translateY(0);
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
`;

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <FooterLayout>
      <ScrollToTopButton onClick={scrollToTop}>
        <IoMdArrowUp />
        <div className="scroll-text">
          <span className="top-text">Back To Top</span>
          <span className="top-text-hover">맨 위로</span>
        </div>
      </ScrollToTopButton>

      <BadgeWrapper>
        <Badge text={MY_EMAIL} />
        <Badge text={MY_GITHUB_URL} />
        <Badge text={MY_VELOG_URL} />
      </BadgeWrapper>
    </FooterLayout>
  );
}

export default Footer;
