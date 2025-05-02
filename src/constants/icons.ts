import HTMLIcon from "@icons/icon_html.png";
import CSSIcon from "@icons/icon_css.png";
import JSIcon from "@icons/icon_js.png";
import TSIcon from "@icons/icon_ts.png";
import ReactIcon from "@icons/icon_react.png";
import NextIcon from "@icons/icon_nextjs.png";
import GitIcon from "@icons/icon_git.png";
import GithubIcon from "@icons/icon_github.png";
import JiraIcon from "@icons/icon_jira.png";
import NotionIcon from "@icons/icon_notion.png";
import FigmaIcon from "@icons/icon_figma.png";
import PsIcon from "@icons/icon_photoshop.png";
import AiIcon from "@icons/icon_illustrator.png";
import VercelIcon from "@icons/icon_vercel.png";
import NetlifyIcon from "@icons/icon_netlify.png";
import TanstackQueryIcon from "@icons/icon_tanstackquery.png";
import TailwindCSSIcon from "@icons/icon_tailwindcss.png";
import ScssIcon from "@icons/icon_scss.png";
import JotaiIcon from "@icons/icon_jotai.png";
import KakaoApiIcon from "@icons/icon_kakao.png";
import StyledcomponentsIcon from "@icons/icon_styledcomponents.png";
import ZustandIcon from "@icons/icon_zustand.png";

const skillImageArray = [
  { src: HTMLIcon, alt: "HTML5" },
  { src: CSSIcon, alt: "CSS" },
  { src: JSIcon, alt: "JavaScript" },
  { src: TSIcon, alt: "TypeScript" },
  { src: ReactIcon, alt: "React" },
  { src: NextIcon, alt: "Nextjs" },
];

const toolImageArray = [
  { src: GitIcon, alt: "Git" },
  { src: GithubIcon, alt: "Github" },
  { src: JiraIcon, alt: "Jira" },
  { src: NotionIcon, alt: "Notion" },
  { src: FigmaIcon, alt: "Figma" },
  { src: PsIcon, alt: "Photoshop" },
  { src: AiIcon, alt: "Illustrator" },
];

const iconMap = {
  javascript: JSIcon,
  typescript: TSIcon,
  react: ReactIcon,
  next: NextIcon,
  vercel: VercelIcon,
  netlify: NetlifyIcon,
  tanstackquery: TanstackQueryIcon,
  tailwindcss: TailwindCSSIcon,
  styledcomponents: StyledcomponentsIcon,
  scss: ScssIcon,
  jotai: JotaiIcon,
  kakaoapi: KakaoApiIcon,
  jira: JiraIcon,
  zustand: ZustandIcon,
};

export { skillImageArray, toolImageArray, iconMap };
