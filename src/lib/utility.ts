import type { Category } from "../types/api.types";

function getSubCategories(categories: Category[], category: Category): Category[] {
    return categories
        .filter(subCat =>
            subCat.parentCategory?.toString() === category._id.toString()
        )
        .map(subCat => ({
            ...subCat,
            subCategories: getSubCategories(categories, subCat)
        }));
}

export function getGroupedCategories(categories: Category[]): Category[] {
    const mainCategories = categories
        .filter(cat => !cat.parentCategory)
        .sort((a, b) => a.name.localeCompare(b.name));
    return mainCategories.map(mainCat => ({
        ...mainCat,
        subCategories: getSubCategories(categories, mainCat)
    }));
}