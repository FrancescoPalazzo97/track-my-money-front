import BaseLink from "../components/ui/BaseLink";
import CategoriesList from "../components/lists/CategoriesList";

const CategoriesPage = () => {



    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex flex-col gap-4">
                <BaseLink to="/modify-categories" variant="emerald" size="lg" fullWidth>
                    Modifica categorie
                </BaseLink>
                <CategoriesList mode="view" />
            </div>
        </div>
    )
}

export default CategoriesPage
