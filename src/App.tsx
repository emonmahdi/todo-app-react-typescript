import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

const App: React.FC = () => {
  const { todos, actions } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-10">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            ✨ Todo App
          </h1>
          <p className="text-gray-500">
            Simple, typed, localStorage-backed todo app.
          </p>
        </header>

        {/* Main Content */}
        <main>
          <TodoInput onAdd={actions.addTodo} />
          <TodoList
            todos={todos}
            onToggle={actions.toggleTodo}
            onUpdate={actions.updateTodo}
            onDelete={actions.deleteTodo}
            onClearCompleted={actions.clearCompleted}
          />
        </main>

        {/* Footer */}
        <footer className="text-center mt-6 text-sm text-gray-400">
          Created by Md Emon Mahdi
        </footer>
      </div>
    </div>
  );
};

export default App;
