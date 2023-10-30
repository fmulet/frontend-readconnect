import { fetchAllBooks } from '@/helpers';
import { IBook } from '@/interfaces/IBook';
import { QUERY_ALL_BOOKS } from '@/query';

import useSWR, { SWRConfiguration } from 'swr';

export const useBooks = (config: SWRConfiguration = {}) => {

  const { data, error } = useSWR<IBook[]>(QUERY_ALL_BOOKS, fetchAllBooks, config);

  return {
    books: data || [],
    isLoading: !error && !data,
    isError: error
  }
}
