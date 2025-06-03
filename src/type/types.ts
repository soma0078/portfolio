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

export interface Data {
  experience: ExperienceItem[];
}
