import styled from "styled-components";
import Button from "./ui/Button";
import { MdTune } from "react-icons/md";

interface FilterProps {
  selectedCategory: string;
  setSelectedCatergory: (category: string) => void;
}

const StyledButton = styled(Button)`
  font-size: 0.75rem;
  padding: 8px 16px;
`;

const StyledFilter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
`;

function Filter({ selectedCategory, setSelectedCatergory }: FilterProps) {
  const category = ["All", "Team", "Single"];

  return (
    <StyledFilter>
      <MdTune size={24} />
      <div>
        {category.map((item) => {
          const isSelected = selectedCategory === item;

          return (
            <StyledButton
              key={item}
              primary={isSelected}
              outline={!isSelected}
              buttonText={item}
              onClick={() => setSelectedCatergory(item)}
            />
          );
        })}
      </div>
    </StyledFilter>
  );
}

export default Filter;
