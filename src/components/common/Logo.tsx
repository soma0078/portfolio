import { useId } from "react";
import Lottie from "lottie-react";
import gradientBlobAnimation from "@lottie/gradientBlob.json";
import TransitionLink from "./TransitionLink";
import SoftVolumeFilter from "./SoftVolumeFilter";
import { SOFT_VOLUME_LOGO } from "src/utils/softVolume";

function Logo() {
  // 헤더와 사이드바에 로고가 둘 있어서 필터 id가 겹치지 않게 한다
  const filterId = `logo-volume${useId().replace(/:/g, "")}`;

  return (
    <TransitionLink
      to={"/"}
      className="flex items-center justify-center font-bold text-(--legacy-text) max-sm:text-base"
    >
      <svg aria-hidden width={0} height={0} className="absolute">
        <defs>
          <SoftVolumeFilter id={filterId} volume={SOFT_VOLUME_LOGO} />
        </defs>
      </svg>
      {/* 블롭 모양을 따라가야 해서 box-shadow 대신 SVG 필터를 건다 */}
      <Lottie
        animationData={gradientBlobAnimation}
        loop
        style={{ width: 124, opacity: 0.7, filter: `url(#${filterId})` }}
      />
      <span className="absolute grid text-center">
        <em className="tracking-wider">
        LEE SONGA
        </em>
        <em className="tracking-wide">
        PORTFOLIO
        </em>
      </span>
    </TransitionLink>
  );
}

export default Logo;
