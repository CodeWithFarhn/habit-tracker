export const NOW = Date.now();
export const TOMORROW_2_DAYS = new Date(NOW + 2 * 24 * 60 * 60 * 1000).toISOString();
export const TODAY = new Date(NOW).toISOString();
export const IN_5_DAYS = new Date(NOW + 5 * 24 * 60 * 60 * 1000).toISOString();
export const YESTERDAY = new Date(NOW - 1 * 24 * 60 * 60 * 1000).toISOString();

export const SAMPLE_TASKS = [];

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
