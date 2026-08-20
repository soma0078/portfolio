import Lottie from "lottie-react";
import gradientBlobAnimation from "@lottie/gradientBlob.json";

function Logo() {
  return (
    <div className="flex items-center justify-center font-['Montserrat',sans-serif] text-lg leading-[1.125rem] font-bold text-(--legacy-text) max-sm:text-base">
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
    </div>
  );
}

export default Logo;
