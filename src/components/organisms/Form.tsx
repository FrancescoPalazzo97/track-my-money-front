import { useShallow } from "zustand/shallow";
import { store } from "../../store/store"
import { TrendingDown, TrendingUp } from "lucide-react";
import DefaultButton from "../atoms/buttons/DefaultButton";

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
                    <DefaultButton
                        onClick={() => setType('expense')}
                        variant={type === 'expense' ? 'red' : 'secondary'}
                        size="lg"
                        className="flex-1 flex items-center justify-center border-2 gap-2"
                    >
                        <TrendingDown className="w-5 h-5" />
                        <span>Uscita</span>
                    </DefaultButton>
                    <DefaultButton
                        onClick={() => setType('income')}
                        variant={type === 'income' ? 'emerald' : 'secondary'}
                        size="lg"
                        className="flex-1 flex items-center justify-center border-2 gap-2"
                    >
                        <TrendingUp className="w-5 h-5" />
                        <span>Entrata</span>
                    </DefaultButton>
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
