import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';

function App() {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const handleNavigateToDashboard = () => {
      setSelectedTaskId(null);
    };

    window.addEventListener('navigateToDashboard', handleNavigateToDashboard);
    return () => window.removeEventListener('navigateToDashboard', handleNavigateToDashboard);
  }, []);

  const handleSelectTask = (taskId) => {
    setSelectedTaskId(taskId);
  };

  const handleBackToDashboard = () => {
    setSelectedTaskId(null);
  };

  const handleCreateTask = (taskData) => {
    console.log('New task created:', taskData);
    // Send to API here
    setShowTaskForm(false);
    // Refresh tasks in sidebar
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-slate-200 bg-white shadow-sm">
        <Sidebar
          selectedTaskId={selectedTaskId}
          onSelectTask={handleSelectTask}
          onOpenTaskForm={() => setShowTaskForm(true)}
        />
      </div>

      {/* Right Panel - Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Conditional rendering: Dashboard or Task Detail */}
        {!selectedTaskId ? (
          <Dashboard onTaskSelect={handleSelectTask} />
        ) : (
          <TaskDetail
            taskId={selectedTaskId}
            onBackToDashboard={handleBackToDashboard}
          />
        )}

        {/* Task Form Modal */}
        {showTaskForm && (
          <div className="fixed inset-0 z-50">
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={handleCloseForm}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;