/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/api';
import CustomSelect from './UI/CustomSelect';

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [activeTab, setActiveTab] = useState('all');
    const [checkedTasks, setCheckedTasks] = useState({});

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data.data || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'task') return matchesSearch && task.category !== 'habit';
        if (activeTab === 'habit') return matchesSearch && task.category === 'habit';

        return matchesSearch;
    }).filter(task => {
        if (filterStatus === 'all') return true;
        return task.status === filterStatus;
    });

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

    const toggleTask = (taskId) => {
        setCheckedTasks(prev => ({
            ...prev,
            [taskId]: !prev[taskId]
        }));
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

    return (
        <div className="flex flex-col h-full bg-white">

            {/* Header */}
            <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        Z
                    </div>
                    <span className="font-semibold text-sm text-slate-800">ZenTask</span>
                </div>
            </div>

            {/* Overview Section */}
            <div className="p-4 border-b border-slate-200 space-y-4">

                {/* Overview Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600">
                            <rect width="7" height="9" x="3" y="3" rx="1"></rect>
                            <rect width="7" height="5" x="14" y="3" rx="1"></rect>
                            <rect width="7" height="9" x="14" y="12" rx="1"></rect>
                            <rect width="7" height="5" x="3" y="16" rx="1"></rect>
                        </svg>
                        <h6 className="text-base font-semibold text-slate-800">Overview</h6>
                    </div>
                    <button
                        className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md font-medium text-xs hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                        onClick={() => setCurrentPage('create')}
                    >
                        <i className="bi bi-plus text-sm"></i>
                        New
                    </button>
                </div>

                {/* Search Box with Clear Button */}
                <div className="relative">
                    <i className="bi bi-search absolute left-3 top-2.5 text-gray-400 text-xs"></i>
                    <input
                        type="text"
                        className="w-full pl-8 pr-8 py-2 bg-slate-50 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all duration-200"
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
                            <i className="bi bi-x-circle text-sm"></i>
                        </button>
                    )}
                </div>

                {/* Tabs - With smooth transitions */}
                <div className="flex gap-1 bg-slate-100 p-1 rounded-md">
                    {['all', 'task', 'habit'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-1.5 rounded text-xs font-medium transition-all duration-200 ${activeTab === tab
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
                    icon={() => <i className="bi bi-funnel text-slate-500"></i>}
                    placeholder="Filter..."
                />
            </div>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto">
                {filteredTasks.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 text-xs">
                        <div className="mb-2">
                            <i className="bi bi-inbox text-lg text-gray-300"></i>
                        </div>
                        No tasks found
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <div
                            key={task._id}
                            className="p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150"
                        >
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 mt-0.5 cursor-pointer accent-blue-600"
                                    checked={checkedTasks[task._id] || false}
                                    onChange={() => toggleTask(task._id)}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-medium text-slate-900 truncate">
                                            {task.title}
                                        </span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${getPriorityColor(task.priority)}`}>
                                            {task.priority}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <i className="bi bi-calendar3"></i>
                                            <span>{formatDate(task.dueDate)}</span>
                                        </div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded ${getCategoryColor(task.category)}`}>
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