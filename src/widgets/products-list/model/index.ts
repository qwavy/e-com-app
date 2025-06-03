import { apiStore } from '@shared/api/store/api-store';

import { getAllCategoryIds } from './getAllCategoryIds';

export const getCategoriesByKeys = async (categoryKeys: string[]) => {
  if (!apiStore.api || categoryKeys.length === 0) {
    return [];
  }

  const allCategoriesResponse = await apiStore.api.api.categories().get().execute();
  const allCategories = allCategoriesResponse.body.results;

  const selectedCategories = allCategories.filter((cat) => categoryKeys.includes(cat.key ?? ''));

  const allIds = selectedCategories.flatMap((category) => getAllCategoryIds(category, allCategories));

  return [...new Set(allIds)];
};
