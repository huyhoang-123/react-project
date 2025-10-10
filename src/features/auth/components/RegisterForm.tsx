import React from 'react';
import PasswordForm from '../../../component/PasswordForm';
import UsernameForm from '../../../component/UsernameForm';
import CustomButton from '../../../component/CustomButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useRegisterForm } from '../hooks/UseRegisterForm';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
  } = useRegisterForm();

  return (
    <Container maxWidth="xl">
      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>REGISTER</h1>
        <UsernameForm register={register} errors={errors} />
        <PasswordForm register={register} errors={errors} />
        <TextField
          label="CONFIRM PASSWORD"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        <CustomButton formType="register" />
      </Stack>
    </Container>
  );
};

export default RegisterForm;
