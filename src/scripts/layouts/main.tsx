import Header from "../components/Header.tsx";
import { Route, Routes } from "react-router-dom";
import ListPage from "../pages/ListPage.tsx";
import ItemPage from "../pages/ItemPage.tsx";
import StatsPage from "../pages/StatsPage.tsx";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/list" element={<ListPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </>
  );
}
