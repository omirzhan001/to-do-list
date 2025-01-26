import { useState, useEffect } from "react";

function Todo() {
  // Инициализация состояния с данными из localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, name: "Написать эссе", done: false },
      { id: 2, name: "Пройти часовой курс CSS онлайн", done: false },
      { id: 3, name: "Купить билеты в Сан-Франциско", done: false },
      { id: 4, name: "Сходить в спортзал", done: false },
      { id: 5, name: "Купить продукты", done: false },
    ];
  });

  // Сохраняем задачи в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Обработчик изменения состояния чекбокса
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // Добавление новой задачи
  const addTask = (name) => {
    const newTask = {
      id: tasks.length + 1,
      name,
      done: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Удаление задачи
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <header>
        <h2>Список дел</h2>
        <hr />
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
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
        <input
          type="text"
          placeholder="Добавить новую задачу"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              addTask(e.target.value.trim());
              e.target.value = "";
            }
          }}
        />
      </header>
    </>
  );
}

export default Todo;