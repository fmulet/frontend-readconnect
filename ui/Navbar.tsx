import { useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import { UiContext } from '@/context/ui';


export const Navbar = () => {

  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>

        <Link display='flex' alignItems='center'>
          <Typography variant='h6'>Read Connect</Typography>
        </Link>


        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}
          className="fadeIn">
          <NextLink href='/category/men' passHref>

            <Button color={asPath === '/' ? 'primary' : 'info'}>Libros</Button>

          </NextLink>
        </Box>

        <Box flex={1} />

        <Button onClick={toggleSideMenu}>
          Menu
        </Button>

      </Toolbar>
    </AppBar>
  )
}
