import { Category } from '@commercetools/platform-sdk';

export const getAllCategoryIds = (category: Category, allCategories: Category[]): string[] => {
  const subcategories = allCategories.filter((c) => c.parent?.id === category.id);

  const subIds = subcategories.flatMap((sub) => getAllCategoryIds(sub, allCategories));

  return [category.id, ...subIds];
};
