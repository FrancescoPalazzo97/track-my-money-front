import { useShallow } from "zustand/shallow";
import { store } from "../../store/store"
import { TrendingDown, TrendingUp } from "lucide-react";

const Form = () => {

    const {
        categories,
        categoryName, setCategoryName,
        type, setType,
        parentCategory, setParentCategory
    } = store(
        useShallow(s => ({
            categories: s.categories,
            categoryName: s.categoryName,
            setCategoryName: s.setCategoryName,
            type: s.type,
            setType: s.setType,
            parentCategory: s.parentCategory,
            setParentCategory: s.setParentCategory
        }))
    );

    return (
        <div className="space-y-6">
            {/* Nome categoria */}
            <div className="space-y-2">
                <label htmlFor="category-name" className="block text-sm font-medium text-slate-300">
                    Nome categoria
                </label>
                <input
                    id="category-name"
                    type="text"
                    value={categoryName}
                    onChange={setCategoryName}
                    placeholder="Es. Spesa alimentare"
                    className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                />
            </div>

            {/* Tipo categoria */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                    Tipo categoria
                </label>
                <div className="flex gap-3">
                    <button
                        onClick={() => setType('expense')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${type === 'expense'
                            ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40 shadow-lg shadow-red-500/10'
                            : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50'
                            }`}
                    >
                        <TrendingDown className="w-5 h-5" />
                        <span>Uscita</span>
                    </button>
                    <button
                        onClick={() => setType('income')}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${type === 'income'
                            ? 'bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                            : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50'
                            }`}
                    >
                        <TrendingUp className="w-5 h-5" />
                        <span>Entrata</span>
                    </button>
                </div>
            </div>

            {/* Categoria padre */}
            <div className="space-y-2">
                <label htmlFor="parent-category" className="block text-sm font-medium text-slate-300">
                    Categoria padre (opzionale)
                </label>
                <select
                    id="parent-category"
                    value={parentCategory}
                    onChange={setParentCategory}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700/50 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 cursor-pointer"
                >
                    <option value="">Nessuna</option>
                    {categories.map(c => (
                        <option
                            key={c._id}
                            value={c._id}
                        >
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Form
