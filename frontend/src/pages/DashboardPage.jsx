import React, { useState, useEffect } from "react";
import { Container, Button, Offcanvas, Toast, ToastContainer, Dropdown } from 'react-bootstrap';
import { List, LayoutSidebar, PlusLg, PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import TaskDetail from "../components/TaskDetail";
import TaskForm from "../components/TaskForm";
import habitService from "../services/habitService";
import taskService from "../services/taskService";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [taskFormConfig, setTaskFormConfig] = useState(null); // { show: true, type: 'task'/'habit' }
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Notification State
    const [showToast, setShowToast] = useState(false);
    const [toastConfig, setToastConfig] = useState({ title: '', message: '' });

    useEffect(() => {
        fetchData();

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

    const showNotification = (title, message) => {
        // Only show if user exists and push notifications are enabled
        // Default to true if user or notifications setting is missing to be safe, 
        // OR default to false? The verification plan says "stop when disabled". 
        // Let's assume enabled by default, but if explicitly false, don't show.
        if (user?.notifications?.push === false) {
            return;
        }
        setToastConfig({ title, message });
        setShowToast(true);
    };

    const fetchData = async () => {
        try {
            const [habits, tasks] = await Promise.all([
                habitService.getHabits(),
                taskService.getTasks()
            ]);

            const mappedHabits = habits.map(h => ({
                ...h,
                title: h.name,
                type: 'habit',
                // category: h.category || 'personal', // Use if available
                // priority: h.priority || 'medium',
                status: isCompletedToday(h) ? 'completed' : 'pending'
            }));

            const mappedTasks = tasks.map(t => ({
                ...t,
                type: 'task',
                // status is already on task object
            }));

            // Merge and sort:
            // 1. Pending items first
            // 2. Then by Due Date (tasks) or Updated At (habits - effectively today for daily habits) - earliest first
            const combined = [...mappedTasks, ...mappedHabits];

            combined.sort((a, b) => {
                // Priority 1: Status (Pending < Completed)
                if (a.status !== b.status) {
                    return a.status === 'pending' ? -1 : 1;
                }

                // Priority 2: Date
                // For tasks use dueDate, for habits use updatedAt (or created)
                const dateA = new Date(a.dueDate || a.updatedAt);
                const dateB = new Date(b.dueDate || b.updatedAt);
                return dateA - dateB;
            });

            setTasks(combined);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    const isCompletedToday = (habit) => {
        if (!habit.completedDates) return false;
        const today = new Date().toISOString().split('T')[0];
        return habit.completedDates.some(d => d.startsWith(today));
    };

    const handleSelectTask = (taskId) => {
        setSelectedTaskId(taskId);
        setMobileSidebarOpen(false); // close sheet on select (mobile)
    };

    const handleBackToDashboard = () => {
        setSelectedTaskId(null);
    };

    const handleCreateTask = async (newItem) => {
        try {
            if (newItem.itemType === 'habit') {
                const created = await habitService.createHabit({
                    name: newItem.title,
                    description: newItem.description,
                    frequency: newItem.frequency,
                    // category, priority if supported
                });
                const mapped = {
                    ...created,
                    title: created.name,
                    type: 'habit',
                    status: 'pending',
                    category: newItem.category, // Optimistic or backend support needed
                    priority: newItem.priority
                };
                setTasks(prev => [mapped, ...prev]);
                showNotification('Habit Created', 'Successfully added to your tracking list.');
            } else {
                // Task
                const created = await taskService.createTask({
                    title: newItem.title,
                    description: newItem.description,
                    category: newItem.category,
                    priority: newItem.priority,
                    dueDate: newItem.dueDate
                });
                const mapped = {
                    ...created,
                    type: 'task'
                };
                setTasks(prev => [mapped, ...prev]);
                showNotification('Task Created', 'Successfully added to your list.');
            }
        } catch (error) {
            console.error("Failed to create item", error);
            alert("Failed to create item");
        }
        setTaskFormConfig(null);
    };

    const handleUpdateTask = async (taskId, updatedData) => {
        const task = tasks.find(t => t._id === taskId);
        if (!task) return;

        try {
            if (task.type === 'habit') {
                await habitService.updateHabit(taskId, {
                    name: updatedData.title || task.title,
                    description: updatedData.description || task.description
                    // Backend needs to support other fields if we update them
                });
            } else {
                // Task
                await taskService.updateTask(taskId, {
                    title: updatedData.title,
                    description: updatedData.description,
                    status: updatedData.status,
                    // etc
                });
            }
            // Update local state
            setTasks(prev => prev.map(t => t._id === taskId ? { ...t, ...updatedData } : t));

            // Customize message based on what was updated (roughly)
            if (updatedData.status === 'completed') {
                showNotification('Completed!', 'Great job finishing that task.');
            } else {
                showNotification('Updated', 'Changes saved successfully.');
            }

        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const task = tasks.find(t => t._id === taskId);
        if (!task) return;

        try {
            if (task.type === 'habit') {
                await habitService.deleteHabit(taskId);
            } else {
                await taskService.deleteTask(taskId);
            }
            setTasks(prev => prev.filter(t => t._id !== taskId));
            setSelectedTaskId(null);
            showNotification('Deleted', 'Item removed from your list.');
        } catch (e) {
            console.error("Delete failed", e);
        }
    };

    const handleCloseForm = () => {
        setTaskFormConfig(null);
    };

    const openForm = (type = 'task') => {
        setTaskFormConfig({ type });
    };

    return (
        <div className="d-flex vh-100 w-100 overflow-hidden bg-light position-relative">
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
                        <Dropdown align="end">
                            <Dropdown.Toggle
                                variant="link"
                                className="p-0 border-0 d-flex align-items-center justify-content-center overflow-hidden rounded-circle text-decoration-none"
                                style={{ width: 32, height: 32 }}
                                bsPrefix="p-0" // Using bsPrefix or just removing variant outline-secondary usually helps, but custom CSS is safer for caret
                            >
                                {user?.name ? (
                                    <div className="bg-primary text-white w-100 h-100 d-flex align-items-center justify-content-center fw-bold" style={{ fontSize: '0.8rem' }}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <div className="bg-secondary text-white w-100 h-100 d-flex align-items-center justify-content-center">
                                        <List size={16} />
                                    </div>
                                )}
                            </Dropdown.Toggle>

                            {/* Hide caret for this specific dropdown */}
                            <style>
                                {`
                                    .dropdown-toggle::after {
                                        display: none !important;
                                    }
                                `}
                            </style>
                            <Dropdown.Menu className="shadow border-0 mt-2" style={{ zIndex: 1050 }}>
                                <div className="px-3 py-2 border-bottom">
                                    <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '200px' }}>{user?.name}</div>
                                    <div className="small text-muted text-truncate" style={{ maxWidth: '200px' }}>{user?.email}</div>
                                </div>
                                <Dropdown.Item className="py-2" onClick={() => window.location.href = '/settings'}>
                                    <div className="d-flex align-items-center gap-2">
                                        <PersonCircle size={16} />
                                        <span>Profile Settings</span>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => { localStorage.removeItem('user'); window.location.href = '/'; }} className="text-danger py-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <BoxArrowRight size={16} />
                                        <span>Log Out</span>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

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

            {/* Notifications */}
            <ToastContainer position="bottom-start" className="p-4" style={{ zIndex: 9999, position: 'fixed' }}>
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={4000}
                    autohide
                    className="border-0 shadow-lg"
                    style={{ minWidth: '300px' }}
                >
                    <Toast.Header closeButton={true} className="border-bottom-0 bg-white pt-3 px-3">
                        <div className="me-2 rounded-circle bg-success" style={{ width: 8, height: 8 }}></div>
                        <strong className="me-auto fs-6 fw-bold text-dark">{toastConfig.title}</strong>
                        <small className="text-muted">Just now</small>
                    </Toast.Header>
                    <Toast.Body className="bg-white px-3 pb-3 pt-0 text-secondary" style={{ fontSize: '0.9rem' }}>
                        {toastConfig.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default DashboardPage;
