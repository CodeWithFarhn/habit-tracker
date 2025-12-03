import React, { useState } from 'react';
import CustomSelect from './UI/CustomSelect';

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
        description: 'Finish the Q4 project proposal',
        category: 'work',
        priority: 'high',
        status: 'pending',
        dueDate: TOMORROW_2_DAYS
    },
    {
        _id: '2',
        title: 'Morning workout',
        description: 'Daily exercise routine',
        category: 'health',
        priority: 'medium',
        status: 'completed',
        frequency: 'daily',
        dueDate: TODAY
    },
    {
        _id: '3',
        title: 'Read documentation',
        description: 'Study React patterns',
        category: 'personal',
        priority: 'low',
        status: 'pending',
        dueDate: IN_5_DAYS
    },
    {
        _id: '4',
        title: 'Meditate',
        description: 'Evening meditation session',
        category: 'health',
        priority: 'low',
        status: 'pending',
        frequency: 'daily',
        dueDate: TODAY
    },
    {
        _id: '5',
        title: 'Client presentation',
        description: 'Present Q4 results to client',
        category: 'work',
        priority: 'high',
        status: 'overdue',
        dueDate: YESTERDAY
    }
];

// Helper functions OUTSIDE component
const getPriorityColor = (priority) => {
    const colors = {
        'high': 'bg-red-100 text-red-700',
        'medium': 'bg-blue-100 text-blue-700',
        'low': 'bg-green-100 text-green-700',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
};

const getCategoryColor = (category) => {
    const colors = {
        'work': 'bg-blue-50 text-blue-600',
        'personal': 'bg-green-50 text-green-600',
        'health': 'bg-red-50 text-red-600',
    };
    return colors[category] || 'bg-gray-50 text-gray-600';
};

const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
};

// Status filter options
const statusOptions = [
    { value: 'all', label: 'Status: All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
];

const Sidebar = ({ selectedTaskId, onSelectTask, onOpenTaskForm }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [activeTab, setActiveTab] = useState('all');
    const [checkedTasks, setCheckedTasks] = useState({});

    const filteredTasks = SAMPLE_TASKS.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'task') return matchesSearch && !task.frequency;
        if (activeTab === 'habit') return matchesSearch && task.frequency;

        return matchesSearch;
    }).filter(task => {
        if (filterStatus === 'all') return true;
        return task.status === filterStatus;
    });

    const toggleTask = (taskId, e) => {
        e.stopPropagation();
        setCheckedTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
    };

    return (
        <div className="flex flex-col h-full bg-white w-full md:w-[340px] border-r border-slate-200 shadow-sm">
            {/* Header - hidden on mobile, shown on desktop */}
            <div className="hidden md:block px-8 py-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
                        Z
                    </div>
                    <span className="font-semibold text-base text-slate-900">ZenTask</span>
                </div>
            </div>

            {/* Overview Section - adjust padding for mobile */}
            <div className="pt-4 md:pt-6 px-4 pb-4 border-b border-slate-200 space-y-4">

                {/* Overview Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('navigateToDashboard'))}
                        className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors duration-200 group flex-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover:text-blue-600 transition-colors duration-200">
                            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                        </svg>
                        <h6 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">Overview</h6>
                    </button>
                    <button
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-1 bg-blue-600 text-white rounded-md font-medium text-xs hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                        onClick={onOpenTaskForm}
                    >
                        <span>+</span>
                        New
                    </button>
                </div>

                {/* Search Box with Clear Button */}
                <div className="relative">
                    <input
                        type="text"
                        className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all duration-200 font-medium"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Clear Button - Shows only when search has text */}
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            title="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                {/* Tabs - With smooth transitions */}
                <div className="flex gap-1 bg-slate-100 p-1 rounded-md">
                    {['all', 'task', 'habit'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-1.5 rounded text-xs font-semibold transition-all duration-200 ${activeTab === tab
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            {tab === 'all' ? 'All' : tab === 'task' ? 'Task' : 'Habit'}
                        </button>
                    ))}
                </div>

                {/* Filter - Using CustomSelect component */}
                <CustomSelect
                    value={filterStatus}
                    onChange={setFilterStatus}
                    options={statusOptions}
                    placeholder="Filter..."
                />
            </div>

            {/* Task List - Clickable items */}
            <div className="flex-1 overflow-y-auto">
                {filteredTasks.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 text-xs">
                        <div className="mb-2">
                            📋
                        </div>
                        No tasks found
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <div
                            key={task._id}
                            onClick={() => onSelectTask(task._id)}
                            className={`p-3 border-b border-slate-100 cursor-pointer transition-all duration-150 ${selectedTaskId === task._id
                                ? 'bg-blue-50 border-l-4 border-l-blue-600'
                                : 'hover:bg-slate-50'
                                } ${checkedTasks[task._id] ? 'bg-slate-50/50' : ''}`}
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 mt-0.5 cursor-pointer accent-blue-600"
                                    checked={checkedTasks[task._id] || false}
                                    onChange={(e) => toggleTask(task._id, e)}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-sm font-semibold truncate ${checkedTasks[task._id]
                                            ? 'text-slate-500 line-through'
                                            : 'text-slate-900'
                                            }`}>
                                            {task.title}
                                        </span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${getPriorityColor(task.priority)}`}>
                                            {task.priority.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M8 2v4"></path>
                                                <path d="M16 2v4"></path>
                                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                                <path d="M3 10h18"></path>
                                            </svg>
                                            <span>{formatDate(task.dueDate)}</span>
                                        </div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${getCategoryColor(task.category)}`}>
                                            {task.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Sidebar;