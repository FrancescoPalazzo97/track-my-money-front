import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { store } from "./store/store";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {

  const fetchCategories = store(s => (s.fetchCategories));

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index />
          <Route path="/settings" />
          <Route path="/categories" />
          <Route path="/modify-categories" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
