"use client";

import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { FormWrapper } from "../../../src/components/form-wrapper.component";
import { auth } from "../../../src/configs/firebase.config";
import { ISignUp } from "../../../src/interfaces/sign-up.interface";

const signUpUser = async (data: ISignUp): Promise<void> => {
  const response = await fetch(
    `http://${process.env.API_HOST}:${process.env.API_PORT}/users/sign-up`,
    {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  if (!response.ok) throw new Error("Faild to sign up");

  return response.json();
};

const signUpFirebaseUser = async (data: ISignUp): Promise<UserCredential> => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await sendEmailVerification(credentials.user);

    return credentials;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new Error(
            "The email address is already in use by another account."
          );
        case "auth/invalid-email":
          throw new Error("The email address is not valid.");
        case "auth/operation-not-allowed":
          throw new Error("Email/password accounts are not enabled.");
        case "auth/weak-password":
          throw new Error("The password is too weak.");
        default:
          throw new Error("Something went wrong during sign up.");
      }
    } else {
      throw new Error("Something went wrong during sign up.");
    }
  }
};

export default function Page() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISignUp>({ mode: "onChange" });

  const mutation = useMutation({
    mutationFn: async (data: ISignUp) => {
      const credentials = await signUpFirebaseUser(data);
      await signUpUser({ ...data, firebaseId: credentials.user.uid });
      return credentials;
    },
    onError: (error) => {
      enqueueSnackbar((error as Error).message, { variant: "error" });
    },
    onSuccess: () => {
      enqueueSnackbar("Check your email for verification", {
        variant: "success",
      });
      router.push("sign-in");
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
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.fullName}
            fullWidth
            helperText={errors.fullName?.message}
            label="Full name"
            onChange={onChange}
            placeholder="Your full name"
            size="small"
            value={value ?? ""}
            variant="outlined"
          />
        )}
        rules={{ required: "Full name is required" }}
      />

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.username}
            fullWidth
            helperText={errors.username?.message}
            label="Username"
            onChange={onChange}
            placeholder="Your username"
            size="small"
            value={value ?? ""}
            variant="outlined"
          />
        )}
        rules={{ required: "Username is required" }}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.email}
            fullWidth
            helperText={errors.email?.message}
            label="Email"
            onChange={onChange}
            placeholder="Your email"
            size="small"
            value={value ?? ""}
            variant="outlined"
          />
        )}
        rules={{
          pattern: {
            message: "Invalid email",
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
          required: "Email is required",
        }}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.password}
            fullWidth
            helperText={errors.password?.message}
            label="Password"
            onChange={onChange}
            placeholder="Your password"
            size="small"
            type="password"
            value={value ?? ""}
            variant="outlined"
          />
        )}
        rules={{
          minLength: {
            message: "Password must be at least 6 characters",
            value: 6,
          },
          required: "Password is required",
        }}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextField
            error={!!errors.confirmPassword}
            fullWidth
            helperText={errors.confirmPassword?.message}
            label="Confirm Password"
            onChange={onChange}
            placeholder="Your confirm password"
            size="small"
            type="password"
            value={value ?? ""}
            variant="outlined"
          />
        )}
        rules={{
          required: "Confirm password is required",
          validate: (value) =>
            value === control._formValues.password || "Passwords must match",
        }}
      />

      <Button fullWidth type="submit" variant="contained">
        Sign Up
      </Button>
    </FormWrapper>
  );
}
