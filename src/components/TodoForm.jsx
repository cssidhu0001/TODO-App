import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoForm.css";

export const TodoForm = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState({
        id: "",
        content: "",
        checked: false,
        time: "",
        date: "",
        priority: "",
        category: "",
        description: "",
    });

    const handleInputChange = (field, value) => {
        setInputValue((prev) => ({ ...prev, [field]: value, id: uuidv4() }));
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.content.trim()) return alert("Please enter a task!");
        onAddTodo(inputValue);
        setInputValue({
            id: "",
            content: "",
            checked: false,
            time: "",
            date: "",
            priority: "",
            category: "",
            description: "",
        });
    };

    return (
        <section className="form-section">
            <form className="todo-form" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    className="todo-input"
                    placeholder="✏️ Add a new task..."
                    value={inputValue.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                />
                <input
                    type="date"
                    value={inputValue.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                />
                <input
                    type="time"
                    value={inputValue.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                />

                <select
                    value={inputValue.priority}
                    onChange={(e) => handleInputChange("priority", e.target.value)}
                >
                    <option value="">Priority (optional)</option>
                    <option value="high">High 🔴</option>
                    <option value="medium">Medium 🟡</option>
                    <option value="low">Low 🟢</option>
                </select>

                <select
                    value={inputValue.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                >
                    <option value="">Category (optional)</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="study">Study</option>
                </select>

                <textarea
                    placeholder="Add details (optional)..."
                    value={inputValue.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                ></textarea>

                <button
                    type="submit"
                    className="todo-btn"
                    disabled={!inputValue.content.trim()}
                >
                    ➕ Add Task
                </button>
            </form>
        </section>
    );
};
