import React, { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
    const [itemType, setItemType] = useState('task');
    const [formData, setFormData] = useState(initialData || {
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0],
        frequency: 'daily'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) {
            alert('Please fill in required fields');
            return;
        }
        if (itemType === 'task' && !formData.dueDate) {
            alert('Please fill in required fields');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto relative">

                {/* Header */}
                <div className="flex flex-col space-y-1.5 text-center sm:text-left p-6 border-b border-slate-200">
                    <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-900">
                        Create New Item
                    </h2>
                    <p className="text-sm text-slate-500">
                        Add a task or track a new habit.
                    </p>
                </div>

                {/* Close Button (X) - Top Right with Red Hover */}
                <button
                    onClick={onCancel}
                    className="absolute right-4 top-4 rounded-md opacity-70 transition-all hover:opacity-100 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 p-6">

                    {/* Type Selector */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900">
                            Type
                        </label>
                        <div role="radiogroup" className="flex gap-4">

                            {/* One-time Task */}
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <div className="relative flex items-center">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="task"
                                        checked={itemType === 'task'}
                                        onChange={(e) => setItemType(e.target.value)}
                                        className="appearance-none w-4 h-4 border-2 border-blue-600 rounded-full cursor-pointer"
                                        style={{
                                            accentColor: '#2563eb'
                                        }}
                                    />
                                    {itemType === 'task' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2563eb" className="h-2.5 w-2.5">
                                                <circle cx="12" cy="12" r="5"></circle>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <span className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal text-slate-700">
                                    One-time Task
                                </span>
                            </label>

                            {/* Recurring Habit */}
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <div className="relative flex items-center">
                                    <input
                                        type="radio"
                                        name="type"
                                        value="habit"
                                        checked={itemType === 'habit'}
                                        onChange={(e) => setItemType(e.target.value)}
                                        className="appearance-none w-4 h-4 border-2 border-blue-600 rounded-full cursor-pointer"
                                        style={{
                                            accentColor: '#2563eb'
                                        }}
                                    />
                                    {itemType === 'habit' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#2563eb" className="h-2.5 w-2.5">
                                                <circle cx="12" cy="12" r="5"></circle>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <span className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal text-slate-700">
                                    Recurring Habit
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder={itemType === 'habit' ? 'e.g., Drinking water' : 'e.g., Submit Report'}
                            className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add details..."
                            className="flex min-h-[60px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        ></textarea>
                    </div>

                    {/* Category & Priority / Category & Frequency */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="work">Work</option>
                                <option value="personal">Personal</option>
                                <option value="health">Health</option>
                            </select>
                        </div>

                        {itemType === 'task' ? (
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900">
                                    Priority
                                </label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900">
                                    Frequency
                                </label>
                                <select
                                    name="frequency"
                                    value={formData.frequency}
                                    onChange={handleChange}
                                    className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Due Date - Only for Tasks */}
                    {itemType === 'task' && (
                        <div className="space-y-2 flex flex-col">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-900">
                                Due Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-2.5 h-4 w-4 opacity-50 pointer-events-none">
                                    <path d="M8 2v4"></path>
                                    <path d="M16 2v4"></path>
                                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                    <path d="M3 10h18"></path>
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 bg-slate-100 text-slate-900 hover:bg-slate-200 min-h-9 px-4 py-2 w-full sm:w-auto mt-2 sm:mt-0"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 min-h-9 px-4 py-2 w-full sm:w-auto"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;