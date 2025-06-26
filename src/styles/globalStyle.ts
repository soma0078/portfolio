import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import devices from "@constants/devices";

const GlobalStyle = createGlobalStyle`
	${reset}

	
	:root {
		--primary-color: #985EA4;
		--primary-color-dark: #824F8D;
		--primary-gradient: linear-gradient(135deg, #BD4BE5, #5856DE);
		--filterBar-gradient-light: linear-gradient(0deg, #fff, #ffffff81, #ffffff11);
		--filterBar-gradient-dark: linear-gradient(0deg, #0c092a,rgba(12, 9, 42, 0.71), #0c092a11);
	}

	*, body {
		box-sizing: border-box;
		font-family: 'Montserrat','Pretendard', sans-serif;
	}

	body {
		background-color: ${({ theme }) => theme.bgColor};
		color: ${({ theme }) => theme.textColor};
		line-height: 1.2;
		scrollbar-width: thin;
		overflow-x: hidden;
	}

	a {
		color: inherit;
	}

	button {
		border: 0;
		cursor: pointer;
		background-color: inherit;
		transition: 0.3s ease;
		color:${({ theme }) => theme.textColor}
	}

	p, li {
		font-size:1rem;
		line-height: 1.4;
	}

	::-webkit-scrollbar {
		width: 0;
	}
	
	/* ::-webkit-scrollbar-thumb {
		background: var(--primary-color);
		border-radius: 4px;
		&:hover {
			background: var(--primary-color-dark);
		}
	}
	
	::-webkit-scrollbar-track {
		background-color: transparent;
		
	} */

	.popup-project-title {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 16px;
	}

	@media ${devices.lg} {
		.popup-project-title {
			font-size: 1.7rem;
		}
	}

	@media ${devices.sm} {
		p, li {
			font-size:0.875rem;
		}
		.popup-project-title {
		font-size: 1.25rem;
		margin-bottom: 12px;
		}
	}


`;

export default GlobalStyle;
