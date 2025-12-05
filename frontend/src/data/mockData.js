export const NOW = Date.now();
export const TOMORROW_2_DAYS = new Date(NOW + 2 * 24 * 60 * 60 * 1000).toISOString();
export const TODAY = new Date(NOW).toISOString();
export const IN_5_DAYS = new Date(NOW + 5 * 24 * 60 * 60 * 1000).toISOString();
export const YESTERDAY = new Date(NOW - 1 * 24 * 60 * 60 * 1000).toISOString();

export const SAMPLE_TASKS = [
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

export const getPriorityColor = (priority) => {
    // Mapping to Bootstrap badge variants
    const map = {
        'high': 'danger',    // Red
        'medium': 'primary', // Blue
        'low': 'success',    // Green
    };
    return map[priority] || 'secondary';
};

export const getCategoryColor = (category) => {
    // Mapping to Bootstrap badge variants or custom classes
    const map = {
        'work': 'info',
        'personal': 'success',
        'health': 'danger',
    };
    return map[category] || 'secondary';
};

export const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
};
