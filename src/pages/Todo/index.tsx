import React, { useState, useEffect } from "react";
import "./style.css";
import TrashIcon from "../icon";
import Header from "../../components/Header/";

function Todo() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
        { id: 1, name: "Написать эссе", done: false },
        { id: 2, name: "Пройти часовой курс CSS онлайн", done: false },
        { id: 3, name: "Купить билеты в Сан-Франциско", done: false },
        { id: 4, name: "Сходить в спортзал", done: false },
        { id: 5, name: "Купить продукты", done: false },
      ];
  });

  const [doneTasks, setDoneTasks] = useState(() => {
    const savedDoneTasks = localStorage.getItem("doneTasks");
    return savedDoneTasks ? JSON.parse(savedDoneTasks) : [];
  });

  const [trashTasks, setTrashTasks] = useState(() => {
    const savedTrashTasks = localStorage.getItem("trashTasks");
    return savedTrashTasks ? JSON.parse(savedTrashTasks) : [];
  });

  const [visibility, setVisibility] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    localStorage.setItem("trashTasks", JSON.stringify(trashTasks));
  }, [tasks, doneTasks, trashTasks]);

  const toggleTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );

      const toggledTask = updatedTasks.find((task) => task.id === id && task.done);
      if (toggledTask) {
        setDoneTasks((prev) => [...prev.filter((t) => t.id !== toggledTask.id), toggledTask]);
      }

      return updatedTasks.filter((task) => !task.done);
    });
  };
  
  const addTask = (name) => {
    const newTask = {
      id: tasks.length + 1 + doneTasks.length + trashTasks.length,
      name,
      done: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  
  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const deletedTask = prevTasks.find((task) => task.id === id);
      if (deletedTask) {
        setTrashTasks((prevTrashTasks) => {
          const isTaskInTrash = prevTrashTasks.some((task) => task.id === deletedTask.id);
          return isTaskInTrash ? prevTrashTasks : [...prevTrashTasks, deletedTask];
        });
      }
      return prevTasks.filter((task) => task.id !== id);
    });
    setVisibility(null);
  };

  const toggleVisibility = (index) => {
    setVisibility((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <header>
        <div className="todo-header">
          <h3>Todo</h3>
        </div>
        <hr />

        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={task.id} className="todo-item">
              <div className="taskItem">
                <button
                  className="button-item"
                  onClick={() => toggleVisibility(index)}
                >
                  ⋮
                </button>
                {visibility === index && (
                  <div className="dropdownMenu">
                    <TrashIcon />
                    <span className="hover-cursor mx-2" onClick={() => deleteTask(task.id)}>
                      Move to Trash
                    </span>
                  </div>
                )}
              </div>
              <input
                type="checkbox"
                id={`task${task.id}`}
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <label className="mx-2" htmlFor={`task${task.id}`}>
                {task.name}
              </label>
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}

export default Todo;
