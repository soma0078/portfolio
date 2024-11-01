import HTMLIcon from "../assets/icons/icon_html.png";
import CSSIcon from "../assets/icons/icon_css.png";
import JSIcon from "../assets/icons/icon_js.png";
import TSIcon from "../assets/icons/icon_ts.png";
import ReactIcon from "../assets/icons/icon_react.png";
import NextIcon from "../assets/icons/icon_nextjs.png";
import GitIcon from "../assets/icons/icon_git.png";
import GithubIcon from "../assets/icons/icon_github.png";
import JiraIcon from "../assets/icons/icon_jira.png";
import NotionIcon from "../assets/icons/icon_notion.png";
import FigmaIcon from "../assets/icons/icon_figma.png";
import PsIcon from "../assets/icons/icon_photoshop.png";
import AiIcon from "../assets/icons/icon_illustrator.png";
import VercelIcon from "../assets/icons/icon_vercel.png";
import NetlifyIcon from "../assets/icons/icon_netlify.png";
import TanstackQueryIcon from "../assets/icons/icon_tanstackquery.png";
import TailwindCSSIcon from "../assets/icons/icon_tailwindcss.png";
import ScssIcon from "../assets/icons/icon_scss.png";
import JotaiIcon from "../assets/icons/icon_jotai.png";
import KakaoApiIcon from "../assets/icons/icon_kakao.png";
import StyledcomponentsIcon from "../assets/icons/icon_styledcomponents.png";

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
};

export { skillImageArray, toolImageArray, iconMap };
