import Lottie from "lottie-react";
import gradientBlobAnimation from "@lottie/gradientBlob.json";
import TransitionLink from "./TransitionLink";

function Logo() {
  return (
    <TransitionLink
      to={"/"}
      className="flex items-center justify-center font-bold text-(--legacy-text) max-sm:text-base"
    >
      <Lottie
        animationData={gradientBlobAnimation}
        loop
        style={{ width: 124, opacity: 0.7 }}
      />
      <span className="absolute">
        LEE SONGA
        <br />
        PORTFOLIO
      </span>
    </TransitionLink>
  );
}

export default Logo;
