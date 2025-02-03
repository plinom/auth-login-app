import { Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { auth } from '../configs/firebase.config';
import { ISignUp } from '../interfaces/sign-up.interface';
import { FormWrapper } from './form-wrapper.component';

export const SignUpForm: FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISignUp>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      reset();
      enqueueSnackbar('Sign up successful', {
        variant: 'success',
      });
      router.push('sign-in');
    } catch (err) {
      enqueueSnackbar('Something went wrong', {
        variant: 'error',
      });
    }
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
