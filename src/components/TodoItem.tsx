import React from "react";
import { type Todo } from "../types";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 8,
        borderBottom: "1px solid #eee",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.title} as ${
          todo.completed ? "incomplete" : "complete"
        }`}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </div>
        <small style={{ color: "#666" }}>
          {new Date(todo.createdAt).toLocaleString()}
        </small>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(todo)} aria-label={`Edit ${todo.title}`}>
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete ${todo.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

// memo to avoid re-render unless props change
export default React.memo(TodoItem);
