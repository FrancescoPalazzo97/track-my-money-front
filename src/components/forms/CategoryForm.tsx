import { useShallow } from "zustand/shallow";
import { store } from "../../store/store"
import BaseButton from "../ui/BaseButton";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { tryCatch } from "../../lib/tryCatch";

const CategoryForm = () => {

    const {
        name, setName, nameError,
        type, setType,
        parentCategory, setParentCategory,
        categories, addCategory,
        closeModal
    } = store(
        useShallow(s => ({
            name: s.name,
            setName: s.setName,
            type: s.type,
            setType: s.setType,
            parentCategory: s.parentCategory,
            setParentCategory: s.setParentCategory,
            nameError: s.nameError,
            categories: s.categories,
            addCategory: s.addCategory,
            closeModal: s.closeModal
        }))
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim() === '' || type === '') return;
        console.log('Submitting form with values:', { name, type, parentCategory });
        await addCategory({ name, type, parentCategory });
        closeModal();
    };

    return (
        <div>
            <form className="space-y-10" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium">
                        <h3 className="mb-1.5">Nome</h3>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={setName}
                            placeholder="Esempio: Spesa alimentare"
                            className={`w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 ${nameError ? 'border-red-500/80 focus:ring-red-500/50 focus:border-red-500/50' : ''}`}
                        />
                        {nameError && <p className="mt-1 text-sm text-red-500 absolute">{nameError}</p>}
                    </label>
                </div>
                <div>
                    <label>
                        <h3 className="mb-1.5">Tipo</h3>
                    </label>
                    <div className="flex gap-3">
                        <BaseButton
                            onClick={() => setType('expense')}
                            variant={type === 'expense' ? 'red' : 'secondary'}
                            className="flex-1 flex items-center justify-center border-2 gap-2"
                        >
                            <TrendingDown className="w-5 h-5" />
                            <span>Uscita</span>
                        </BaseButton>
                        <BaseButton
                            onClick={() => setType('income')}
                            variant={type === 'income' ? 'emerald' : 'secondary'}
                            className="flex-1 flex items-center justify-center border-2 gap-2"
                        >
                            <TrendingUp className="w-5 h-5" />
                            <span>Entrata</span>
                        </BaseButton>
                    </div>
                </div>
                {(type === 'income' || type === 'expense') && (
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
                            {categories
                                .filter(c => c.type === type)
                                .map(c => (
                                    <option
                                        key={c._id}
                                        value={c._id}
                                    >
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/50">
                    <BaseButton
                        onClick={() => { }}
                        variant="secondary"
                    >
                        Annulla
                    </BaseButton>
                    <BaseButton
                        disabled={name.trim() === '' || type === ''}
                        type="submit"
                    >
                        Salva
                    </BaseButton>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm
