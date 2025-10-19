import CategoriesList from "../components/organisms/CategoriesList"

const CategoriesPage = () => {
    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-100 mb-6 pt-2'>
                    Lista categorie
                </h2>
                <CategoriesList />
            </div>
        </div>
    )
}

export default CategoriesPage
