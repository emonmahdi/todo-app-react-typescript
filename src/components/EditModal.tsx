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
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        padding: 16,
      }}
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: 16,
          borderRadius: 8,
          minWidth: 320,
        }}
      >
        <h3 id="edit-todo-title">Edit Todo</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
        />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
