"use client";

import { useState, useEffect } from "react";
import { Check, Trash2, Edit2, Plus, X, Search, CheckCircle } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      
      const payload = { title, description };
      let res;
      
      if (editingTask) {
        res = await fetch(`/api/tasks/${editingTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to save task");
      }

      await fetchTasks();
      closeModal();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTaskCompletion = async (task: Task) => {
    try {
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, isCompleted: !task.isCompleted } : t
        )
      );
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !task.isCompleted }),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch (err) {
      console.error("Failed to toggle completion", err);
      // Revert if failed
      await fetchTasks();
    }
  };

  const deleteTask = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeTasks = filteredTasks.filter((t) => !t.isCompleted);
  const completedTasks = filteredTasks.filter((t) => t.isCompleted);

  const progress = tasks.length > 0 ? Math.round((tasks.filter(t => t.isCompleted).length / tasks.length) * 100) : 0;
  
  // Date rendering
  const dateString = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      {/* Decorative Gradients for premium look */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-[100%] bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-[100%] bg-purple-900/15 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-3">
            <p className="text-indigo-400 font-medium tracking-wide text-sm uppercase">{dateString}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
              My Tasks
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Circular Progress (Visible on bigger screens) */}
            <div className="w-full sm:w-auto px-5 py-3.5 bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-neutral-800/50 hidden sm:block shadow-xl shadow-black/20">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <p className="text-neutral-400 font-medium">Progress</p>
                  <p className="text-white font-semibold">{progress}% Completed</p>
                </div>
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 transform -rotate-90 origin-center">
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-neutral-800" />
                    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * progress) / 100} className="text-indigo-500 transition-all duration-1000 ease-out" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white text-neutral-950 font-bold transition-all hover:scale-[1.02] active:scale-95 w-full sm:w-auto overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Plus className="w-5 h-5 relative z-10" strokeWidth={3} />
              <span className="relative z-10">New Task</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-10 relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search your tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-5 py-4 bg-neutral-900/30 backdrop-blur-xl border border-neutral-800/60 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-neutral-500 outline-none transition-all shadow-sm text-base"
          />
        </div>

        {/* Lists */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="text-neutral-500 text-sm font-medium animate-pulse">Syncing tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 px-6 text-center border border-dashed border-neutral-800/80 rounded-[32px] bg-neutral-900/10 backdrop-blur-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full flex items-center justify-center mb-6 border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <CheckCircle className="w-10 h-10 text-indigo-400 opacity-80" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Stay focused, stay ahead</h3>
            <p className="text-neutral-400 max-w-md mx-auto mb-8 leading-relaxed text-lg">
              You don&apos;t have any tasks right now. Take a deep breath or create a new task to organize your day.
            </p>
            <button
              onClick={openAddModal}
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-500/10"
            >
              <Plus className="w-4 h-4" /> Create your first task
            </button>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-700 slide-in-from-bottom-4">
            {/* Active Tasks Group */}
            {activeTasks.length > 0 ? (
              <section>
                <div className="flex items-center gap-3 mb-5 pl-2">
                  <h2 className="text-sm font-bold tracking-widest text-neutral-400 uppercase">To Do</h2>
                  <div className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                    {activeTasks.length}
                  </div>
                </div>
                <div className="grid gap-3.5">
                  {activeTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggle={() => toggleTaskCompletion(task)} 
                      onEdit={() => openEditModal(task)} 
                      onDelete={() => deleteTask(task.id)} 
                    />
                  ))}
                </div>
              </section>
            ) : searchQuery ? (
               <div className="text-center py-12 rounded-3xl border border-neutral-800/50 bg-neutral-900/20 text-neutral-500 text-lg">
                 No active tasks match your search.
               </div>
            ) : null}

            {/* Completed Tasks Group */}
            {completedTasks.length > 0 && (
              <section className="opacity-60 transition-opacity duration-300 hover:opacity-100">
                <div className="flex items-center gap-3 mb-5 pl-2">
                  <h2 className="text-sm font-bold tracking-widest text-neutral-500 uppercase">Completed</h2>
                  <div className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-neutral-500 text-xs font-bold border border-neutral-800">
                    {completedTasks.length}
                  </div>
                </div>
                <div className="grid gap-3.5">
                  {completedTasks.map((task) => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onToggle={() => toggleTaskCompletion(task)} 
                      onEdit={() => openEditModal(task)} 
                      onDelete={() => deleteTask(task.id)} 
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Modal / Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeModal}
          />
          <div className="relative bg-neutral-900/95 backdrop-blur-2xl border border-neutral-800 w-full max-w-lg rounded-[28px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-800/60 bg-white/5">
              <h2 className="text-xl font-bold tracking-tight text-white">
                {editingTask ? "Edit Task" : "New Task"}
              </h2>
              <button 
                onClick={closeModal}
                className="text-neutral-500 hover:text-white transition-colors p-2 rounded-full hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={saveTask} className="p-6">
              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  {error}
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-neutral-300 mb-2.5">
                    Task Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="E.g., Prepare weekly report"
                    className="w-full px-5 py-4 bg-neutral-950/50 border border-neutral-800 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-neutral-600 outline-none transition-shadow text-lg"
                    autoFocus
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-end mb-2.5">
                    <label htmlFor="description" className="block text-sm font-semibold text-neutral-300">
                      Description
                    </label>
                    <span className="text-xs text-neutral-600 font-medium">Optional</span>
                  </div>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add any extra links, notes, or context here..."
                    rows={4}
                    className="w-full px-5 py-4 bg-neutral-950/50 border border-neutral-800 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-white placeholder-neutral-600 outline-none transition-shadow resize-none"
                  />
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-neutral-800/60 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3.5 rounded-2xl text-neutral-400 hover:text-white hover:bg-neutral-800 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.25)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] active:scale-95"
                >
                  {isSubmitting ? "Saving..." : editingTask ? "Save Details" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Separate component for Task Card
function TaskCard({ task, onToggle, onEdit, onDelete }: { 
  task: Task; 
  onToggle: () => void; 
  onEdit: () => void; 
  onDelete: () => void;
}) {
  return (
    <div 
      className={`group flex items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-[24px] transition-all duration-300 border backdrop-blur-sm ${
        task.isCompleted 
          ? "bg-neutral-900/20 border-transparent hover:bg-neutral-900/40" 
          : "bg-neutral-900/40 border-neutral-800/60 hover:border-neutral-700/80 hover:bg-neutral-800/50 hover:shadow-2xl hover:shadow-black/40"
      }`}
    >
      <div className="flex items-start gap-4 sm:gap-5 overflow-hidden flex-1">
        <button
          onClick={onToggle}
          className={`relative flex-shrink-0 mt-1 sm:mt-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 overflow-hidden ${
            task.isCompleted 
              ? "bg-indigo-500 border-indigo-500 scale-[0.9]" 
              : "border-neutral-600 hover:border-indigo-500 bg-transparent hover:bg-indigo-500/10"
          }`}
        >
          <div className={`absolute inset-0 bg-indigo-500 transition-transform duration-300 ${task.isCompleted ? 'scale-100' : 'scale-0'}`} />
          <Check className={`w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-all duration-300 ${task.isCompleted ? 'text-white scale-100 opacity-100' : 'text-transparent scale-50 opacity-0'}`} strokeWidth={3} />
        </button>
        
        <div className="overflow-hidden flex-1">
          <h3 
            className={`text-base sm:text-lg font-semibold transition-colors duration-300 truncate ${
              task.isCompleted ? "text-neutral-500 line-through" : "text-white"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p 
              className={`text-sm mt-1.5 sm:mt-2 leading-relaxed transition-colors duration-300 ${
                task.isCompleted ? "text-neutral-600 line-through decoration-neutral-600/30" : "text-neutral-400"
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex flex-shrink-0 gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity focus-within:opacity-100">
        <button
          onClick={onEdit}
          className="p-2 sm:p-2.5 text-neutral-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all"
          aria-label="Edit task"
        >
          <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 sm:p-2.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
