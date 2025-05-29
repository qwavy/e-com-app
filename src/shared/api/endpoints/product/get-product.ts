import { api } from '@shared/api/api';
import { useQuery } from '@tanstack/react-query';

export const useProductDetails = (id: string) => {
  return useQuery({
    queryKey: ['product-details', id],
    queryFn: () => api?.api.productProjections().withId({ ID: id }).get().execute(),
  });
};
