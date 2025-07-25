import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { TaskCard } from "@/components/task-card";
import { TaskForm } from "@/components/task-form";
import { TaskSummaryCard } from "@/components/task-summary-card";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { getAllTasks, addTask, updateTask, deleteTask } from "@/lib/tasks";

export const iframeHeight = "800px";

export const description = "A dashboard with a task management system.";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Load tasks when component mounts
    setTasks(getAllTasks());
  }, []);

  const handleAddTask = (taskData) => {
    const newTask = addTask(taskData);
    setTasks(getAllTasks());
  };

  const handleUpdateTask = (taskData, taskId) => {
    updateTask(taskId, taskData);
    setTasks(getAllTasks());
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
      setTasks(getAllTasks());
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-6 p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Task Dashboard</h1>
                <Button 
                  onClick={() => {
                    setEditingTask(null);
                    setIsFormOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </div>

              <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                <TaskSummaryCard 
                  title="Total Tasks" 
                  value={totalTasks} 
                  icon={<Clock className="h-5 w-5" />} 
                />
                <TaskSummaryCard 
                  title="Completed" 
                  value={completedTasks} 
                  icon={<CheckCircle2 className="h-5 w-5 text-green-500" />} 
                  className="text-green-500" 
                />
                <TaskSummaryCard 
                  title="In Progress" 
                  value={inProgressTasks} 
                  icon={<Clock className="h-5 w-5 text-orange-500" />} 
                  className="text-orange-500"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
                {tasks.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center h-60 border border-dashed border-gray-700 rounded-lg bg-card/30">
                    <p className="text-muted-foreground">No tasks yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-blue-700 text-blue-500 hover:bg-blue-950/20" 
                      onClick={() => {
                        setEditingTask(null);
                        setIsFormOpen(true);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add your first task
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        task={editingTask}
      />
    </div>
  )
}
