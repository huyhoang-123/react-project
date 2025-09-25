import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
    id:''
  };

  const [editId, setEditId] = useState<any>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<fieldType>();

  const onSubmit: SubmitHandler<fieldType> = async (data) => {
      const tempId = `temp_${Date.now().toString()}`
      const tempTodo: todoType = { ...newTodo, name: data.name, id: tempId };
    setTodos((prev: fieldType[]) => [...prev, tempTodo]);
    try {
    const result = await dispatch(createTodo(tempTodo));
    if (result.payload?.success) {
      // Thay id tạm bằng id thật từ server
      setTodos((prev:any) =>
        prev.map((t:any) => t.id === tempId ? { ...t, id: result.payload.data.id } : t)
      );
    } else {
      // rollback nếu server lỗi
      setTodos((prev:any) => prev.filter((t:any) => t.id !== tempId));
    }
  } catch (err) {
    setTodos((prev:any)=> prev.filter((t:any) => t.id !== tempId));
  }
  };

  const handleDelete = async (id: string) => {
    const prevState = [...todos];
    setTodos((prev: any) => prev.filter((item: any) => item.id !== id));
   if (!id.startsWith('temp')){
    try {
      const res = await dispatch(deleteTodo(id));
      if (!res.payload?.success) {
        setTodos(prevState);
        console.log(!res.payload?.success)
      }
    } catch {
      setTodos(prevState);
    }
  }
  };

  const loadTodo = async () => {
    const data = await dispatch(fetchTodo());
    setTodos(data.payload.data.todos);
  };

  useEffect(() => {
    loadTodo();
  }, []);

  return (
    <>
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
          <Button variant="contained" type="submit" sx={{ height: 50 }}>
            Submit
          </Button>
        </Stack>
      </form>
      <ul>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          todos?.map((item: any) => (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 5 }}
            >
              <TextField
                value={item.name}
                sx={{ height: 50 }}
                key={item.id}
              ></TextField>
              <Button variant="contained" sx={{ height: 50 }}>
                EDIT
              </Button>

              <Button
                variant="contained"
                sx={{ height: 50 }}
                onClick={() => handleDelete(item.id)}
              >
                DELETE
              </Button>
            </Stack>
          ))
        )}
      </ul>
    </>
  );
};

export default Todo;
