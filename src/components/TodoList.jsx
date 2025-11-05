import { MdCheck, MdDeleteForever } from "react-icons/md";

export const TodoList = ({ data, onHandleDeleteTodo, onHandleCheckTodo }) => {
    const { content, time, date, checked, priority, category, description } = data;

    return (
        <li className={`todo-item ${priority || ""}`}>
            <div className="todo-content">
                <span className={checked ? "checkList" : "nonCheckList"}>{content}</span>

                <div className="todo-meta">
                    {date && <small>📅 {date}</small>}
                    {time && <small> ⏰ {time}</small>}
                    {category && <small> | {category.toUpperCase()}</small>}
                    {priority && <small> | {priority.toUpperCase()}</small>}
                </div>

                {description && <p className="todo-desc">🗒️ {description}</p>}
            </div>

            <div className="action-buttons">
                <button
                    className={`check-btn ${checked ? "checked" : ""}`}
                    onClick={() => onHandleCheckTodo(content)}
                >
                    <MdCheck />
                </button>
                <button
                    className="delete-btn"
                    onClick={() => onHandleDeleteTodo(content)}
                >
                    <MdDeleteForever />
                </button>
            </div>
        </li>
    );
};
