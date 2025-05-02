import styled from "styled-components";
import {
  CenteredContentSection,
  flexStyle,
  StyledSubTitle,
} from "@styles/commonStyles";
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import LinkIcon from "@ui/LinkIcon";
import { MY_EMAIL, MY_GITHUB_URL } from "@constants/urls";
import devices from "@constants/devices";
import { BlurIn } from "@components/BlurIn";

function Contact() {
  return (
    <ContactSection id="contact">
      <BlurIn>
        <StyledSubTitle>Contact</StyledSubTitle>
        <StyledSectionTitle>방문해 주셔서 감사합니다 :)</StyledSectionTitle>
        <p>
          항상 사용자의 관점에서 고민하며, 더 나은 경험을 만들어가는 데
          집중하겠습니다.
        </p>
        <p>
          또한 함께 일하는 동료들과 협력하며 서로 배우고 성장하는 과정에서
          신뢰받는 사람이 되겠습니다.
        </p>
        <div className="link-icons">
          <div className="link-icon">
            <LinkIcon href={MY_GITHUB_URL} icon={FaGithub} target="_blank" />
            <span>Github</span>
          </div>
          <div className="link-icon">
            <LinkIcon href={`mailto:${MY_EMAIL}`} icon={SiGmail} />
            <span>Email</span>
          </div>
        </div>
      </BlurIn>
    </ContactSection>
  );
}

export default Contact;

const ContactSection = styled(CenteredContentSection)`
  padding: 0 24px;
  min-height: 60vh;

  p {
    text-align: center;
    line-height: 1.4;
  }

  .link-icons {
    ${flexStyle}
    gap: 56px;
    justify-content: center;
    margin-top: 44px;

    svg {
      font-size: 4rem;
    }

    .link-icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      transition: all 0.8s;

      span {
        opacity: 0;
        color: var(--primary-color);
        transition: all 0.5s;
      }

      &:hover {
        color: var(--primary-color);

        span {
          opacity: 1;
        }
      }
    }
  }

  @media ${devices.lg} {
    min-height: auto;
    padding-bottom: 120px;
  }

  @media ${devices.sm} {
    .link-icons {
      gap: 16px;

      svg {
        font-size: 2rem;
      }
    }
  }
`;

const StyledSectionTitle = styled.h2`
  font-size: 3.5rem;
  text-align: center;
  padding: 12px 0 32px 0;

  @media ${devices.lg} {
    font-size: 2.75rem;
  }

  @media ${devices.sm} {
    font-size: 1.5rem;
  }
`;
