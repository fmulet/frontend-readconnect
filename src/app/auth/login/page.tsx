'use client';

import NextLink from 'next/link';
import { useForm } from 'react-hook-form';

import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { isEmail, isPassword } from '../../utils/validations';
import { useRouter } from 'next/navigation';


type FormData = {
  email: string;
  password: string;
};

export default function LoginPage({ }) {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Todo: navegar a la pantalla que el usuario estaba
    router.replace('/');
  };

  return (
    <AuthLayout title={'Ingresar'}>
      <form
        onSubmit={handleSubmit(onLoginUser)}
        noValidate
      >
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <Typography
                variant='h1'
                component='h1'
              >
                Iniciar Sesión
              </Typography>
              <Chip
                label='No reconocemos ese usuario / contraseña'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField
                type='email'
                label='Correo'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                label='Contraseña'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  validate: isPassword,
                  minLength: {
                    value: 6,
                    message: 'Debe tener al menos 6 caracteres',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Debe tener menos de 10 caracteres',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                style={{ backgroundColor: 'black' }}
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              display='flex'
              justifyContent='end'
            >
              <NextLink
                href='/auth/register'
                passHref
              >
                ¿No tienes cuenta?
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};


