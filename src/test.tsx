import React, { useState } from "react";
import "./style.css";

function Header({ addTask }) {
  const [newTask, setNewTask] = useState("");

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
  };

  return (
    <>
      <header className="header">
        <h2>Simple To Do List</h2>
        <span className="text-header">
          Today is an awesome day. The weather is awesome, you are awesome too!
        </span>
      </header>
      <div className="todo-header">
        <input
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
