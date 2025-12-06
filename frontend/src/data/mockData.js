// Utility functions for frontend display
// Previously contained mock data, now just helpers


export const getPriorityColor = (priority) => {
    const map = {
        'high': 'danger',    // Red
        'medium': 'primary', // Blue
        'low': 'success',    // Green
    };
    return map[priority] || 'secondary';
};

export const getCategoryColor = (category) => {
    const map = {
        'work': 'info',
        'personal': 'success',
        'health': 'danger',
    };
    return map[category] || 'secondary';
};

export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
};
