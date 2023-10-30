import Head from 'next/head';
import { FC } from 'react';

import { Box } from '@mui/material';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          paddingTop={'10rem'}
          fontSize={50}
          fontWeight={'bold'}
        >
          ReadConnect
        </Box>

        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='calc(70vh - 200px)'
        >
          {children}
        </Box>
      </main>
    </>
  );
};
