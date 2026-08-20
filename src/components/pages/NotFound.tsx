import Lottie from "lottie-react";
import notfoundLottie from "../../assets/lottie/notfound.json";

export default function NotFoundPage() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <Lottie animationData={notfoundLottie} />
    </div>
  );
}
