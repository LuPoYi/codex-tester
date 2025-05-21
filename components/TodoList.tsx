import { useState } from 'react';

export default function TodoList() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (task.trim() === '') return;
    setTodos([...todos, task.trim()]);
    setTask('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
