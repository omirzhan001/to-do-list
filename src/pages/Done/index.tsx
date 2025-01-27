import React, { useState, useEffect } from "react";

function Done() {
  const [doneTasks, setDoneTasks] = useState(() => {
    const savedDoneTasks = localStorage.getItem("doneTasks");
    return savedDoneTasks ? JSON.parse(savedDoneTasks) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [trashTasks, setTrashTasks] = useState(() => {
    const savedTrashTasks = localStorage.getItem("trashTasks");
    return savedTrashTasks ? JSON.parse(savedTrashTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("trashTasks", JSON.stringify(trashTasks));
  }, [doneTasks, tasks, trashTasks]);

  // Move the task back to Todo
  const toggleTask = (id) => {
    setDoneTasks((prevDoneTasks) => {
      const taskToToggle = prevDoneTasks.find((task) => task.id === id);
      if (taskToToggle) {
        setTasks((prevTasks) => [
          ...prevTasks,
          { ...taskToToggle, done: false },
        ]);
      }
      return prevDoneTasks.filter((task) => task.id !== id);
    });
  };

  // Move the task to Trash
  const deleteTask = (id) => {
    setDoneTasks((prevDoneTasks) => {
      const taskToDelete = prevDoneTasks.find((task) => task.id === id);
      if (taskToDelete) {
        setTrashTasks((prevTrashTasks) => [...prevTrashTasks, taskToDelete]);
      }
      return prevDoneTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <div>
       <div className="todo-header">
      <h3>Done</h3>
      </div>
      <hr />
      <ul className="todo-list">
        {doneTasks.map((task) => (
          <li key={task.id} className="todo-item">
            <input
              type="checkbox"
              id={`task${task.id}`}
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <label htmlFor={`task${task.id}`}>{task.name}</label>
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Done;
