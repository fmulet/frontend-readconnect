'use client';

import { Typography } from "@mui/material";
import { useBooks } from "./hooks/useBooks";
import { BookLayout } from "./components/layouts/BookLayout";
import { FullScreenLoading } from "./ui/FullScreenLoading";
import { CustomToolbar } from "./components/books/CustomToolbar";

export default function Page() {
  const { isLoading } = useBooks();

  return (
    <BookLayout title={'BookConnect - Home'} pageDescription={'BookConnect - Home'} >
      <Typography variant='h1' component='h1'>Libros</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Libros agregados</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <CustomToolbar />
      }
    </BookLayout>
  )
}
