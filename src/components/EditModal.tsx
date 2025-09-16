import React, { useState, useEffect } from "react";
import { type Todo } from "../types";

type Props = {
  todo: Todo | null;
  onClose: () => void;
  onSave: (id: string, title: string) => void;
};

const EditModal: React.FC<Props> = ({ todo, onClose, onSave }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(todo?.title ?? "");
  }, [todo]);

  if (!todo) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave(todo.id, trimmed);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-todo-title"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 animate-fade-in"
      >
        {/* Title */}
        <h3
          id="edit-todo-title"
          className="text-lg font-semibold text-gray-800 mb-4"
        >
          ✏️ Edit Todo
        </h3>

        {/* Input */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Update your todo..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition mb-4"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-black font-semibold shadow hover:bg-indigo-600 active:scale-95 transition-transform"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
