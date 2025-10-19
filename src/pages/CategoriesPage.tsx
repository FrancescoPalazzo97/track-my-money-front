import { Link } from "react-router-dom"
import BaseButton from "../components/atoms/buttons/BaseButton"
import CategoriesList from "../components/organisms/CategoriesList"

const CategoriesPage = () => {
    return (
        <div className="px-4 pb-6">
            <div className="max-w-2xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-100 mb-6 pt-2'>
                    Lista categorie
                </h2>
                <div className='flex mb-3 gap-2'>
                    <Link to='/modify-categories'>
                        <BaseButton>
                            Modifica
                        </BaseButton>
                    </Link>
                </div>
                <CategoriesList />
            </div>
        </div>
    )
}

export default CategoriesPage
