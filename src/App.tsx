import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { store } from "./store/store";
import DefaultLayout from "./layouts/DefaultLayout";
import PageLoader from "./components/PageLoader";
import { useShallow } from "zustand/shallow";

// Lazy imports per code-splitting
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const ModifyCategoriesPage = lazy(() => import("./pages/ModifyCategoriesPage"));

function App() {

  const {
    fetchCategories, fetchTransactions, date
  } = store(
    useShallow(s => ({
      fetchTransactions: s.fetchTransactions,
      fetchCategories: s.fetchCategories,
      error: s.errorMessage,
      setError: s.setError,
      date: s.date
    }))
  );

  useEffect(() => {
    fetchTransactions();
  }, [date]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index element={<Navigate to="/transactions" />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/modify-categories" element={<ModifyCategoriesPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
