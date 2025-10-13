import { useEffect } from "react";
import { useStore } from "./store/useStore"

function App() {

  const categories = useStore(s => s.categories);
  const fetchCategories = useStore(s => s.fetchCategories);
  const isLoading = useStore(s => s.isLoading);

  useEffect(() => {
    fetchCategories(true)
  }, [fetchCategories])


  if (isLoading) return <>Caricamento...</>

  return (
    <>
      <ul>
        {categories.map(c => (
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
