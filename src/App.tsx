import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { store } from "./store/store";
import DefaultLayout from "./layouts/DefaultLayout";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {

  const fetchCategories = store(s => (s.fetchCategories));

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index element={<Navigate to="/transactions" />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/modify-categories" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
