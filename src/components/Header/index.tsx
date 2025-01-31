import React, { useState, useRef } from "react";
import "./style.css";
import PlusImg from "../img/plus.png";

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
  /*  */
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);;
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  return (
    <>
      <header className="header">

        <div>
          <h2>Simple To Do List</h2>
          <span className="text-header ">
            Today is an awesome day. The weather is awesome, you are awesome too!
          </span>
        </div>
      </header>
      {/*  */}

      <div className="header-input">
        <div className="plus-btn">
          <div>
            <button
              onClick={toggleDropdown}
              className="add-task-btn-2">
              <img
                src={PlusImg}
                alt="Add Task"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
            </button>
          </div>
          {isDropdownVisible && (
            <div className="input-group">
              <span>Add New To Do</span>
              <input
                ref={inputRef}
                type="text"
                className="input-add-task"
                placeholder="Добавить новую задачу"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTask();
                }}
              />
              <div>
                <button onClick={handleAddTask} className="add-task-btn mt-2 mx-2">
                  Add
                </button>
              </div>
            </div>

          )}
        </div>
      </div>
      {/*  */}

    </>
  );
}

export default Header;
