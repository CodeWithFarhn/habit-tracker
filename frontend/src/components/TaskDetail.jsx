import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";

// Calculate dates OUTSIDE component (pure)
const NOW = Date.now();
const TOMORROW_2_DAYS = new Date(NOW + 2 * 24 * 60 * 60 * 1000).toISOString();
const TODAY = new Date(NOW).toISOString();
const IN_5_DAYS = new Date(NOW + 5 * 24 * 60 * 60 * 1000).toISOString();
const YESTERDAY = new Date(NOW - 1 * 24 * 60 * 60 * 1000).toISOString();

// Sample data OUTSIDE component (pure)
const SAMPLE_TASKS = [
    {
        _id: '1',
        title: 'Complete project proposal',
        description: 'Finish the Q4 project proposal document with all details and requirements.',
        category: 'work',
        priority: 'high',
        status: 'pending',
        dueDate: TOMORROW_2_DAYS,
        createdAt: new Date(NOW - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '2',
        title: 'Morning workout',
        description: 'Daily exercise routine - 30 mins cardio and stretching',
        category: 'health',
        priority: 'medium',
        status: 'completed',
        frequency: 'daily',
        dueDate: TODAY,
        createdAt: new Date(NOW - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '3',
        title: 'Read documentation',
        description: 'Study React patterns and best practices for advanced components',
        category: 'personal',
        priority: 'low',
        status: 'pending',
        dueDate: IN_5_DAYS,
        createdAt: new Date(NOW - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '4',
        title: 'Meditate',
        description: 'Evening meditation session - 15 mins for stress relief',
        category: 'health',
        priority: 'low',
        status: 'pending',
        frequency: 'daily',
        dueDate: TODAY,
        createdAt: new Date(NOW - 21 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        _id: '5',
        title: 'Client presentation',
        description: 'Present Q4 results to client stakeholders with metrics and analysis',
        category: 'work',
        priority: 'high',
        status: 'overdue',
        dueDate: YESTERDAY,
        createdAt: new Date(NOW - 10 * 24 * 60 * 60 * 1000).toISOString()
    }
];

// Helper function OUTSIDE component
const findTaskById = (taskId) => SAMPLE_TASKS.find(t => t._id === taskId) || null;

const getCategoryBadgeStyle = (category) => {
    const styles = {
        'work': 'bg-slate-50 text-slate-700',
        'personal': 'bg-emerald-50 text-emerald-700',
        'health': 'bg-red-50 text-red-700',
    };
    return styles[category] || 'bg-slate-50 text-slate-700';
};

const getTaskTypeBadgeStyle = () => {
    return 'bg-slate-50 text-slate-700';
};

export default function TaskDetail({ taskId, onBackToDashboard, onDeleteTask, onUpdateTask }) {
    const task = findTaskById(taskId);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(task || {});
    const [taskStatus, setTaskStatus] = useState(task?.status || 'pending');

    if (!task) {
        return (
            <div className="flex-1 bg-slate-50 flex items-center justify-center">
                <div className="text-slate-500 text-center">
                    <div className="text-4xl mb-2">ðŸ“­</div>
                    <p>Task not found</p>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        try {
            console.log('Saving task:', editData);
            if (onUpdateTask) {
                onUpdateTask(task._id, editData);
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData(task || {});
    };

    const handleMarkCompleted = () => {
        const newStatus = taskStatus === 'completed' ? 'pending' : 'completed';
        setTaskStatus(newStatus);
        if (onUpdateTask) {
            onUpdateTask(task._id, { ...task, status: newStatus });
        }
        console.log('Task marked as:', newStatus);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                console.log('Deleting task:', taskId);
                if (onDeleteTask) {
                    onDeleteTask(task._id);
                }
                if (onBackToDashboard) {
                    onBackToDashboard();
                }
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    return (
        <div className="flex-1 bg-white overflow-y-auto">
            {/* Header - With border (p-4 height matching left panel) */}
            <div className="border-b border-slate-200 px-8 py-4 flex items-center justify-between bg-slate-50">
                <div className="flex items-center">
                    <button
                        onClick={handleMarkCompleted}
                        className={`inline-flex items-center justify-center h-10 px-4 rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${taskStatus === 'completed'
                            ? 'border-emerald-600 text-emerald-700 bg-white'
                            : 'border-slate-300 text-slate-700 bg-white hover:border-emerald-600 hover:text-emerald-700'
                            }`}
                        title={taskStatus === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {taskStatus === 'completed' ? 'Completed' : 'Mark Complete'}
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="inline-flex items-center justify-center h-10 w-10 rounded-lg border-2 border-slate-300 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                        title="Edit task"
                    >
                        <FiEdit2 size={18} />
                    </button>

                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center justify-center h-10 w-10 rounded-lg border-2 border-red-300 text-red-700 hover:bg-red-50 transition-all duration-200"
                        title="Delete task"
                    >
                        <FiTrash2 size={18} />
                    </button>
                </div>
            </div>

            {/* Type & Category Badges - No border below */}
            <div className="px-8 py-3 bg-white flex items-center gap-3">
                <button
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold cursor-default ${getTaskTypeBadgeStyle(task.frequency)}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <circle cx="12" cy="12" r="1"></circle><path d="M12 1v6m6.16-1.86-4.24 4.24M19 12h-6m1.86 6.16-4.24-4.24M12 19v-6M4.84 18.16l4.24-4.24M5 12h6M2.84 5.84l4.24 4.24"></path>
                    </svg>
                    {task.frequency ? 'HABIT' : 'TASK'}
                </button>

                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold cursor-default ${getCategoryBadgeStyle(task.category)}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>
                    {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                </span>
            </div>

            {/* Task Title - No border below */}
            <div className="px-8 py-4 bg-white">
                <h1 className={`text-2xl font-bold transition-colors duration-200 ${taskStatus === 'completed'
                    ? 'text-slate-300'
                    : 'text-slate-900'
                    }`}>
                    {task.title}
                </h1>
            </div>

            {/* Task Details Content */}
            <div className="px-8 py-6">
                <div className="space-y-6">

                    {/* Priority & Due Date - In boxes, single line aligned with description */}
                    <div className="flex items-start gap-4">
                        {/* Priority Box */}
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Priority</label>
                            {isEditing ? (
                                <select
                                    value={editData.priority || 'medium'}
                                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-sm"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            ) : (
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                    <p className="text-slate-900 font-semibold text-base">
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Due Date Box */}
                        <div className="flex-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Due Date</label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={editData.dueDate ? new Date(editData.dueDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setEditData({ ...editData, dueDate: new Date(e.target.value).toISOString() })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-sm"
                                />
                            ) : (
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                    <p className="text-slate-900 font-semibold text-base">
                                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wide block mb-3">Description</label>
                        {isEditing ? (
                            <textarea
                                value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium text-sm"
                                rows="6"
                            />
                        ) : (
                            <div className="bg-gradient-to-br from-blue-50 to-slate-50 border-l-4 border-blue-500 rounded-lg p-5 min-h-32 shadow-sm">
                                <p className="text-slate-700 leading-8 text-base font-normal">
                                    {task.description || 'No description provided.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Additional Info */}
                    <div className="text-xs text-slate-500 pt-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Created {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date(task.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </div>

                    {/* Edit/Save buttons */}
                    {isEditing && (
                        <div className="flex gap-3 pt-6">
                            <button
                                onClick={handleSave}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors duration-200"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-300 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}