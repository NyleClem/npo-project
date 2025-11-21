import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";   
import ViewDataPage from "./pages/ViewDataPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/view" element={<ViewDataPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;