
export interface Author {
  name: string;
}

export interface Category {
  name: string;
}



export interface PublishedDate {
  $date: string;
}

export interface IBook {
  id: number;
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate: PublishedDate;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  authors: Author[];
  categories: Category[];
}


