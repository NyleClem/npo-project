// client/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/UploadPage";
import ViewDataPage from "./pages/ViewDataPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/view" element={<ViewDataPage />} />
      </Routes>
    </BrowserRouter>
  );
}