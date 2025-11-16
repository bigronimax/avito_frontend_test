import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
