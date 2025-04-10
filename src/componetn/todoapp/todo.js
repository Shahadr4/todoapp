import { useEffect } from "react";
import React, { useState } from "react";
import "./Todo.css";


const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => setSearchTerm(e.target.value.toLowerCase()));
    }
  }, []);

  const addTask = () => {
    if (input.trim()) {
      const newTask = {
        text: input,
        createdAt: new Date().toLocaleTimeString(),
        isEditing: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const toggleEdit = (index) => {
    const updated = [...tasks];
    updated[index].isEditing = !updated[index].isEditing;
    setTasks(updated);
  };

  const updateTaskText = (index, newText) => {
    const updated = [...tasks];
    updated[index].text = newText;
    setTasks(updated);
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="todo-container">
      <div className="todo-input">
        <input
          type="text"
          placeholder="What do you want to do?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="todo-list">
        {filteredTasks.map((task, index) => (
          <li key={index}>
            {task.isEditing ? (
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTaskText(index, e.target.value)}
              />
            ) : (
              <span>{task.text} <small className="timestamp">({task.createdAt})</small></span>
            )}
            <div className="actions">
              <button onClick={() => toggleEdit(index)}>{task.isEditing ? "Save" : "Edit"}</button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Todo;
