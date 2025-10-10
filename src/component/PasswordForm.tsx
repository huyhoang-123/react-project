import React from 'react';
import TextField from '@mui/material/TextField';
import { type FormProperties } from './UsernameForm';

const PasswordForm: React.FC<FormProperties> = ({ register, errors }) => {
  return (
    <TextField
      label="PASSWORD"
      type="password"
      {...register('password')}
      error={!!errors?.password}
      helperText={errors?.password?.message}
    />
  );
};

export default PasswordForm;
