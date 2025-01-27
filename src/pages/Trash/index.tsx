import React, { useState, useEffect } from "react";

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

    // Close the dropdown menu
    setVisibility(null);
  };

  const deleteForever = (id) => {
    setTrashTasks((prevTrashTasks) =>
      prevTrashTasks.filter((task) => task.id !== id)
    );

    // Close the dropdown menu
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
                <div className="dropdownMenu">
                  <span onClick={() => returnTask(task.id)}>Вернуть</span>
                  <span onClick={() => deleteForever(task.id)}>Удалить навсегда</span>
                </div>
              )}
            </div>
            <span className="mx-2">{task.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trash;
