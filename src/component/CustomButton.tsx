import React from 'react';
import Button from '@mui/material/Button';
const CustomButton = ({ formType }: { formType: string }) => {
  return (
    <Button type="submit">
      {formType === 'register' ? 'REGISTER' : 'LOGIN'}
    </Button>
  );
};

export default CustomButton;
