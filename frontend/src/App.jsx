import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TaskDetail from "./components/TaskDetail";
import TaskForm from "./components/TaskForm";

function App() {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleNavigateToDashboard = () => {
      setSelectedTaskId(null);
    };

    window.addEventListener("navigateToDashboard", handleNavigateToDashboard);
    return () =>
      window.removeEventListener(
        "navigateToDashboard",
        handleNavigateToDashboard
      );
  }, []);

  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId);
    setMobileSidebarOpen(false); // close sheet on select (mobile)
  };

  const handleBackToDashboard = () => {
    setSelectedTaskId(null);
  };

  const handleCreateTask = (taskData) => {
    console.log("New task created:", taskData);
    // Send to API here
    setShowTaskForm(false);
    // Refresh tasks in sidebar if wired to real data
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
  };

  return (
    <div className="h-screen w-full bg-background flex overflow-hidden">
      {/* Desktop sidebar (unchanged on md+) */}
      <div className="hidden md:block">
        <Sidebar
          selectedTaskId={selectedTaskId}
          onSelectTask={handleSelectTask}
          onOpenTaskForm={() => setShowTaskForm(true)}
        />
      </div>

      {/* Mobile sidebar sheet – slides in from left on small screens */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-[320px] max-w-full h-full bg-white shadow-xl flex flex-col">
            {/* Mobile sidebar header with logo + X */}
            <div className="h-12 px-3 border-b bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  Z
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  ZenTask
                </span>
              </div>
              <button
                type="button"
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>

            {/* Actual sidebar content, scrollable on short screens */}
            <div className="flex-1 overflow-y-auto">
              <Sidebar
                selectedTaskId={selectedTaskId}
                onSelectTask={handleSelectTask}
                onOpenTaskForm={() => setShowTaskForm(true)}
              />
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setMobileSidebarOpen(false)}
          />
        </div>
      )}

      {/* Right side: header (mobile only) + main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Mobile top bar; hidden on desktop */}
        <header className="flex items-center justify-between px-3 h-12 border-b bg-white md:hidden shrink-0">
          <button
            type="button"
            className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-slate-100"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <i className="bi bi-list text-lg" />
          </button>

          <div className="flex items-center gap-2">
            {/* Overview icon button (matches sidebar Overview icon) */}
            <button
              type="button"
              className="h-8 w-8 rounded-md border border-slate-200 flex items-center justify-center hover:bg-slate-50"
            >
              <i className="bi bi-layout-sidebar text-slate-600 text-sm" />
            </button>

            {/* Plus button opens task/habit form */}
            <button
              type="button"
              className="h-8 w-8 rounded-md bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
              onClick={() => setShowTaskForm(true)}
            >
              <i className="bi bi-plus-lg text-sm" />
            </button>
          </div>
        </header>

        {/* Scrollable main area so short screens can reach all content */}
        <main className="flex-1 overflow-y-auto">
          {selectedTaskId ? (
            <TaskDetail
              taskId={selectedTaskId}
              onBack={handleBackToDashboard}
            />
          ) : (
            <Dashboard onSelectTask={handleSelectTask} />
          )}
        </main>
      </div>

      {showTaskForm && (
        <TaskForm onSubmit={handleCreateTask} onCancel={handleCloseForm} />
      )}
    </div>
  );
}

export default App;
