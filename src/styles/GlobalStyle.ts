import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
	${reset}
	
:root {
	--primary-color: #985EA4;
	--primary-color-dark: #824F8D;
}

	* {
		box-sizing: border-box;
	}

	body {
		background-color: ${({ theme }) => theme.bgColor};
		color: ${({ theme }) => theme.textColor};
		line-height: 1.2;
	}

	body, button {
		font-family: 'Noto Sans KR', sans-serif;
	}

	a {
		color: inherit;
	}

	button {
		border: 0;
		cursor: pointer;
		background-color: inherit;
		transition: 0.3s ease;
	}
`;

export default GlobalStyle;
