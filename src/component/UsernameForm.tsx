import React from 'react';
import TextField from '@mui/material/TextField';
import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import { type BaseFormType } from '../context/AuthSlice';

export interface FormProperties {
  register: UseFormRegister<BaseFormType>;
  errors: FieldErrors<BaseFormType>;
}

const UsernameForm: React.FC<FormProperties> = ({ register, errors }) => {
  return (
    <TextField
      label="USERNAME"
      {...register('username')}
      error={!!errors.username}
      helperText={errors.username?.message}
    />
  );
};

export default UsernameForm;
