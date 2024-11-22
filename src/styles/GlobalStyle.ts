import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
	${reset}
	
	:root {
		--primary-color: #985EA4;
		--primary-color-dark: #824F8D;
		
	}

	*, body {
		box-sizing: border-box;
		font-family: 'Noto Sans KR', sans-serif;
		transition: all 0.3s;
	}

	body {
		background-color: ${({ theme }) => theme.bgColor};
		color: ${({ theme }) => theme.textColor};
		line-height: 1.2;
		scrollbar-width: thin;
		
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

	::-webkit-scrollbar {
		width: 8px;
		height: 15px;
	}
	
	::-webkit-scrollbar-thumb {
		background: var(--primary-color);
		border-radius: 4px;
	}
	
	::-webkit-scrollbar-track {
		background-color: #a0a0a5;
		border-radius: 12px;
	}

	.popup-project-title {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 16px;
	}
`;

export default GlobalStyle;
