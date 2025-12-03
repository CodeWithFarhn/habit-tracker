import React, { useState } from 'react';

// Calculate dates OUTSIDE component (pure)
const NOW = Date.now();
const TOMORROW_2_DAYS = new Date(NOW + 2 * 24 * 60 * 60 * 1000).toISOString();
const TODAY = new Date(NOW).toISOString();
const IN_5_DAYS = new Date(NOW + 5 * 24 * 60 * 60 * 1000).toISOString();

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
    }
];

// Calculate stats OUTSIDE component (pure)
const calculateStats = () => {
    const totalTasks = SAMPLE_TASKS.length;
    const completedTasks = SAMPLE_TASKS.filter(t => t.status === 'completed').length;
    const pendingTasks = SAMPLE_TASKS.filter(t => t.status === 'pending').length;
    const activeHabits = SAMPLE_TASKS.filter(t => t.frequency === 'daily').length;

    return {
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        pendingTasks: pendingTasks,
        activeHabits: activeHabits,
        bestStreak: 7
    };
};

// Stats Card Component OUTSIDE (reusable, pure)
const StatsCard = ({ label, value, unit = '', icon: IconComponent, description, color = 'slate' }) => {
    const colorClasses = {
        slate: { text: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' },
        blue: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
        orange: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
        green: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
        purple: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' }
    };

    const colors = colorClasses[color];

    return (
        <div className={`${colors.bg} rounded-lg border ${colors.border} p-6 hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-3">
                <div>
                    <p className={`${colors.text} text-sm font-medium mb-1`}>{label}</p>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-bold ${colors.text}`}>{value}</span>
                        {unit && <span className="text-slate-500 text-sm">{unit}</span>}
                    </div>
                </div>
                <div className={`text-2xl ${colors.text}`}>
                    {IconComponent}
                </div>
            </div>
            <p className="text-xs text-slate-500">{description}</p>
        </div>
    );
};

const Dashboard = () => {
    // Initialize state with calculated stats
    const [stats] = useState(calculateStats());

    return (
        <div className="flex-1 bg-white overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 border-b border-blue-300 px-8 py-6 text-white shadow-sm">
                <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                <p className="text-blue-100 text-base">Your productivity overview and stats.</p>
            </div>

            {/* Main Content */}
            <div className="p-8">
                {/* Stats Grid - 4 Cards with different colors */}
                {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        label="Completion Rate"
                        value={stats.completionRate}
                        unit="%"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
                            </svg>
                        }
                        description={`${Math.floor(stats.completionRate / 10)} of ${Math.ceil(100 / 10)} items completed`}
                        color="slate"
                    />
                    <StatsCard
                        label="Pending Tasks"
                        value={stats.pendingTasks}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                        }
                        description="One-time tasks remaining"
                        color="blue"
                    />
                    <StatsCard
                        label="Active Habits"
                        value={stats.activeHabits}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                        }
                        description="Recurring habits being tracked"
                        color="green"
                    />
                    <StatsCard
                        label="Best Streak"
                        value={stats.bestStreak}
                        unit="Days"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        }
                        description="Keep the momentum going!"
                        color="orange"
                    />
                </div>

                {/* Charts Grid */}
                {/* Mobile: 1 column, Desktop: 2 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Category Distribution */}
                    <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Category Distribution</h2>
                        <div className="flex items-center justify-center h-40">
                            <div className="text-center">
                                <div className="text-slate-400 text-sm mb-2">No data available</div>
                                <p className="text-xs text-slate-500">Chart placeholder for category breakdown</p>
                                <ul className="mt-3 text-xs text-slate-600 space-y-1">
                                    <li>Work: 2</li>
                                    <li>Health: 2</li>
                                    <li>Personal: 1</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 hover:shadow-md transition-shadow">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
                        <p className="text-slate-700 text-sm mb-6">
                            Start building better habits today. Consistency is key to long-term success.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="sm:flex-1 bg-white text-blue-600 font-medium py-2 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200">
                                <div className="text-center">
                                    <p className="font-semibold text-sm">Add Habit</p>
                                    <p className="text-xs text-slate-500 mt-1">Track daily routines</p>
                                </div>
                            </button>
                            <button className="sm:flex-1 bg-white text-blue-600 font-medium py-2 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200">
                                <div className="text-center">
                                    <p className="font-semibold text-sm">Add Task</p>
                                    <p className="text-xs text-slate-500 mt-1">Plan your day</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;