/* eslint-disable no-unused-vars */
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

    // CATEGORY DISTRIBUTION CALCULATION
    const calculateCategoryStats = () => {
        const stats = {
            work: 0,
            personal: 0,
            health: 0,
            other: 0
        };

        tasks.forEach(task => {
            const category = task.category?.toLowerCase() || 'other';
            if (Object.prototype.hasOwnProperty.call(stats, category)) {
                stats[category]++;
            } else {
                stats['other']++;
            }
        });

        return stats;
    };

    // GET CATEGORY COLORS
    const getCategoryColors = (category) => {
        const colors = {
            'work': { bar: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-600', label: 'Work' },
            'personal': { bar: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Personal' },
            'health': { bar: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-600', label: 'Health' },
            'other': { bar: 'bg-gray-500', bg: 'bg-gray-50', text: 'text-gray-600', label: 'Other' }
        };
        return colors[category] || colors['other'];
    };

    const categoryStats = calculateCategoryStats();
    const totalTasks = tasks.length;

    // Dashboard page
    if (currentPage === 'dashboard') {
        return (
            <div className="flex-1 bg-white overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 border-b border-blue-300 px-8 py-6 text-white shadow-sm">
                    <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                    <p className="text-blue-100 text-base">Your productivity overview and stats.</p>
                </div>

                {/* Main Content */}
                <div className="p-8">
                    {/* Stats Grid - could add here later */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {/* Placeholder for stats cards */}
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-2 gap-6">

                        {/* CATEGORY DISTRIBUTION - NEW IMPLEMENTATION */}
                        <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Category Distribution</h2>

                            {totalTasks === 0 ? (
                                <div className="flex items-center justify-center h-40">
                                    <div className="text-center">
                                        <div className="text-slate-400 text-sm mb-2">ðŸ“­</div>
                                        <p className="text-xs text-slate-500">No tasks yet. Create one to see distribution.</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Progress Bars */}
                                    <div className="space-y-4">
                                        {Object.entries(categoryStats).map(([category, count]) => {
                                            const percentage = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
                                            const colors = getCategoryColors(category);

                                            return (
                                                <div key={category}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-semibold text-slate-700">
                                                            {colors.label}
                                                        </span>
                                                        <span className="text-sm font-bold text-slate-900">
                                                            {count} ({percentage}%)
                                                        </span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Summary Stats */}
                                    <div className="mt-6 pt-6 border-t border-slate-200">
                                        <div className="grid grid-cols-4 gap-3">
                                            {Object.entries(categoryStats).map(([category, count]) => {
                                                const colors = getCategoryColors(category);
                                                return (
                                                    <div key={category} className={`${colors.bg} rounded-lg p-3 text-center`}>
                                                        <div className={`text-2xl font-bold ${colors.text}`}>
                                                            {count}
                                                        </div>
                                                        <div className={`text-xs font-semibold ${colors.text} mt-1`}>
                                                            {colors.label}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 hover:shadow-md transition-shadow">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
                            <p className="text-slate-700 text-sm mb-6">
                                Start organizing your tasks. Keep track of work, personal, and health goals.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                                    <span className="text-xl">ðŸ“</span>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-900">Create Task</p>
                                        <p className="text-xs text-slate-500">Add a new task to your list</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                                    <span className="text-xl">ðŸ“Š</span>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-900">View Statistics</p>
                                        <p className="text-xs text-slate-500">See your productivity stats</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                                    <span className="text-xl">âš™ï¸</span>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-900">Settings</p>
                                        <p className="text-xs text-slate-500">Manage preferences</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // Create page
    if (currentPage === 'create') {
        return (
            <div className="flex-1 bg-white overflow-y-auto">
                <div className="p-8">
                    <div className="max-w-2xl">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create New Task</h1>
                            <p className="text-slate-600">Add a new task to your list and start tracking.</p>
                        </div>

                        <TaskForm
                            onSubmit={handleCreateTask}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Tasks list page
    if (currentPage === 'tasks') {
        return (
            <div className="flex-1 bg-white overflow-y-auto">
                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage your daily tasks</h1>
                        <p className="text-slate-600">Get started by creating your first task</p>
                    </div>

                    {loading ? (
                        <div className="text-center text-slate-500">Loading tasks...</div>
                    ) : tasks.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">ðŸ“­</div>
                            <p className="text-slate-500 mb-4">No tasks yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="bg-slate-50 rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-semibold text-slate-900 flex-1">{task.title}</h3>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="text-red-600 hover:text-red-700 transition-colors"
                                            title="Delete task"
                                        >
                                            ðŸ—‘ï¸
                                        </button>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3">{task.description}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                                            {task.category || 'uncategorized'}
                                        </span>
                                        {task.priority && (
                                            <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded-full font-medium">
                                                {task.priority}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default MainContent;