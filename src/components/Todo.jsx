import { useState, useEffect } from "react";
import "./Todo.css";
import { TodoDate } from "./TodoDate";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import {
  getLocalStorageTodoData,
  setLocalStorageTodoData,
} from "./TodoLocalStorage";

export const Todo = () => {
  const [task, setTask] = useState(() => getLocalStorageTodoData());
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortType, setSortType] = useState("none");

  // save to local storage
  useEffect(() => {
    setLocalStorageTodoData(task);
  }, [task]);

  // dark mode
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked, time, date, priority, category, description } =
      inputValue;
    if (!content.trim()) return alert("Please enter a task!");
    setTask((prev) => [
      ...prev,
      { id, content, checked, time, date, priority, category, description },
    ]);
  };

  const handleDeleteTodo = (content) => {
    setTask(task.filter((t) => t.content !== content));
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) setTask([]);
  };

  const handleCheckTodo = (contentToCheck) => {
    setTask(
      task.map((t) =>
        t.content === contentToCheck ? { ...t, checked: !t.checked } : t
      )
    );
  };

  // sorting
  const sortedTasks = [...task].sort((a, b) => {
    if (sortType === "time" && a.time && b.time)
      return a.time.localeCompare(b.time);
    if (sortType === "priority") {
      const order = { high: 1, medium: 2, low: 3 };
      return order[a.priority || "medium"] - order[b.priority || "medium"];
    }
    return 0;
  });

  // filtering
  const visibleTasks =
    filter === "all"
      ? sortedTasks
      : sortedTasks.filter((t) => t.category === filter);

  const completed = task.filter((t) => t.checked).length;

  return (
    <section className="todo-container">
      <header>
        <h1>📝 Task List Management System</h1>
        <h3>------By Charanjeet Singh Sidhu----</h3>
        <TodoDate />
      </header>

      <div className="top-controls">
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="filters">
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
          </select>

          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="none">Sort</option>
            <option value="time">By Time</option>
            <option value="priority">By Priority</option>
          </select>
        </div>
      </div>

      <TodoForm onAddTodo={handleFormSubmit} />

      <div className="progress">
        <p>
          ✅ Completed: {completed}/{task.length}
        </p>
        <progress value={completed} max={task.length}></progress>
      </div>

      <section className="myUnOrdlist">
        <ul>
          {visibleTasks.length === 0 ? (
            <p className="empty-msg">No tasks yet! Add something 😊</p>
          ) : (
            visibleTasks.map((curr) => (
              <TodoList
                key={curr.id}
                data={curr}
                onHandleDeleteTodo={handleDeleteTodo}
                onHandleCheckTodo={handleCheckTodo}
              />
            ))
          )}
        </ul>
      </section>

      {task.length > 0 && (
        <section className="clear-section">
          <button className="clear-btn" onClick={handleClear}>
            🧹 Clear All
          </button>
        </section>
      )}
    </section>
  );
};
