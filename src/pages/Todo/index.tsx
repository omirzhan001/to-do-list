import { useState, useEffect } from "react";
import './style.css'
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
      const doneTasks = updatedTasks.filter((task) => task.done);
      const remainingTasks = updatedTasks.filter((task) => !task.done);
      setDoneTasks((prev) => [...prev, ...doneTasks]);
      return remainingTasks;
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
      setTrashTasks((prev) => [...prev, deletedTask]);
      return prevTasks.filter((task) => task.id !== id);
    });
  };

  return (
    <>
      <header>
        <div className="todo-header">
          <h3>Todo</h3>
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
        </div>
        <hr />
        <div class="dropdown show">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Выпадающая ссылка
  </a>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id} className="todo-item">

              <button onClick={() => deleteTask(task.id)}>Удалить</button>

              <input
                type="checkbox"
                id={`task${task.id}`}
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <label htmlFor={`task${task.id}`}>{task.name}</label>

            </li>
          ))}
        </ul>

      </header>
    </>
  );
}

export default Todo;
