import React, { useState, useEffect } from "react";
import  TrashIcon  from "../icon";
import CheckIcon from "../checkIcon";

function Trash() {
  const [trashTasks, setTrashTasks] = useState(() => {
    const savedTrashTasks = localStorage.getItem("trashTasks");
    return savedTrashTasks ? JSON.parse(savedTrashTasks) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [visibility, setVisibility] = useState(null);

  useEffect(() => {
    localStorage.setItem("trashTasks", JSON.stringify(trashTasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [trashTasks, tasks]);

  const returnTask = (id) => {
    setTrashTasks((prevTrashTasks) => {
      const taskToReturn = prevTrashTasks.find((task) => task.id === id);
      if (taskToReturn) {
        setTasks((prevTasks) => {
          const isTaskInTasks = prevTasks.some((task) => task.id === taskToReturn.id);
          return isTaskInTasks ? prevTasks : [...prevTasks, { ...taskToReturn, done: false }];
        });
      }
      return prevTrashTasks.filter((task) => task.id !== id);
    });

  
    setVisibility(null);
  };

  const deleteForever = (id) => {
    setTrashTasks((prevTrashTasks) =>
      prevTrashTasks.filter((task) => task.id !== id)
    );

    setVisibility(null);
  };

  const toggleVisibility = (index) => {
    setVisibility((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      <div className="todo-header">
        <h3>Trash</h3>
      </div>
      <hr />
      <ul className="todo-list">
        {trashTasks.map((task, index) => (
          <li key={task.id} className="todo-item">
            <div className="taskItem">
              <button
                className="button-item"
                onClick={() => toggleVisibility(index)}
              >
                ⋮
              </button>

              {visibility === index && (
                <div className="trash-span dropdownMenu ">
                
                  <span  className="hover-cursor" onClick={() => deleteForever(task.id)}> <TrashIcon/> <span className="mx-2 ">Delete Forever</span></span>
                  <span className="hover-cursor mt-2" onClick={() => returnTask(task.id)}> <CheckIcon/> <span className="mx-2 ">Move Back To To Do</span></span>
                  
                </div>
              )}
            </div>
            <input
              type="checkbox"
              id={`task${task.id}`}
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <div className={task.done ? "underline-text" : ""}>{task.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trash;
