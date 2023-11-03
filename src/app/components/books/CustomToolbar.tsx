'use client';

import de from 'date-fns/locale/de';
import { useState } from 'react';


import { Box, Button, Grid, Portal } from '@mui/material';
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import BookModal from './ModalComponent';
import { useBooks } from '../../hooks/useBooks';
import { IBook } from '../../interfaces/IBook';

export function CustomToolbar(props: any) {
  return (
    <>
      <Portal container={() => document.getElementById('filter-panel')!}>
        <GridToolbarQuickFilter />
      </Portal>
      <GridToolbar {...props} />
    </>
  );
}

export default function QuickFilterOutsideOfGrid() {
  const { books } = useBooks();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (book: IBook) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const filteredBooks = books
    .filter((book) => {
      const bookDate = new Date(book.publishedDate as any);
      if (startDate && bookDate < startDate) {
        return false;
      }
      if (endDate && bookDate > endDate) {
        return false;
      }
      return true;
    })
    .map((book) => ({
      ...book,
      authors: Array.isArray(book.authors)
        ? book.authors.map((author: any) => author.name).join(', ')
        : 'N/A',
      categories: Array.isArray(book.categories)
        ? book.categories.map((category: any) => category.name).join(', ')
        : 'N/A',
    }));

  const handleRowClick = (param: any) => {
    setSelectedBook(param.row);
    setIsModalOpen(true);
  };

  // Define las columnas para el DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Nombre', width: 230 },
    {
      field: 'thumbnailUrl',
      headerName: 'Portada',
      width: 130,
      renderCell: (params: any) => (
        <img
          src={params.value}
          alt='Portada'
          style={{ width: '50px', height: 'auto' }}
        />
      ),
    },
    { field: 'authors', headerName: 'Autores', width: 200 },
    { field: 'categories', headerName: 'Categorías', width: 150 },
    { field: 'shortDescription', headerName: 'Descripción', width: 630 },
    { field: 'pageCount', headerName: 'Páginas', width: 150 },
    {
      field: 'details',
      headerName: 'Detalles',
      width: 130,
      renderCell: (params: any) => (
        <Button
          variant='contained'
          style={{ backgroundColor: 'black', color: 'white' }}
          onClick={() => handleOpenModal(params.row)}
        >
          Detalle
        </Button>
      ),
    },
  ];

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={de}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid item>
          <Box id='filter-panel'>
            <DatePicker
              label='Publicación desde'
              value={startDate}
              onChange={setStartDate}
            />
            <DatePicker
              label='Publicación Hasta'
              value={endDate}
              onChange={setEndDate}
            />
          </Box>
        </Grid>
        <Grid
          item
          style={{ height: 400, width: '100%' }}
        >
          <DataGrid
            style={{ height: 800 }}
            rows={filteredBooks}
            columns={columns}
            slots={{
              toolbar: CustomToolbar,
            }}
            initialState={{
              filter: {
                filterModel: {
                  items: [],
                  quickFilterExcludeHiddenColumns: true,
                },
              },
            }}
          />
        </Grid>
        {/* Modal de detalle del libro */}
        <BookModal
          book={selectedBook}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Grid>
    </LocalizationProvider>
  );
}
