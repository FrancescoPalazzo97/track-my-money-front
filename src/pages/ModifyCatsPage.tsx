import { store } from "../store/store"
import { Pencil, Trash2, TrendingDown, TrendingUp } from "lucide-react"
import { useShallow } from "zustand/shallow"
import BaseButton from "../components/atoms/buttons/BaseButton";
import Loader from "../components/molecules/Loader";
import EmptyListComponent from "../components/molecules/EmptyListComponent";

const ModifyCatsPage = () => {

    const { categories, isLoading, modifyCategory } = store(
        useShallow(s => ({
            categories: s.categories,
            isLoading: s.isLoadingCategory,
            modifyCategory: s.modifyCategory
        }))
    );

    const handleEdit = (categoryId: string) => {
        // TODO: Implementare logica di modifica
        console.log('Edit category:', categoryId);
    };

    const handleDelete = (categoryId: string) => {
        // TODO: Implementare logica di eliminazione
        console.log('Delete category:', categoryId);
    };

    const saveModify = async () => {
        const promises = [];
        for (const cat of categories) {
            const input = document.getElementById(`categoryName-${cat._id}`);
            if (!input || !(input instanceof HTMLInputElement)) {
                throw new Error(`Value non disponibile!`);
            }
            const newName = input.value.trim();
            if (newName && newName !== cat.name) {
                promises.push(modifyCategory(cat._id, { name: newName }))
            }
        }
        console.log('Effettuo promesse')
        await Promise.all(promises);
        console.log('Promesse effettuate')
    }

    if (isLoading) return <Loader />;

    if (categories.length === 0) {
        return (
            <EmptyListComponent
                content={'Nessuna categoria trovata'}
            />
        )
    }

    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-100 mb-6 pt-2'>
                    Modifica categorie
                </h2>
                <ul className='space-y-3'>
                    {categories.map(cat => (
                        <li
                            key={cat._id}
                            className='bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-4 hover:border-slate-700/50 transition-all duration-200'
                        >
                            <div className='flex items-center justify-between gap-4'>
                                <div className='flex items-center gap-3 flex-1 min-w-0'>
                                    <div className={`p-2 rounded-lg ${cat.type === 'income'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-red-500/10 text-red-400'
                                        }`}>
                                        {cat.type === 'income' ? (
                                            <TrendingUp className='w-5 h-5' />
                                        ) : (
                                            <TrendingDown className='w-5 h-5' />
                                        )}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <input
                                            type="text"
                                            id={`categoryName-${cat._id}`}
                                            className='text-slate-100 font-medium text-lg truncate'
                                            placeholder={cat.name}
                                            defaultValue={cat.name}
                                        />
                                        {cat.description && (
                                            <p className='text-slate-400 text-sm truncate'>
                                                {cat.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 flex-shrink-0'>
                                    <button
                                        onClick={() => handleEdit(cat._id)}
                                        className='p-2 rounded-lg bg-slate-800/50 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-200'
                                        aria-label='Modifica categoria'
                                    >
                                        <Pencil className='w-4 h-4' />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat._id)}
                                        className='p-2 rounded-lg bg-slate-800/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/50 hover:border-red-500/30 transition-all duration-200'
                                        aria-label='Elimina categoria'
                                    >
                                        <Trash2 className='w-4 h-4' />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <BaseButton
                    fullWidth
                    onClick={saveModify}
                    className="mt-3"
                >
                    Salva Modifiche
                </BaseButton>
            </div>
        </div>
    )
}

export default ModifyCatsPage
