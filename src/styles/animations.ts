import { keyframes } from "styled-components";

// 인트로 애니메이션
const shrinkToCircle = keyframes`
	0% {
		width: 100vw;
		height: 100vw;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	50% {
		border-radius: 500px;
		top: 20%;
		left: 60%;
	}
	100% {
		width: 95px;
		height: 95px;
		position: absolute;
		top: 37%;
		left: 65%;
		border-radius: 999px;
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

export { shrinkToCircle, fadeInSoft, fadeInBold, fadeOutSoft, fadeOutBold, expandWidth };
