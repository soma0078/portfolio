import { Link } from "react-scroll";
import MENU_ITEMS from "@constants/menuItems";
import { ResumeButton, SocialLinks } from "@components/common/ProfileLinks";

const CURTAIN = [
  "before:absolute before:top-0 before:right-0 before:-z-20 before:bg-(--legacy-bg-soft) before:content-['']",
  "after:absolute after:top-0 after:right-0 after:-z-20 after:bg-(--legacy-bg) after:content-['']",
  "before:pointer-events-none after:pointer-events-none",
  "before:transition-all before:duration-700 before:ease-[cubic-bezier(0.77,0,0.175,1)]",
  "after:transition-all after:duration-700 after:ease-[cubic-bezier(0.77,0,0.175,1)]",
].join(" ");

const CURTAIN_OPEN =
  "before:h-dvh before:w-screen before:rounded-bl-none before:delay-0 after:h-dvh after:w-screen after:rounded-bl-none after:delay-200";
const CURTAIN_CLOSED =
  "before:h-0 before:w-0 before:rounded-bl-[200%] before:delay-200 after:h-0 after:w-0 after:rounded-bl-[200%] after:delay-0";

const NAV_LINK =
  "cursor-pointer transition-all duration-300 hover:-skew-x-12 [&:hover>div]:bg-[image:var(--primary-gradient)] [&:hover>div]:bg-clip-text [&:hover>div]:text-transparent";

function MenuOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const enter = (index: number) =>
    isOpen
      ? {
          opacity: 1,
          transform: "translateX(0)",
          transitionDelay: `${index * 0.1 + 0.5}s`,
        }
      : { opacity: 0, transform: "translateX(20px)", transitionDelay: "0s" };

  return (
    <nav
      className={`fixed top-0 left-0 -z-10 flex h-dvh w-screen flex-col items-center justify-center gap-3 overflow-hidden px-6 ${CURTAIN} ${
        isOpen
          ? `pointer-events-auto ${CURTAIN_OPEN}`
          : `pointer-events-none ${CURTAIN_CLOSED}`
      }`}
    >
      {MENU_ITEMS.map(({ menu, id }, index) => (
        <Link
          key={id}
          to={id}
          spy={true}
          smooth={true}
          duration={600}
          onClick={onClose}
          className={NAV_LINK}
        >
          <div
            className="text-[2rem] font-bold text-(--legacy-text) transition-all duration-500 ease-out"
            style={enter(index)}
          >
            {menu}
          </div>
        </Link>
      ))}

      <div
        className="mt-6 flex flex-col items-center gap-5 transition-all duration-500 ease-out"
        style={enter(MENU_ITEMS.length)}
      >
        <ResumeButton onClick={onClose} />
        <SocialLinks />
      </div>
    </nav>
  );
}

export default MenuOverlay;
