import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { auth } from '../configs/firebase.config';
import { ISignUp } from '../interfaces/sign-up.interface';
import { FormWrapper } from './form-wrapper.component';

const signUpUser = async (data: ISignUp): Promise<void> => {
  const response = await fetch('http://localhost:3001/users/sign-up', {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) throw new Error('Faild to sign up');

  return response.json();
};

const signUpFirebaseUser = async (data: ISignUp): Promise<UserCredential> => {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );
  await sendEmailVerification(credentials.user);

  return credentials;
};

export const SignUpForm: FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISignUp>({ mode: 'onChange' });

  const mutation = useMutation({
    mutationFn: async (data: ISignUp) => {
      const credentials = await signUpFirebaseUser(data);
      console.log('Token: ', credentials.user.getIdToken());
      await signUpUser({ ...data, id: credentials.user.uid });
      return credentials;
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Check your email for verification', {
        variant: 'success',
      });
      router.push('sign-in');
      reset();
    },
  });

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    mutation.mutate(data);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='firstName'
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.firstName}
            fullWidth
            helperText={errors.firstName?.message}
            label='First name'
            onChange={onChange}
            size='small'
            value={value ?? ''}
            variant='outlined'
          />
        )}
        rules={{ required: 'First name is required' }}
      />

      <Controller
        control={control}
        name='lastName'
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.lastName}
            fullWidth
            helperText={errors.lastName?.message}
            label='Last name'
            onChange={onChange}
            size='small'
            value={value ?? ''}
            variant='outlined'
          />
        )}
        rules={{ required: 'Last name is required' }}
      />

      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.email}
            fullWidth
            helperText={errors.email?.message}
            label='Email'
            onChange={onChange}
            size='small'
            value={value ?? ''}
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
            error={!!errors.password}
            fullWidth
            helperText={errors.password?.message}
            label='Password'
            onChange={onChange}
            size='small'
            type='password'
            value={value ?? ''}
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

      <Controller
        control={control}
        name='confirmPassword'
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.confirmPassword}
            fullWidth
            helperText={errors.confirmPassword?.message}
            label='Confirm Password'
            onChange={onChange}
            size='small'
            type='password'
            value={value ?? ''}
            variant='outlined'
          />
        )}
        rules={{
          required: 'Confirm password is required',
          validate: (value) =>
            value === control._formValues.password || 'Passwords must match',
        }}
      />

      <Button fullWidth type='submit' variant='contained'>
        Sign Up
      </Button>
    </FormWrapper>
  );
};
