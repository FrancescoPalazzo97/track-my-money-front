import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import HomePage from "./pages/HomePage"
import Settings from "./pages/Settings"
import CategoriesPage from "./pages/CategoriesPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route index Component={HomePage} />
          <Route path="/settings" Component={Settings} />
          <Route path="/categories" Component={CategoriesPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
