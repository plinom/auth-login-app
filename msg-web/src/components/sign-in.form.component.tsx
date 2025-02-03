import { Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { auth as firebaseAuth } from '../configs/firebase.config';
import { ISignIn } from '../interfaces/sign-in.interface';
import { FormWrapper } from './form-wrapper.component';

export const SignInForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ISignIn>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ISignIn> = async (data) => {
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        data.email,
        data.password,
      );

      enqueueSnackbar('Signed in successfully', { variant: 'success' });

      router.push('msg');
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Something went wrong', {
        variant: 'error',
      });
    }
  };
  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value } }) => (
          <TextField
            defaultValue={value}
            error={!!errors.email}
            fullWidth
            helperText={errors.email?.message}
            label='Email'
            onChange={onChange}
            size='small'
            variant='outlined'
          />
        )}
        rules={{
          pattern: {
            message: 'Invalid email',
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
          required: 'Email is required',
        }}
      />

      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value } }) => (
          <TextField
            defaultValue={value}
            error={!!errors.password}
            fullWidth
            helperText={errors.password?.message}
            label='Password'
            onChange={onChange}
            size='small'
            type='password'
            variant='outlined'
          />
        )}
        rules={{
          minLength: {
            message: 'Password must be at least 6 characters',
            value: 6,
          },
          required: 'Password is required',
        }}
      />

      <Button fullWidth type='submit' variant='contained'>
        Sign Up
      </Button>
    </FormWrapper>
  );
};
