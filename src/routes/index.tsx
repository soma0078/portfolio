import { Route, Routes } from "react-router-dom";
import { data } from "src/assets/data";
import Layout from "@components/layout/Layout";
import ProjectPage from "@components/pages/projects";
import ProjectDetailPage from "@components/pages/[projectId]";
import NotFoundPage from "@components/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/projects"
          element={<ProjectPage data={data.projects} />}
        />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
