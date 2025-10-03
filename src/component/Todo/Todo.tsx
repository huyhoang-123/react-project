import TextField, { type TextFieldProps } from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button, { type ButtonProps } from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodo,
  createTodo,
  deleteTodo,
  editTodo,
} from "../../context/todoSlice";
import type { AppDispatch, RootState } from "../../state/Store";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { todoType } from "../../context/todoSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { createTheme, styled, ThemeProvider } from "@mui/material";
const Todo = () => {
  type fieldType = {
    name: string;
  };
  const [todos, setTodos] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.todo);

  const newTodo: todoType = {
    name: "",
    description: "Write comprehensive API documentation",
    assignee: "testuser",
    priority: "HIGH",
    status: "TODO",
  };
  const [editId, setEditId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<fieldType>();

  const onSubmit: SubmitHandler<fieldType> = async (data) => {
    console.log(data);
    const newData = { ...newTodo, name: data.name };
    try {
      const res = await dispatch(createTodo(newData));
      if (res.payload.success) {
        setTodos((prev: any) => [...prev, res.payload.data.todo]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    const prevState = [...todos];
    setTodos((prev: any) => prev.filter((t: any) => t.id !== id));

    try {
      const res = await dispatch(deleteTodo(id));
      if (!res.payload?.success) {
        setTodos(prevState);
      }
    } catch {
      setTodos(prevState);
    }
  };

  const handleEditTodo = (id: string) => {
    setEditId(id); // bật edit cho todo này
  };

  const handleChangeTodo = (id: string, value: string) => {
    setTodos((prev: any) =>
      prev.map((todo: any) =>
        todo.id === id ? { ...todo, name: value } : todo
      )
    );
  };

  const handleSaveTodo = async (todo: todoType) => {
    console.log(todo);
    try {
      const res = await dispatch(editTodo(todo));
      if (res.payload?.success) {
        setEditId(null); // tắt edit
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadTodo = async () => {
    const data = await dispatch(fetchTodo());
    setTodos(data.payload.data.todos);
  };

  useEffect(() => {
    loadTodo();
  }, []);

  // type CustomButtoType = ButtonProps & {
  //   isError?: boolean
  // }

  // const CustomButton = styled(Button,{shouldForwardProp:(prop)=>prop !== 'isError'})<CustomButtoType>(({theme,isError})=>({

  //    width: 300,
  // backgroundColor: isError
  //   ? theme.palette.error.main
  //   : theme.palette.success.main,
  // color: theme.palette.common.white,
  // }))

  const theme = createTheme({
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          variant: "contained",
        },
        styleOverrides: {
          root: {
            height: 50,
          },
        },
        variants: [
          {
            props: { color: "warning" },
            style: {
              fontSize: "20px",
            },
          },
        ],
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <TextField
            {...register("name", {
              required: "must have value",
              pattern: {
                value: /^[a-zA-Z0-9 ]*$/,
                message: "Invalid",
              },
            })}
            label="Add Todo"
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ height: 50 }}
          />
          <Button type="submit" endIcon={<AddIcon />}>
            Add
          </Button>
          {/* <Button onClick={()=> setValue("name", 'hehe,',{ shouldValidate: false })}>set value</Button> */}
          {/* <CustomButton isError={true}>xvvxvxvx</CustomButton> */}
        </Stack>
      </form>
      <ul style={{ listStyleType: "none" }}>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            {todos?.map((item: any) => (
              <li
                key={item.id}
                style={{ display: "flex", gap: 8, marginBottom: 8 }}
              >
                <TextField
                  value={item.name}
                  disabled={editId !== item.id}
                  onChange={(e) => handleChangeTodo(item.id, e.target.value)}
                  sx={{ height: 50 }}
                />
                {editId === item.id ? (
                  <Button onClick={() => handleSaveTodo(item)}>SAVE</Button>
                ) : (
                  <Button onClick={() => handleEditTodo(item.id)}>EDIT</Button>
                )}
                <Button
                  sx={{ bgcolor: "error.main" }}
                  onClick={() => handleDelete(item.id)}
                  endIcon={<DeleteIcon />}
                  color="warning"
                >
                  DELETE
                </Button>
              </li>
            ))}
          </Stack>
        )}
      </ul>
    </ThemeProvider>
  );
};

export default Todo;
