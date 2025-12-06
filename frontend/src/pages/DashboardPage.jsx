import React, { useState, useEffect } from "react";
import { Container, Button, Offcanvas } from 'react-bootstrap';
import { List, LayoutSidebar, PlusLg } from 'react-bootstrap-icons';
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import TaskDetail from "../components/TaskDetail";
import TaskForm from "../components/TaskForm";
import { SAMPLE_TASKS } from "../data/mockData";

const DashboardPage = () => {
    const [tasks, setTasks] = useState(SAMPLE_TASKS);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [taskFormConfig, setTaskFormConfig] = useState(null); // { show: true, type: 'task'/'habit' }
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

    const handleCreateTask = (newTask) => {
        console.log("New task created:", newTask);
        const taskWithId = { ...newTask, _id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'pending' };
        setTasks(prev => [taskWithId, ...prev]);
        setTaskFormConfig(null);
    };

    const handleUpdateTask = (taskId, updatedData) => {
        setTasks(prev => prev.map(t => t._id === taskId ? { ...t, ...updatedData } : t));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(prev => prev.filter(t => t._id !== taskId));
        setSelectedTaskId(null);
    };

    const handleCloseForm = () => {
        setTaskFormConfig(null);
    };

    const openForm = (type = 'task') => {
        setTaskFormConfig({ type });
    };

    return (
        <div className="d-flex vh-100 w-100 overflow-hidden bg-light">
            {/* Desktop sidebar */}
            <div className="d-none d-md-block h-100 border-end bg-white" style={{ width: '300px', flexShrink: 0 }}>
                <Sidebar
                    tasks={tasks}
                    selectedTaskId={selectedTaskId}
                    onSelectTask={handleSelectTask}
                    onOpenTaskForm={() => openForm('task')}
                />
            </div>

            {/* Mobile sidebar (Offcanvas) */}
            <Offcanvas show={mobileSidebarOpen} onHide={() => setMobileSidebarOpen(false)}>
                <Offcanvas.Header closeButton className="border-bottom">
                    <Offcanvas.Title>
                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold" style={{ width: 30, height: 30, fontSize: 12 }}>
                                Z
                            </div>
                            <span className="fs-6 fw-semibold">ZenTask</span>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0">
                    <Sidebar
                        tasks={tasks}
                        selectedTaskId={selectedTaskId}
                        onSelectTask={handleSelectTask}
                        onOpenTaskForm={() => openForm('task')}
                    />
                </Offcanvas.Body>
            </Offcanvas>

            {/* Main Content Area */}
            <div className="flex-grow-1 d-flex flex-column h-100 overflow-hidden">
                {/* Mobile Header */}
                <div className="d-flex d-md-none align-items-center justify-content-between p-3 border-bottom bg-white shrink-0">
                    <Button variant="light" onClick={() => setMobileSidebarOpen(true)} className="p-1 border-0">
                        <List size={24} />
                    </Button>

                    <div className="d-flex align-items-center gap-2">
                        <Button variant="outline-secondary" className="p-1 border-0 d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                            <LayoutSidebar size={16} />
                        </Button>
                        <Button variant="primary" onClick={() => openForm('task')} className="p-1 d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                            <PlusLg size={16} />
                        </Button>
                    </div>
                </div>

                {/* Main View */}
                <main className="flex-grow-1 overflow-auto">
                    {selectedTaskId ? (
                        <TaskDetail
                            taskId={selectedTaskId}
                            tasks={tasks}
                            onBackToDashboard={handleBackToDashboard}
                            onUpdateTask={handleUpdateTask}
                            onDeleteTask={handleDeleteTask}
                        />
                    ) : (
                        <Dashboard tasks={tasks} onSelectTask={handleSelectTask} onOpenTaskForm={openForm} />
                    )}
                </main>
            </div>

            {taskFormConfig && (
                <TaskForm
                    initialType={taskFormConfig.type}
                    onSubmit={handleCreateTask}
                    onCancel={handleCloseForm}
                />
            )}
        </div>
    );
};

export default DashboardPage;
