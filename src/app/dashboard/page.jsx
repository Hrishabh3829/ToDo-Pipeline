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
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { getAllTasks, addTask, updateTask, deleteTask, getTaskById } from "@/lib/tasks";
import { useAlert } from "@/components/alert-provider";

export const iframeHeight = "800px";

export const description = "A dashboard with a task management system.";

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const { showAlert } = useAlert();

  useEffect(() => {
    // Load tasks when component mounts
    setTasks(getAllTasks());
  }, []);

  const handleAddTask = (taskData) => {
    try {
      const newTask = addTask(taskData);
      setTasks(getAllTasks());
      showAlert('success', `Task "${taskData.title}" has been created successfully`);
    } catch (error) {
      showAlert('error', `Failed to create task: ${error.message || 'Unknown error'}`);
    }
  };

  const handleUpdateTask = (taskData, taskId) => {
    try {
      updateTask(taskId, taskData);
      setTasks(getAllTasks());
      setEditingTask(null);
      showAlert('success', `Task "${taskData.title}" has been updated successfully`);
    } catch (error) {
      showAlert('error', `Failed to update task: ${error.message || 'Unknown error'}`);
    }
  };

  const handleDeleteTask = (taskId) => {
    const task = getTaskById(taskId);
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteTask = () => {
    if (taskToDelete) {
      try {
        const taskTitle = taskToDelete.title || 'Unknown';
        deleteTask(taskToDelete.id);
        setTasks(getAllTasks());
        showAlert('info', `Task "${taskTitle}" has been deleted`);
      } catch (error) {
        showAlert('error', `Failed to delete task: ${error.message || 'Unknown error'}`);
      }
      setTaskToDelete(null);
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

              <div className="grid auto-rows-min gap-6 md:grid-cols-4">
                <TaskSummaryCard 
                  title="Total Tasks" 
                  value={totalTasks} 
                  icon={<Clock className="h-5 w-5 text-blue-500" />} 
                  className="text-blue-500" 
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
                <TaskSummaryCard 
                  title="Pending" 
                  value={pendingTasks} 
                  icon={<AlertCircle className="h-5 w-5 text-gray-400" />} 
                  className="text-gray-400"
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

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDeleteTask}
        taskTitle={taskToDelete?.title || "this task"}
      />
    </div>
  )
}
