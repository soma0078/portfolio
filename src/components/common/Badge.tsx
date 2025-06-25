import styled from "styled-components";

const StyledBadge = styled.span`
  border-radius: 100px;
  background: var(--primary-gradient);
  padding: 0.5rem 1.25rem;
  color: #cecece;
`;

export default function Badge({ text }: { text: string }) {
  return (
    <StyledBadge>
      <span>{text}</span>
    </StyledBadge>
  );
}
