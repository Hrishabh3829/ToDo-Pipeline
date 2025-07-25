import { nanoid } from 'nanoid';

// Initial demo tasks
const initialTasks = [
  { id: nanoid(), title: 'Learn React', description: 'Complete React tutorials', status: 'pending', priority: 'high' },
  { id: nanoid(), title: 'Build Dashboard', description: 'Create a responsive dashboard with shadcn UI', status: 'in-progress', priority: 'medium' },
  { id: nanoid(), title: 'Deploy Application', description: 'Deploy the application to production', status: 'pending', priority: 'low' },
];

// Create a task store
let tasks = [...initialTasks];

// Get all tasks
export function getAllTasks() {
  return [...tasks];
}

// Add a new task
export function addTask(task) {
  const newTask = {
    id: nanoid(),
    ...task,
    status: task.status || 'pending',
  };
  tasks = [...tasks, newTask];
  return newTask;
}

// Update an existing task
export function updateTask(id, updatedTask) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
  return tasks.find((task) => task.id === id);
}

// Delete a task
export function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  return id;
}

// Get task by ID
export function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}
