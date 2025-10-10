import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTodo,
  createTodo,
  deleteTodo,
  editTodo,
} from '../../../context/TodoSlice';
import type { AppDispatch, RootState } from '../../../store/Store';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { todoType } from '../../../context/TodoSlice';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const useTodoList = () => {
  type fieldType = {
    name: string;
  };
  const [todos, setTodos] = useState<todoType[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.todo);

  const newTodo: todoType = {
    id: '',
    name: '',
    description: 'Write comprehensive API documentation',
    assignee: 'testuser',
    priority: 'HIGH',
    status: 'TODO',
  };

  // eslint-disable-next-line unicorn/no-null
  const [editId, setEditId] = useState<string | null>(null);

  const schema = Yup.object().shape({
    name: Yup.string()
      .required('must have value')
      .matches(/^[a-zA-Z0-9 ]*$/, 'Invalid'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fieldType>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<fieldType> = async (data) => {
    const newData = { ...newTodo, name: data.name };
    try {
      const response = await dispatch(createTodo(newData));
      if (response.payload.success) {
        setTodos((previous: todoType[]) => [
          ...previous,
          response.payload.data.todo,
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const previousState = [...todos];
    setTodos(() => previousState.filter((todo: todoType) => todo.id !== id));

    try {
      const response = await dispatch(deleteTodo(id));
      if (!response.payload?.success) {
        setTodos(previousState);
      }
    } catch {
      setTodos(previousState);
    }
  };

  const handleEditTodo = (id: string) => {
    setEditId(id);
  };

  const handleChangeTodo = (id: string, value: string) => {
    setTodos((previous: todoType[]) =>
      previous.map((todo: todoType) =>
        todo.id === id ? { ...todo, name: value } : todo
      )
    );
  };

  const handleSaveTodo = async (todo: todoType) => {
    try {
      const response = await dispatch(editTodo(todo));
      if (response.payload?.success) {
        setEditId('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodo = async () => {
    const data = await dispatch(fetchTodo());
    setTodos(data.payload.data.todos);
  };

  useEffect(() => {
    loadTodo();
  }, []);

  return {
    todos,
    loading,
    errors,
    register,
    handleSubmit,
    onSubmit,
    editId,
    handleDelete,
    handleEditTodo,
    handleChangeTodo,
    handleSaveTodo,
  };
};
