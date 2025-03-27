import { keyframes } from "styled-components";

// 인트로 애니메이션
const introVisible = keyframes`
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`;

const fadeInSoft = keyframes`
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.1;
		
	}
	100% {
		opacity: 0.2;
	}
`;

const fadeInBold = keyframes`
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.5;
		
	}
	100% {
		opacity: 1;
	}
`;

const fadeOutSoft = keyframes`
	0% {
		opacity: 0.2;
	}
	100% {
		opacity: 0;
	}
`;

const fadeOutBold = keyframes`
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`;

// 비주얼 애니메이션
const expandWidth = keyframes`
	0% {
		width: 0;
		background-position: 0 center;
	}
	100% {
		width: 100%;
	}
`;

const spin = keyframes`
	to { transform: rotate(360deg); }
`;

// 툴팁 애니메이션
const tooltip = keyframes`
  0% { opacity: 0; }
  30% { opacity: 1; }
  100% { opacity: 1;}
`;

export {
  introVisible,
  fadeInSoft,
  fadeInBold,
  fadeOutSoft,
  fadeOutBold,
  expandWidth,
  tooltip,
  spin,
};
