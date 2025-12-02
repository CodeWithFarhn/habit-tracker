import React, { useState, useEffect } from 'react';
import { getTasks, createTask, deleteTask } from '../services/api';
import TaskForm from './TaskForm';

const MainContent = ({ currentPage }) => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await getTasks();
            setTasks(response.data.data || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (formData) => {
        try {
            await createTask(formData);
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Error creating task');
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Delete this task?')) {
            try {
                await deleteTask(id);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Error deleting task');
            }
        }
    };

    if (currentPage === 'create') {
        return (
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Task</h2>
                    <TaskForm
                        onSubmit={handleCreateTask}
                        onCancel={() => window.history.back()}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Tasks Overview</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage your daily tasks</p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    <i className="bi bi-plus-lg"></i> Add Task
                </button>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <i className="bi bi-arrow-repeat text-3xl text-blue-500 animate-spin"></i>
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                    <i className="bi bi-clipboard-check text-3xl text-slate-400 mb-2"></i>
                    <h3 className="text-lg font-medium text-slate-800">No tasks yet</h3>
                    <p className="text-slate-500 text-sm">Get started by creating your first task</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map(task => (
                        <div key={task._id} className="card p-5">
                            <h3 className="font-semibold text-slate-900 mb-2">{task.title}</h3>
                            <p className="text-sm text-slate-600 mb-4">{task.description}</p>

                            <div className="flex gap-2 mb-4">
                                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                                    {task.priority}
                                </span>
                                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                                    {task.category}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <small className="text-slate-500">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </small>
                                <button
                                    className="btn-secondary text-xs"
                                    onClick={() => handleDeleteTask(task._id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                        <TaskForm
                            onSubmit={handleCreateTask}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainContent;
