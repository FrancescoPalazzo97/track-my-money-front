import BaseLink from "../components/ui/BaseLink";
import GroupedCategoriesList from "../components/lists/GroupedCategoriesList";

const CategoriesPage = () => {



    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex flex-col gap-4">
                <BaseLink to="/modify-categories" variant="emerald" size="lg" fullWidth>
                    Modifica categorie
                </BaseLink>
                <GroupedCategoriesList />
            </div>
        </div>
    )
}

export default CategoriesPage
