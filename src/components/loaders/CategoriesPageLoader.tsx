import ButtonSkeleton from '../skeletons/ButtonSkeleton';
import CategoriesListSkeleton from '../lists/CategoriesListSkeleton';

type CategoriesPageLoaderProps = {
    mode: 'view' | 'edit';
};

const CategoriesPageLoader = ({ mode }: CategoriesPageLoaderProps) => {

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex flex-col gap-4">
                {/* "Modifica categorie" button skeleton */}
                <ButtonSkeleton />

                {/* Categories list in view mode */}
                <CategoriesListSkeleton mode={mode} />
            </div>
        </div>
    );
};

export default CategoriesPageLoader;
