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
  };
  

  const deleteForever = (id) => {
    setTrashTasks((prevTrashTasks) =>
      prevTrashTasks.filter((task) => task.id !== id)
    );
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
            <button
              className="button-item-2"
              onClick={() => toggleVisibility(index)}
            >
              ⋮
            </button>
            {visibility === index && (
              <div className="dropdownMenu-2">
                <button className="mx-3 mt-2"onClick={() => returnTask(task.id)}>Вернуть</button >
                <button  className="mx-3 mt-2"onClick={() => deleteForever(task.id)}>
                  Удалить навсегда
                </button>
              </div>
            )}
            <span>{task.name}</span>
            <div className="taskItem">
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trash;
