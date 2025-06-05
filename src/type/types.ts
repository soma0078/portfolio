export interface ExperienceItem {
  id: number;
  title: string;
  name: string;
  desc: string;
  date: string;
  thumbnailImgSrc: string;
  logoImgSrc: string;
  category: "work experience" | "education";
  tag: string[];
}

export interface SkillItem {
  id: number;
  imgSrc: string;
  name: string;
}

export interface BaseProject {
  id: number;
  category: "team" | "personal" | "work";
  title: string;
  projectTitle: string;
  imgSrc: string;
  gifSrc: string;
  details: { title: string; desc: string | string[] }[];
  feature: {
    title: string;
    description: string | string[];
  };
  screenShots: string[];
  url: {
    view: string;
  };
}

export interface TeamOrPersonalProject extends BaseProject {
  category: "team" | "personal";
  task: {
    title: string;
    description: string[];
  }[];
  troubleShooting: {
    title: string;
    description: string[];
  };
  url: {
    view: string;
    github: string;
  };
}

export interface WorkProject extends BaseProject {
  category: "work";
}

export type Project = TeamOrPersonalProject | WorkProject;

export interface Data {
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: Project[];
}
