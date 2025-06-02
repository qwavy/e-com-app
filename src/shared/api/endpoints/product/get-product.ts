import { apiStore } from '@shared/api/store/api-store';
import { useQuery } from '@tanstack/react-query';

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ['product-details', id],
    queryFn: async () => {
      if (!apiStore.api) {
        throw new Error('API not initialized');
      }
      const response = await apiStore.api.api.products().withId({ ID: id }).get().execute();
      return response.body;
    },
  });
};
