import React from 'react';
import PasswordForm from '../../../component/PasswordForm';
import UsernameForm from '../../../component/UsernameForm';
import CustomButton from '../../../component/CustomButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useLoginForm } from '../hooks/UseLoginForm';

const LoginForm = () => {
  const { register, errors, onSubmit, handleSubmit, navigateToRegisterScreen } =
    useLoginForm();
  return (
    <Container maxWidth="xl">
      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>LOGIN</h1>
        <UsernameForm register={register} errors={errors} />
        <PasswordForm register={register} errors={errors} />
        <p>
          Do you not have an account?{' '}
          <a onClick={navigateToRegisterScreen}>Register</a>
        </p>
        <CustomButton formType="login" />
      </Stack>
    </Container>
  );
};

export default LoginForm;
