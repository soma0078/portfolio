# 🧩 포트폴리오 사이트

경력과 작업물, 각 프로젝트에서 무엇을 판단했는지를 정리한 사이트입니다.

## 프로젝트 개요
- 프로젝트 기간 : `2026 ~ `
- [배포 사이트](https://leesonga-portfolio.netlify.app)
- 기술 스택 
  - 프레임워크 · 언어 : `React` `TypeScript` `Vite`
  - 스타일 : `TailwindCSS v4`
  - 애니메이션 : `GSAP`
  - 배포 · 자동화 : `Netlify` `Github Actions`

## 주요 기능

- **테마·페이지 전환** — View Transitions API
- **관성 스크롤** — GSAP ScrollSmoother
- **블로그 글 자동 반영** — 티스토리 RSS 빌드 시점 수집, GitHub Actions 일 1회 재배포
- **반응형** — 데스크톱·태블릿·모바일

## 작업 화면
<table>
  <tr><th>Home</th></tr>
  <tr><td><img alt="home" src="https://github.com/user-attachments/assets/65dfcc99-f6f9-4662-bc90-bbe093c3d574" /></td></tr>
  <tr><td>- 더 네 장을 펼치고 접는 인터랙션.<br/>- 각 폴더가 About·Projects 등으로 이어집니다</td></tr>
</table>

<table>
  <tr><th>About</th></tr>
  <tr><td><img alt="about" src="https://github.com/user-attachments/assets/df39aebe-57a8-4dcd-944a-50d087a7ffbe" /></td></tr>
  <tr><td>- 소개, 경력, 기술 스택, 블로그</td></tr>
</table>

<table>
  <tr><th>Projects</th></tr>
  <tr><td><img alt="projects" src="https://github.com/user-attachments/assets/69918f60-a04d-4b3a-89c3-60f7fc8cbb7c" /></td></tr>
  <tr><td>- 프로젝트 목록<br/>- 썸네일 갤러리<br/>- 프로젝트 상세 팝오버</td></tr>
</table>

<table>
  <tr><th>반응형 웹</th></tr>
  <tr><td><img width="644" height="1158" alt="responsive" src="https://github.com/user-attachments/assets/8607f2f2-a79f-402c-9859-238b6117f888" />
</td></tr>
  <tr><td>- 데스크톱, 테블릿, 모바일 브라우저 사이즈에 맞춰 반응형으로 구현</td></tr>
</table>

## 폴더 구조

```
src/
├── components/
│   ├── about/       소개 화면 섹션
│   ├── common/      메뉴, 프로필 링크 등 공용 요소
│   ├── home/        홈 폴더 인터랙션
│   ├── layout/      헤더·사이드바·푸터·스크롤
│   ├── pages/       화면 진입점
│   └── projects/    목록·상세 블록
├── constants/       화면에 들어가는 데이터
├── hooks/
├── styles/
└── utils/
scripts/             블로그 글 수집 스크립트
```
