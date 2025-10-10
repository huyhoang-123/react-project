import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../context/AuthSlice';
import type { AppDispatch } from '../../../store/Store';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type BaseFormType } from '../../../context/AuthSlice';

interface UserDetails {
  createdAt: string;
  id: string;
  password: string;
  refreshToken: string;
  updatedAt: string;
  username: string;
}

interface LoginDataResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDetails;
}

interface LoginPayload {
  token: string;
  user: {
    data: LoginDataResponse;
    message: 'Login successful';
    success: true;
  };
}

interface LoginActionMeta {
  arg: {
    username: string;
    password: string;
  };
  requestId: string;
  requestStatus: 'fulfilled';
}

export interface LoginFulfilledAction {
  type: 'auth/loginUser/fulfilled';
  payload: LoginPayload;
  meta: LoginActionMeta;
}

export const useLoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const navigateToRegisterScreen = () => {
    navigate('/register');
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<BaseFormType>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<BaseFormType> = async (data) => {
    try {
      const response = (await dispatch(
        loginUser(data)
      )) as LoginFulfilledAction;

      if (response.type.endsWith('/fulfilled') && response.payload) {
        const payload = response.payload as LoginPayload;

        if (payload.user.success) {
          reset();
          navigate('/todo');
          return;
        }
      }
    } catch (error) {
      console.error('Lỗi mạng/Kết nối API:', error);
    }
  };

  return {
    register,
    errors,
    onSubmit,
    getValues,
    reset,
    handleSubmit,
    navigateToRegisterScreen,
  };
};
