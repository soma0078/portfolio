import { Route, Routes } from "react-router-dom";
import Layout from "@components/layout/Layout";
import HomePage from "@components/pages/home";
import AboutPage from "@components/pages/about";
import ProjectPage from "@components/pages/projects";
import ProjectDetailPage from "@components/pages/[projectId]";
import NotFoundPage from "@components/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/projects/:projectId" element={<ProjectDetailPage />} />

      <Route element={<Layout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
