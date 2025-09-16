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
    <section>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search todos"
          style={{ flex: 1, padding: 8 }}
        />
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            aria-pressed={filter === "active"}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            aria-pressed={filter === "completed"}
          >
            Completed
          </button>
        </div>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filtered.length === 0 ? (
          <li style={{ padding: 12, color: "#666" }}>No todos found</li>
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <div>
          <small>
            Total: {todos.length} • Active:{" "}
            {todos.filter((t) => !t.completed).length} • Completed:{" "}
            {todos.filter((t) => t.completed).length}
          </small>
        </div>
        <div>
          <button onClick={onClearCompleted}>Clear completed</button>
        </div>
      </div>

      <EditModal
        todo={editing}
        onClose={() => setEditing(null)}
        onSave={onUpdate}
      />
    </section>
  );
};

export default TodoList;
