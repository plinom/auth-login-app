import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { auth } from '../configs/firebase.config';
import { ISignIn } from '../interfaces/sign-in.interface';
import { FormWrapper } from './form-wrapper.component';

const signInUser = async (data: ISignIn, token: string): Promise<number> => {
  const response = await fetch(
    `http://${process.env.API_HOST}:${process.env.API_PORT}/users/sign-in`,
    {
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );

  if (!response.ok) throw new Error('Faild to sign in');

  return response.status;
};

const signInFirebaseUser = async (data: ISignIn): Promise<UserCredential> => {
  try {
    const credentials = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );

    if (!credentials.user.emailVerified) {
      await sendEmailVerification(credentials.user);
      enqueueSnackbar(
        'Email not verified. A verification email has been sent.',
        { variant: 'warning' },
      );
    }

    return credentials;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong during sign in.');
  }
};

export const SignInForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISignIn>({ mode: 'onChange' });

  const mutation = useMutation({
    mutationFn: async (data: ISignIn) => {
      const credentials = await signInFirebaseUser(data);

      const token: string = await credentials.user.getIdToken();
      console.log(token);
      await signInUser(data, token);
      return credentials;
    },
    onError: (error) => {
      enqueueSnackbar((error as Error).message, { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Sign in success', { variant: 'success' });
      router.push('select-room');
      reset();
    },
  });

  const onSubmit: SubmitHandler<ISignIn> = async (data) => {
    mutation.mutate(data);
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
