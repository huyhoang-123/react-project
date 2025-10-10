import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser, type BaseFormType } from '../../../context/AuthSlice';
import type { AppDispatch } from '../../../store/Store';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterUserDetails {
  createdAt: string;
  id: string;
  password: string;

  refreshTokens: string[];
  updatedAt: string;
  username: string;
}

interface RegisterDataResponse {
  accessToken: string;
  refreshToken: string;
  user: RegisterUserDetails;
}

interface RegisterPayload {
  data: RegisterDataResponse;
  message: 'User registered successfully';
  success: boolean;
}

interface RegisterActionMeta {
  arg: {
    confirmPassword: string;
    password: string;
    username: string;
  };
  requestId: string;
  requestStatus: 'fulfilled';
}

interface RegisterFulfilledAction {
  type: 'auth/register/fulfilled';
  payload: RegisterPayload;
  meta: RegisterActionMeta;
}

export const useRegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const schema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 2 characters')
      .max(100, 'Username must be at most 100 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be at most 100 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<BaseFormType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<BaseFormType> = async (data) => {
    try {
      const response = (await dispatch(
        createUser(data)
      )) as RegisterFulfilledAction;
      if (response.payload?.success) {
        navigate('/login');
        reset();
      }
    } catch (error) {
      console.error('Error occurred while registering user:', error);
    }
  };

  return {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    onSubmit,
  };
};
