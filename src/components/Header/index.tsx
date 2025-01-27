import React, { useState, useRef } from "react";
import "./style.css";

function Header({ addTask }) {
  const [newTask, setNewTask] = useState("");
  const inputRef = useRef(null);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const prevTasks = localStorage.getItem("tasks");
    const tasks = prevTasks ? JSON.parse(prevTasks) : [];
    tasks.push({ id: tasks.length + 1, name: newTask, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setNewTask("");

    if (addTask) {
      addTask(newTask);
    }

    window.location.reload();
  };

  return (
    <>
      <header className="header">
        <div>
        <h2>Simple To Do List</h2>
        <span className="text-header">
          Today is an awesome day. The weather is awesome, you are awesome too!
        </span>
        </div>
      </header>

      <div className="header-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Добавить новую задачу"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
          />
          <button onClick={handleAddTask} className="add-task-btn">
            Add
          </button>
        </div>

    </>
  );
}

export default Header;
