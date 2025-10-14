import { useEffect } from "react";
import { useStore } from "./store/useStore"

function App() {

  const categories = useStore(s => s.categories);
  const category = useStore(s => s.category);
  const fetchCategories = useStore(s => s.fetchCategories);
  const isLoading = useStore(s => s.isLoadingCategory);
  const fetchCategoryById = useStore(s => s.fetchCategoryById);
  const fetchTransactions = useStore(s => s.fetchTransactions);
  const transactions = useStore(s => s.transactions);

  useEffect(() => {
    fetchCategories();
    fetchTransactions({ startDate: '2025-10-01', endDate: '2025-10-31', baseCurrency: 'EUR' })
  }, [fetchCategories, fetchTransactions]);


  if (isLoading) return <>Caricamento...</>

  return (
    <>
      <ul>
        {category && (
          <li>
            <h1 className="text-2xl">
              {category.name}
            </h1>
            <p>{category.type}</p>
          </li>
        )}
        {categories.map(c => (
          <li key={c._id}>
            <h1 className="text-2xl">
              {c.name}
            </h1>
            <p>{c.type}</p>
          </li>
        ))}
        <h2 className="text-3xl">Spese</h2>
        {transactions.map(t => (
          <li key={t._id}>
            <h1 className="text-2xl">
              {t.title}
            </h1>
            <p>{t.amount}</p>
            <p>{t.amountInEUR}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
