import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiTistory } from "react-icons/si";
import { MY_BLOG_URL, MY_GITHUB_URL, MY_LINKEDIN_URL } from "@constants/urls";

const SOCIAL_LINKS = [
  { icon: <FaGithub />, href: MY_GITHUB_URL, label: "GitHub" },
  { icon: <FaLinkedinIn />, href: MY_LINKEDIN_URL, label: "LinkedIn" },
  { icon: <SiTistory />, href: MY_BLOG_URL, label: "Tistory" },
];

export default SOCIAL_LINKS;
