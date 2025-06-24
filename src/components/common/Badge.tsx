import styled from "styled-components";

const StyledBadge = styled.span`
  border-radius: 100px;
  background-color: pink;
  padding: 0.5rem 1.25rem;
`;

export default function Badge({ text }: { text: string }) {
  return (
    <StyledBadge>
      <span>{text}</span>
    </StyledBadge>
  );
}
