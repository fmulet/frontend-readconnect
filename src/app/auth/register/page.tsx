
'use client';
import NextLink from 'next/link';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { isEmail, isPassword } from '../../utils/validations';
import { useRouter } from 'next/navigation';


type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage({ }) {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Todo: navegar a la pantalla que el usuario estaba
    router.replace('/');
  };

  return (
    <AuthLayout title={'Ingresar'}>
      <form
        onSubmit={handleSubmit(onRegisterForm)}
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
                Crear cuenta
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
                label='Nombre completo'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                  maxLength: { value: 10, message: 'Máximo 10 caracteres' },
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
                fullWidth
                style={{ backgroundColor: 'black' }}
              >
                Registrar
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              display='flex'
              justifyContent='end'
            >
              <NextLink
                href='/auth/login'
                passHref
              >
                ¿Ya tienes cuenta?
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};
