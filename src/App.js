import React, { useState } from "react";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({
    title: "",
    date: "",
    priority: "Low",
    reminder: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? taskForm : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, taskForm]);
    }
    setTaskForm({ title: "", date: "", priority: "Low", reminder: "" });
  };

  const handleEdit = (index) => {
    setTaskForm(tasks[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const goBack = () => {
    alert("Back button clicked. Implement navigation logic here!");
  };

  return (
    <div className="app-container">
      <header className="header">
        <button className="back-button" onClick={goBack}>
          &#8592;
        </button>
        <h1>Task Management System</h1>
      </header>
      <main>
        <form id="task-form" className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            placeholder="Task Title"
            value={taskForm.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            id="date"
            value={taskForm.date}
            onChange={handleChange}
            required
          />
          <select
            id="priority"
            value={taskForm.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="datetime-local"
            id="reminder"
            value={taskForm.reminder}
            onChange={handleChange}
          />
          <button type="submit">
            {editingIndex !== null ? "Update Task" : "Add Task"}
          </button>
        </form>
        <div id="task-list" className="task-list">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p className="task-date">Due: {task.date}</p>
                <p className="task-priority">Priority: {task.priority}</p>
                <p className="task-reminder">
                  {task.reminder ? `Reminder: ${task.reminder}` : ""}
                </p>
              </div>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
