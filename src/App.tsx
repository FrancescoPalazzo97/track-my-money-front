import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { store } from "./store/store";
import DefaultLayout from "./layouts/DefaultLayout";
import PageLoader from "./components/PageLoader";
import RouteLoader from "./components/RouteLoader";
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
            <Route path="/transactions" element={
              <Suspense fallback={<RouteLoader routeName="transactions" />}>
                <TransactionsPage />
              </Suspense>
            } />
            <Route path="/categories" element={
              <Suspense fallback={<RouteLoader routeName="categories" />}>
                <CategoriesPage />
              </Suspense>
            } />
            <Route path="/settings" element={
              <Suspense fallback={<RouteLoader routeName="settings" />}>
                <SettingsPage />
              </Suspense>
            } />
            <Route path="/modify-categories" element={
              <Suspense fallback={<RouteLoader routeName="modify-categories" />}>
                <ModifyCategoriesPage />
              </Suspense>
            } />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
