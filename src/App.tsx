import "./assets/sass/App.css";
import { useState, useEffect, useMemo, useRef, type AnyActionArg } from "react";
import { fetchTodos, deleteTodo, updateTodo, createTodo } from "./services/api";

import trashIcon from "./assets/images/trash-solid-full.svg";
import editIcon from "./assets/images/pen-solid-full.svg";
import plusIcon from "./assets/images/plus-solid-full.svg";

const App = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    assignee: "testuser",
    priority: "MEDIUM",
    status: "TODO",
  });
  const [editTodo, setEditTodo] = useState<any>("");
  const [editId, setEditId] = useState<string>("");
  const editRef = useRef<any>(null);

  const inputRef = useRef<any>(null);
  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data.data.todos);
    setLoading(false);
  };
  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreateTodo = async (e: any) => {
    e.preventDefault();

    const data = {
      ...newTodo,
      name: inputRef.current.value,
    };

    try {
      const response = await createTodo(data);
      if (response.success) {
        setNewTodo({
          name: "",
          description: "",
          assignee: "testuser",
          priority: "MEDIUM",
          status: "TODO",
        });
        inputRef.current.value = "";
        loadTodos();
      } else {
        throw new Error("sf");
      }
    } catch (erorr) {
      console.error(erorr);
    }
  };
  const handeEditTodo = async (e: any, id: string, editTodo: any) => {
    e.preventDefault();
    const data = {
      ...newTodo,
      name: editTodo,
    };
    try {
      const response = await updateTodo(id, data);
      if (response.success) {
        loadTodos();
        setEditTodo("");
      }
    } catch {
      console.error("error");
    }
  };
  const handleDeleteTodo = async (e: any, id: string) => {
    e.preventDefault();
    try {
      const response = await deleteTodo(id);
      if (response.success) {
        loadTodos();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="Todo-App">
      <h1 className="Todo-App__title">To Do App</h1>
      <div className="Todo-App__header">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task..."
          className="Todo-App__input"
          onChange={(e)=> inputRef.current.value = e.target.value }
        />
        <button onClick={handleCreateTodo} className="button-add">
          <img src={plusIcon} alt="plus-icon" />
        </button>
      </div>
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : (
          todos.map((items) => (
            <li className="Todo-App__list-item" key={items.id}>
              <div className="Todo-App__input-group">
                <input type="checkbox" className="Todo-App__input-checkbox" />
                {editId === items.id ? (
                  <input
                    ref={editRef}
                    type="text"
                    onChange={(e) => {
                      setEditTodo(e.target.value);
                    }}
                    value={editTodo}
                    className="Todo-App__input-value"
                  />
                ) : (
                  <input
                    ref={editRef}
                    onChange={(e) => (editRef.current.value = e.target.value)}
                    type="text"
                    value={items.name}
                    className="Todo-App__input-value"
                  />
                )}
                <div className="Todo-App__input-group--button">
                  <button
                    onClick={(e) => {
                      handleDeleteTodo(e, items.id);
                    }}
                  >
                    <img src={trashIcon} alt="trash-icon" />
                  </button>
                  {editId === items.id ? (
                    <button
                      onClick={async (e) => {
                        await handeEditTodo(e, items.id, editTodo);
                        setEditId("");
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditId(items.id);
                        setEditTodo(items.name);
                      }}
                    >
                      <img src={editIcon} alt="edit-icon" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
