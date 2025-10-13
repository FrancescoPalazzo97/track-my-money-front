import { useEffect } from "react";
import { useStore } from "./store/useStore"
import { ca } from "zod/locales";

function App() {

  const categories = useStore(s => s.data);
  const fetchCategories = useStore(s => s.fetchCategories);
  const isLoading = useStore(s => s.isLoading);
  const fetchCategoryById = useStore(s => s.fetchCategoryById);

  useEffect(() => {
    fetchCategoryById('68e569bafc10cc06e90779d5');
  }, [fetchCategories]);


  if (isLoading) return <>Caricamento...</>

  return (
    <>
      <ul>
        {(categories && typeof categories === 'object' && !Array.isArray(categories)) && (
          <li>
            <h1 className="text-2xl">
              {categories.name}
            </h1>
            <p>{categories.type}</p>
          </li>
        )}
        {Array.isArray(categories) && categories.map(c => (
          <li key={c._id}>
            <h1 className="text-2xl">
              {c.name}
            </h1>
            <p>{c.type}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
