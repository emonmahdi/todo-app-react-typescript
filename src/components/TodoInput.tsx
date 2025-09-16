import React, { useState, type FormEvent } from "react";

type Props = {
  onAdd: (title: string) => void;
};

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("⚠️ Please enter a todo");
      return;
    }
    onAdd(trimmed);
    setTitle("");
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {/* Label */}
      <label
        htmlFor="new-todo"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Add Todo
      </label>

      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          id="new-todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Buy groceries, Read book..."
          aria-label="New todo"
          className={`flex-grow px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition 
            ${error ? "border-red-400" : "border-gray-300"}`}
        />
        <button
          type="submit"
          aria-label="Add todo"
          className="px-5 py-2 rounded-lg bg-indigo-500 text-black font-semibold shadow hover:bg-indigo-600 active:scale-95 transition-transform"
        >
          Add
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="mt-2 text-sm text-red-600 font-medium animate-pulse"
        >
          {error}
        </div>
      )}
    </form>
  );
};

export default TodoInput;
