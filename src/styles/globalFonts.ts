import { createGlobalStyle } from "styled-components";
import NotoSansKrExtraBold from "../assets/fonts/NotoSansKr/NotoSansKR-ExtraBold.woff2";
import NotoSansKrBold from "../assets/fonts/NotoSansKr/NotoSansKR-Bold.woff2";
import NotoSansKrSemiBold from "../assets/fonts/NotoSansKr/NotoSansKR-SemiBold.woff2";
import NotoSansKrMedium from "../assets/fonts/NotoSansKr/NotoSansKR-Medium.woff2";
import NotoSansKrRegular from "../assets/fonts/NotoSansKr/NotoSansKR-Regular.woff2";
import NotoSansKrLight from "../assets/fonts/NotoSansKr/NotoSansKR-Light.woff2";
import CaveatBold from "../assets/fonts/Caveat/Caveat-Bold.woff2";
import CaveatRegular from "../assets/fonts/Caveat/Caveat-Regular.woff2";
import MontserratExtraBold from "../assets/fonts/Montserrat/Montserrat-ExtraBold.woff2";
import MontserratRegular from "../assets/fonts/Montserrat/Montserrat-Regular.woff2";

export default createGlobalStyle`
@font-face {
		font-family: "Noto Sans KR";
		src: local("Noto Sans KR") url(${NotoSansKrExtraBold})
			format("woff2");
		font-weight: 800;
		font-style: normal;
	}

	@font-face {
		font-family: "Noto Sans KR";
		src: local("Noto Sans KR") url(${NotoSansKrBold}) format("woff2");
		font-weight: 700;
		font-style: normal;
	}

	@font-face {
		font-family: "Noto Sans KR";
		src: local("Noto Sans KR") url(${NotoSansKrSemiBold})
			format("woff2");
		font-weight: 600;
		font-style: normal;
	}

	@font-face {
		font-family: "Noto Sans KR";
		src: local("Noto Sans KR") url(${NotoSansKrMedium}) format("woff2");
		font-weight: 500;
		font-style: normal;
	}

	@font-face {
		font-family: "Noto Sans KR";
		src: local("Noto Sans KR") url(${NotoSansKrRegular}) format("woff2");
		font-weight: 400;
		font-style: normal;
	}

	@font-face {
		font-family: "Noto Sans KR";
		src: local("Noto Sans KR") url(${NotoSansKrLight}) format("woff2");
		font-weight: 300;
		font-style: normal;
	}

	@font-face {
		font-family: "Caveat";
		src: url(${CaveatBold}) format("woff2");
		font-weight: 700;
		font-style: normal;
	}

	@font-face {
		font-family: "Caveat";
		src: url(${CaveatRegular}) format("woff2");
		font-weight: 400;
		font-style: normal;
	}

	@font-face {
		font-family: "Montserrat";
		src: local("Montserrat") url(${MontserratExtraBold})
			format("woff2");
		font-weight: 800;
		font-style: normal;
	}

	@font-face {
		font-family: "Montserrat";
		src: local("Montserrat") url(${MontserratRegular}) format("woff2");
		font-weight: 400;
		font-style: normal;
	} 
`;
