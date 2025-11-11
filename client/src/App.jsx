// client/src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/UploadPage";
import ViewData from "./pages/ViewDataPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/view" element={<ViewData />} />
      </Routes>
    </BrowserRouter>
  );
}
