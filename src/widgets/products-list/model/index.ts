import { api } from '@shared/api/api';

export const getCategoriesByKeys = async (categoryKeys: string[]) => {
  const categoriesKeysPromises = categoryKeys.map((key) => api?.api.categories().withKey({ key }).get().execute());

  const categoriesIds = await Promise.all(categoriesKeysPromises);
  return categoriesIds.map((categoryId) => categoryId?.body.id);
};
