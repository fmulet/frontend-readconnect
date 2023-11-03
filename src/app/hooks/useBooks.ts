
import useSWR, { SWRConfiguration } from 'swr';
import { IBook } from '../interfaces/IBook';
import { fetchAllBooks } from '../helpers';
import { QUERY_ALL_BOOKS } from '../query';

export const useBooks = (config: SWRConfiguration = {}) => {

  const { data, error } = useSWR<IBook[]>(QUERY_ALL_BOOKS, fetchAllBooks, config);

  return {
    books: data || [],
    isLoading: !error && !data,
    isError: error
  }
}
