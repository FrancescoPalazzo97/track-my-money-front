import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { store } from "./store/store";
import DefaultLayout from "./layouts/DefaultLayout";
import LoadingFallback from "./components/LoadingFallback";
import { useShallow } from "zustand/shallow";

// Lazy loading delle pagine per code-splitting
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
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index element={<Navigate to="/transactions" />} />
          <Route path="/transactions" element={
            <Suspense fallback={<LoadingFallback />}>
              <TransactionsPage />
            </Suspense>
          } />
          <Route path="/categories" element={
            <Suspense fallback={<LoadingFallback />}>
              <CategoriesPage />
            </Suspense>
          } />
          <Route path="/settings" element={
            <Suspense fallback={<LoadingFallback />}>
              <SettingsPage />
            </Suspense>
          } />
          <Route path="/modify-categories" element={
            <Suspense fallback={<LoadingFallback />}>
              <ModifyCategoriesPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
