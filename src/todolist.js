import React, { useState } from 'react';
import './todolist.css'; // Import the CSS file for styling

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ text: '', day: 'Monday' }); // Include a default value for day
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedDay, setEditedDay] = useState('Monday'); // Include a default value for day
  const [sortOption, setSortOption] = useState('uncompleted');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const addTodo = () => {
    if (newTodo.text.trim() !== '') {
      const newTodoItem = { id: Date.now(), ...newTodo, completed: false };
      setTodos([...todos, newTodoItem]);
      setNewTodo({ text: '', day: 'Monday' }); // Reset input fields
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const startEditing = (id, text, day) => {
    setEditingId(id);
    setEditedText(text);
    setEditedDay(day);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedText('');
    setEditedDay('Monday');
  };

  const saveEditedTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: editedText, day: editedDay } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
    setEditedText('');
    setEditedDay('Monday');
  };

  const sortedTodos = todos.slice().sort((a, b) => {
    const dayOrder = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7
    };
  
    if (sortOption === 'completed') {
      return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
    } else if (sortOption === 'uncompleted') {
      return a.completed === b.completed ? 0 : !a.completed ? -1 : 1;
    } else if (sortOption === 'alphabetical') {
      return a.text.localeCompare(b.text);
    } else {
      return dayOrder[a.day] - dayOrder[b.day];
    }
  });
  return (
    <div className="todo-container">
      <h1 className="todo-header">Subject list</h1>
      <div className="input-container">
        <input
          type="text"
          name="text"
          value={newTodo.text}
          onChange={handleInputChange}
          placeholder="Add new todo"
          className="todo-input"
        />
        <select
          name="day"
          value={newTodo.day}
          onChange={handleInputChange}
          className="day-select"
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <button onClick={addTodo} className="add-button">Add</button>
      </div>
      <div className="sort-container">
  <label htmlFor="sort">Sort By:</label>
  <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
    <option value="uncompleted">Uncompleted</option>
    <option value="completed">Completed</option>
    <option value="alphabetical">Alphabetical</option>
    <option value="day">Day</option> {/* Add this option */}
  </select>
</div>
      <ul className="todo-list">
        {sortedTodos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="edit-input"
                />
                <select
                  value={editedDay}
                  onChange={(e) => setEditedDay(e.target.value)}
                  className="day-select"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            ) : (
              <div>
                <span>{todo.text}</span>
                <span>({todo.day})</span>
              </div>
            )}
            <div>
              {editingId === todo.id ? (
                <>
                  <button onClick={() => saveEditedTodo(todo.id)} className="save-button">Save</button>
                  <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditing(todo.id, todo.text, todo.day)} className="edit-button">Edit</button>
                  <button onClick={() => toggleComplete(todo.id)} className="complete-button">
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => removeTodo(todo.id)} className="remove-button">Remove</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
