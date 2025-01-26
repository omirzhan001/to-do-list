import { useState, useEffect } from "react";

function Todo() {

const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [
    { id: 1, name: "Write Essay", done: false },
    { id: 2, name: "One Hour CSS Course Online", done: false },
    { id: 3, name: "Buy One Way Tickets to San Francisco", done: false },
    { id: 4, name: "Go to Gym", done: false },
    { id: 5, name: "Buy Groceries", done: false },
  ]
});

  // Сохраняем задачи в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  return (
    <>
      <header>
        
        <h2>Todo</h2>
        <hr />
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" 
              id={`task${task.id}` } />
              <label htmlFor={`task${task.id}`}>{task.name}</label>
            </li>
          ))}
        </ul>
      </header>
    </>
  )
}

export default Todo