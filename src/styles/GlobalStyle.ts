import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
	${reset}
	
	* {
		box-sizing: border-box;
	}

	body, button {
		font-family: 'Noto Sans KR', sans-serif;
	}
`;

export default GlobalStyle;
