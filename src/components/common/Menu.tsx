interface HamburgerProps {
  onClick: () => void;
  isOpen: boolean;
}

const BAR = "absolute left-0 h-[3px] w-full rounded-sm bg-(--legacy-text)";
const BAR_MOTION =
  "transition-transform duration-500 ease-[cubic-bezier(0.8,0.5,0.2,1.4)]";

const TEXT =
  "absolute left-0 pt-[3px] text-base font-semibold transition-all duration-300";

function Menu({ onClick, isOpen }: HamburgerProps) {
  return (
    <div className="group flex cursor-pointer gap-2" onClick={onClick}>
      <div className="relative h-5 w-[45px] overflow-hidden">
        <span
          className={`${TEXT} ${isOpen ? "opacity-0" : "group-hover:-translate-y-full"}`}
        >
          Menu
        </span>
        <span
          className={`${TEXT} translate-y-full ${isOpen ? "opacity-0" : "group-hover:translate-y-0"}`}
        >
          Open
        </span>
        <span className={`${TEXT} ${isOpen ? "opacity-100" : "opacity-0"}`}>
          Close
        </span>
      </div>

      <div className="relative h-[21px] w-6 cursor-pointer">
        <span
          className={`${BAR} ${BAR_MOTION} ${
            isOpen
              ? "top-[11px] rotate-45"
              : "top-0 group-hover:-rotate-3 group-hover:scale-y-110"
          }`}
        />
        <span
          className={`${BAR} top-[9px] transition-opacity duration-500 ${
            isOpen
              ? "opacity-0"
              : "opacity-100 group-hover:rotate-3 group-hover:scale-y-110"
          }`}
        />
        <span
          className={`${BAR} ${BAR_MOTION} ${
            isOpen
              ? "top-[11px] -rotate-45"
              : "bottom-0 group-hover:-rotate-4 group-hover:scale-y-110"
          }`}
        />
      </div>
    </div>
  );
}

export default Menu;
