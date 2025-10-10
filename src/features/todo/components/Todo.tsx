import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTodoList } from '../hook/UseTodoList';
import { type todoType } from '../../../context/TodoSlice';

const Todo = () => {
  const {
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
  } = useTodoList();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ background: 'none' }}>
          <TextField
            {...register('name')}
            label="Add Todo"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Button type="submit" endIcon={<AddIcon />}>
            Add
          </Button>
        </Stack>
      </form>
      <ul style={{ listStyleType: 'none' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {todos?.map((item: todoType) => (
              <li
                key={item.id}
                style={{ display: 'flex', gap: 8, marginBottom: 8 }}
              >
                <TextField
                  value={item.name}
                  disabled={editId !== item.id}
                  onChange={(event) =>
                    handleChangeTodo(item.id, event.target.value)
                  }
                  sx={{ height: 50 }}
                />
                {editId === item.id ? (
                  <Button onClick={() => handleSaveTodo(item)}>SAVE</Button>
                ) : (
                  <Button onClick={() => handleEditTodo(item.id)}>EDIT</Button>
                )}
                <Button
                  sx={{ bgcolor: 'error.main' }}
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
    </>
  );
};

export default Todo;
