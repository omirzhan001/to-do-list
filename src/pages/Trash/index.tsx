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

  useEffect(() => {
    localStorage.setItem("trashTasks", JSON.stringify(trashTasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [trashTasks, tasks]);


  const returnTask = (id) => {
    setTrashTasks((prevTrashTasks) => {
      const taskToReturn = prevTrashTasks.find((task) => task.id === id);
      if (taskToReturn) {
        setTasks((prevTasks) => [
          ...prevTasks,
          { ...taskToReturn, done: false },
        ]);
      }
      return prevTrashTasks.filter((task) => task.id !== id);
    });
  };


  const deleteForever = (id) => {
    setTrashTasks((prevTrashTasks) =>
      prevTrashTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <div>
      <div className="todo-header">
      <h3>Trash</h3>
      </div>
      <hr />
      <ul className="todo-list">
        {trashTasks.map((task) => (
          <li key={task.id} className="todo-item">
            <span>{task.name}</span>
            <button onClick={() => returnTask(task.id)}>Вернуть</button>
            <button onClick={() => deleteForever(task.id)}>Удалить навсегда</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trash;
