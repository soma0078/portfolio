import { useEffect, useState } from "react";
import { IoMdArrowUp } from "react-icons/io";
import styled from "styled-components";

const FooterLayout = styled.footer`
  width: 100%;
  padding: 24px;
  position: relative;

  .copyright {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: #cacaca;
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  border-radius: 99px;
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 1.25rem;
  border: 1px solid #d2d2d2;
  color: #b4b4b4;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  transition: all 0.3s;

  &:hover {
    background-color: #efefef;
  }
`;

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FooterLayout>
      <span className="copyright">ⓒ 2024 LeeSonga. All Rights Reserved.</span>

      {isVisible && (
        <ScrollToTopButton onClick={scrollToTop}>
          <IoMdArrowUp />
        </ScrollToTopButton>
      )}
    </FooterLayout>
  );
}

export default Footer;
