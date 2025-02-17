'use client';

import {
  Box,
  Button,
  Modal,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import Form from 'next/form';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

interface MultiStepFormData {
  step1: {
    firstName: string;
    lastName: string;
  };
  step2: {
    email: string;
    phone: string;
  };
  step3: {
    address: string;
    city: string;
  };
}

const steps = ['Personal Info', 'Contact Details', 'Address'];

export const MultistepsForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const methods = useForm<MultiStepFormData>({
    defaultValues: {
      step1: { firstName: '', lastName: '' },
      step2: { email: '', phone: '' },
      step3: { address: '', city: '' },
    },
  });

  const onSubmit = async (data: MultiStepFormData) => {
    console.log(data);
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    left: '50%',
    p: 4,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
  };

  return (
    <>
      <Button onClick={handleOpen} variant='contained'>
        Open Form
      </Button>

      <Modal aria-labelledby='modal-title' onClose={handleClose} open={open}>
        <Box sx={modalStyle}>
          <Typography component='h2' id='modal-title' mb={2} variant='h6'>
            Multi-step Form
          </Typography>

          <FormProvider {...methods}>
            <Form action={onSubmit}>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper

              <Paper sx={{ mb: 2, p: 3 }}>
                {activeStep === 0 && (
                  <>
                    <Controller
                      control={methods.control}
                      name='step1.firstName'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='First Name'
                          margin='normal'
                        />
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name='step1.lastName'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='Last Name'
                          margin='normal'
                        />
                      )}
                    />
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    <Controller
                      control={methods.control}
                      name='step2.email'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='Email'
                          margin='normal'
                          type='email'
                        />
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name='step2.phone'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='Phone'
                          margin='normal'
                        />
                      )}
                    />
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    <Controller
                      control={methods.control}
                      name='step3.address'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='Address'
                          margin='normal'
                        />
                      )}
                    />
                    <Controller
                      control={methods.control}
                      name='step3.city'
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='City'
                          margin='normal'
                        />
                      )}
                    />
                  </>
                )}
              </Paper>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  onClick={
                    activeStep === steps.length - 1
                      ? methods.handleSubmit(onSubmit)
                      : handleNext
                  }
                  type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                  variant='contained'
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </Form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};
