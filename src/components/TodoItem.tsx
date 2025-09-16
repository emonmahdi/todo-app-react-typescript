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
    <li className="flex items-center gap-4 p-4 border-b border-purple-200 hover:bg-purple-50 transition-colors duration-200">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.title} as ${
          todo.completed ? "incomplete" : "complete"
        }`}
        className="h-5 w-5 rounded-md border-2 border-purple-400 text-purple-600 focus:ring-purple-500"
      />

      {/* Content */}
      <div className="flex-1">
        <div
          className={`text-lg font-medium ${
            todo.completed ? "line-through text-purple-400" : "text-purple-800"
          }`}
        >
          {todo.title}
        </div>
        <small className="text-sm text-purple-500">
          {new Date(todo.createdAt).toLocaleString()}
        </small>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(todo)}
          aria-label={`Edit ${todo.title}`}
          className="px-3 py-1 text-sm rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete ${todo.title}`}
          className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

// memo to avoid re-render unless props change
export default React.memo(TodoItem);
