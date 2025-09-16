import { useReducer, useEffect, useCallback } from "react";
import { type Todo } from "../types";
import { generateId } from "../utils/id";

const STORAGE_KEY = "todos-v1";

type Action =
  | { type: "ADD"; payload: { title: string } }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "UPDATE"; payload: { id: string; title: string } }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET"; payload: Todo[] };

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD": {
      const title = action.payload.title.trim();
      if (!title) return state;
      const newTodo: Todo = {
        id: generateId(),
        title,
        completed: false,
        createdAt: Date.now(),
      };
      return [newTodo, ...state];
    }

    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t
      );

    case "UPDATE":
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, title: action.payload.title.trim(), updatedAt: Date.now() } : t
      );

    case "DELETE":
      return state.filter((t) => t.id !== action.payload.id);

    case "CLEAR_COMPLETED":
      return state.filter((t) => !t.completed);

    case "SET":
      return action.payload;

    default:
      return state;
  }
}

export const useTodos = () => {
  // initialize from localStorage lazily
  const [todos, dispatch] = useReducer(todosReducer, [], () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Todo[]) : [];
    } catch {
      return [];
    }
  });

  // persist to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      // ignore write errors for now (could show UI error)
      console.error("Failed to save todos", e);
    }
  }, [todos]);

  // action creators (memoized)
  const addTodo = useCallback((title: string) => dispatch({ type: "ADD", payload: { title } }), []);
  const toggleTodo = useCallback((id: string) => dispatch({ type: "TOGGLE", payload: { id } }), []);
  const updateTodo = useCallback((id: string, title: string) => dispatch({ type: "UPDATE", payload: { id, title } }), []);
  const deleteTodo = useCallback((id: string) => dispatch({ type: "DELETE", payload: { id } }), []);
  const clearCompleted = useCallback(() => dispatch({ type: "CLEAR_COMPLETED" }), []);
  const setTodos = useCallback((list: Todo[]) => dispatch({ type: "SET", payload: list }), []);

  return {
    todos,
    actions: { addTodo, toggleTodo, updateTodo, deleteTodo, clearCompleted, setTodos },
  };
};
