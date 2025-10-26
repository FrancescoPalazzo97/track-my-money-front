import BaseButton from '../components/ui/BaseButton';
import CategoriesList from '../components/lists/CategoriesList';

const ModifyCategoriesPage = () => {

    const handleEdit = () => { };

    const handleDelete = () => { };

    const handleCreate = () => { };

    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-100 mb-6 pt-2'>
                    Modifica categorie
                </h2>
                <div className="py-4">
                    <BaseButton
                        onClick={handleCreate}
                        fullWidth
                        size="lg"
                    >
                        Aggiungi nuova categoria
                    </BaseButton>
                </div>
                <CategoriesList
                    mode="edit"
                />
            </div>
        </div>
    )
}

export default ModifyCategoriesPage
