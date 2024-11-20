import styled from "styled-components";
import {
  CenteredContentSection,
  flexStyle,
  StyledSubTitle,
} from "../../styles/commonStyles";
import LinkIcon from "../ui/LinkIcon";
import { SiGmail } from "react-icons/si";
import { MY_EMAIL, MY_GITHUB_URL } from "../../constants/urls";
import { FaGithub } from "react-icons/fa";
import devices from "../../constants/devices";

const ContactSection = styled(CenteredContentSection)`
  padding: 0 24px;
  min-height: 60vh;

  p {
    text-align: center;
    line-height: 1.4;
  }

  .link-icons {
    ${flexStyle}
    gap: 16px;
    justify-content: center;
    margin-top: 44px;

    svg {
      font-size: 2rem;
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

  @media ${devices.sm} {
    .link-icons {
      gap: 56px;

      svg {
        font-size: 4rem;
      }
    }
  }
`;

const StyledSectionTitle = styled.h2`
  font-size: 3.5rem;
  text-align: center;
  padding: 12px 0 32px 0;
`;

function Contact() {
  return (
    <ContactSection>
      <StyledSubTitle>Contact</StyledSubTitle>
      <StyledSectionTitle>방문해 주셔서 감사합니다 :)</StyledSectionTitle>
      <p>
        프론트엔드 개발자로서 끊임없이 성장하고 싶습니다. 낯선 기술에도 주저
        없이 도전하고, 항상 사용자의 관점에서 생각하며 더 나은 서비스를 만들어
        나가겠습니다.
      </p>
      <p>
        함께 일하는 동료들과 협력하며, 서로 배우고 발전하는 과정을 통해 신뢰받는
        개발자가 되겠습니다.
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
    </ContactSection>
  );
}

export default Contact;
