import type { TCategory } from "../types/api.types";

function getSubCategories(categories: TCategory[], category: TCategory): TCategory[] {
    return categories
        .filter(subCat =>
            subCat.parentCategory?.toString() === category._id.toString()
        )
        .map(subCat => ({
            ...subCat,
            subCategories: getSubCategories(categories, subCat)
        }));
}

export function getGroupedCategories(categories: TCategory[]): TCategory[] {
    if (categories.length === 0) return [];
    const mainCategories = categories
        .filter(cat => !cat.parentCategory)
        .sort((a, b) => a.name.localeCompare(b.name));
    return mainCategories.map(mainCat => ({
        ...mainCat,
        subCategories: getSubCategories(categories, mainCat)
    }));
}