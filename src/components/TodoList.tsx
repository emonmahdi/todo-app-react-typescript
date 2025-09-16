import React, { useState, useMemo } from "react";
import { type Todo } from "../types";
import TodoItem from "./TodoItem";
import EditModal from "./EditModal";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
};

const TodoList: React.FC<Props> = ({
  todos,
  onToggle,
  onUpdate,
  onDelete,
  onClearCompleted,
}) => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Todo | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return todos.filter((t) => {
      if (filter === "active" && t.completed) return false;
      if (filter === "completed" && !t.completed) return false;
      if (q && !t.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [todos, filter, search]);

  return (
    <section className="bg-purple-50 rounded-xl p-6 shadow-sm">
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search todos"
          className="flex-1 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition 
              ${
                filter === "all"
                  ? "bg-purple-200 text-purple-800 border-purple-300"
                  : "bg-purple-100 text-purple-600 border-transparent hover:bg-purple-200"
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            aria-pressed={filter === "active"}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition 
              ${
                filter === "active"
                  ? "bg-purple-200 text-purple-800 border-purple-300"
                  : "bg-purple-100 text-purple-600 border-transparent hover:bg-purple-200"
              }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            aria-pressed={filter === "completed"}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition 
              ${
                filter === "completed"
                  ? "bg-purple-200 text-purple-800 border-purple-300"
                  : "bg-purple-100 text-purple-600 border-transparent hover:bg-purple-200"
              }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Todo Items */}
      <ul className="divide-y divide-purple-200">
        {filtered.length === 0 ? (
          <li className="p-4 text-purple-500 italic text-center">
            No todos found
          </li>
        ) : (
          filtered.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={onToggle}
              onEdit={(todo) => setEditing(todo)}
              onDelete={onDelete}
            />
          ))
        )}
      </ul>

      {/* Footer stats + clear button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 gap-3">
        <div className="text-sm text-purple-600">
          <span>Total: {todos.length}</span> •{" "}
          <span>Active: {todos.filter((t) => !t.completed).length}</span> •{" "}
          <span>Completed: {todos.filter((t) => t.completed).length}</span>
        </div>
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition"
        >
          Clear completed
        </button>
      </div>

      {/* Edit Modal */}
      <EditModal
        todo={editing}
        onClose={() => setEditing(null)}
        onSave={onUpdate}
      />
    </section>
  );
};

export default TodoList;
