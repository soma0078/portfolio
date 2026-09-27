import { IoMdArrowUp } from "react-icons/io";
import Badge from "@components/common/Badge";
import { MY_BLOG_URL, MY_EMAIL, MY_GITHUB_URL } from "@constants/urls";

const ORBIT = `@keyframes footer-orbit {
  0%   { transform: rotate(0deg) translateX(5px) rotate(0deg); }
  50%  { transform: rotate(180deg) translateX(5px) rotate(-180deg); }
  100% { transform: rotate(360deg) translateX(5px) rotate(-360deg); }
}`;

const BADGE = "absolute -translate-y-1/2 text-white";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full before:-ml-5 before:text-[17.5vw] before:leading-normal before:font-extrabold before:tracking-[-2px] before:text-(--legacy-text-faint) before:content-['LEESONGA'] max-sm:before:ml-0">
      <style>{ORBIT}</style>

      <button
        onClick={scrollToTop}
        className="group absolute bottom-[85%] left-6 z-999 flex items-center text-base transition-all duration-300"
      >
        <IoMdArrowUp size={20} />
        <div className="absolute bottom-0 left-7.5 h-[19px] w-25 overflow-hidden font-medium">
          <span className="absolute left-0 transition-all duration-300 group-hover:-translate-y-full">
            Back To Top
          </span>
          <span className="absolute left-0 translate-y-full transition-all duration-300 group-hover:translate-y-0">
            맨 위로
          </span>
        </div>
      </button>

      <div className="max-md:hidden">
        <span
          className={`${BADGE} bottom-[40%] left-[5%]`}
          style={{ animation: "footer-orbit 6s linear 2s infinite" }}
        >
          <Badge text={MY_EMAIL} />
        </span>
        <span
          className={`${BADGE} bottom-[20%] left-[40%]`}
          style={{ animation: "footer-orbit 5s linear infinite reverse" }}
        >
          <Badge text={MY_GITHUB_URL.slice(8)} />
        </span>
        <span
          className={`${BADGE} right-[7%] bottom-[55%]`}
          style={{ animation: "footer-orbit 4s linear infinite" }}
        >
          <Badge text={MY_BLOG_URL.slice(8)} />
        </span>
      </div>
    </footer>
  );
}

export default Footer;
