import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { store } from "./store/store";
import DefaultLayout from "./layouts/DefaultLayout";
import TransactionsPage from "./pages/TransactionsPage";
import SettingsPage from "./pages/SettingsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ModifyCategoriesPage from "./pages/ModifyCategoriesPage";
import { useShallow } from "zustand/shallow";
import { useTryCatch } from "./hooks/useTryCatch";
import type { tryCatch } from "./lib/tryCatch";

function App() {

  const {
    fetchCategories, fetchTransactions,
    error, setError
  } = store(
    useShallow(s => ({
      fetchTransactions: s.fetchTransactions,
      fetchCategories: s.fetchCategories,
      error: s.errorMessage,
      setError: s.setError
    }))
  );

  useEffect(() => {
    try {
      fetchCategories();
      fetchTransactions();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      setError();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index element={<Navigate to="/transactions" />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/modify-categories" element={<ModifyCategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
