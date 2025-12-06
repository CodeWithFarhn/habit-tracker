import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Nav, Badge, ListGroup } from 'react-bootstrap';
import { Search, Plus, X, Filter, Calendar, CheckCircle, Clock, CheckCircleFill } from 'react-bootstrap-icons';
import { getPriorityColor, getCategoryColor, formatDate } from '../data/mockData';

const statusOptions = [
    { value: 'all', label: 'Status: All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
];

const Sidebar = ({ tasks, selectedTaskId, onSelectTask, onOpenTaskForm }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [activeTab, setActiveTab] = useState('all');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'task') return matchesSearch && !task.frequency;
        if (activeTab === 'habit') return matchesSearch && task.frequency;

        return matchesSearch;
    }).filter(task => {
        if (filterStatus === 'all') return true;
        return task.status === filterStatus;
    });

    return (
        <div className="d-flex flex-column h-100 bg-white">
            {/* Header */}
            <div className={`d-none d-md-block px-4 py-3 border-bottom ${mounted ? 'fade-in-down' : ''}`}>
                <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold logo-pulse" style={{ width: 32, height: 32 }}>
                        Z
                    </div>
                    <span className="fw-semibold fs-5 text-dark">ZenTask</span>
                </div>
            </div>

            {/* Controls Section*/}
            <div className={`p-3 border-bottom bg-light ${mounted ? 'fade-in' : ''}`} style={{ animationDelay: '0.1s' }}>
                {/* Overview & New Button */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <Button
                        variant="link"
                        className="text-decoration-none text-dark p-0 d-flex align-items-center gap-2 sidebar-btn-hover"
                        onClick={() => window.dispatchEvent(new CustomEvent('navigateToDashboard'))}
                    >
                        <div className="d-flex align-items-center justify-content-center overview-icon" style={{ width: 24, height: 24 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                            </svg>
                        </div>
                        <span className="fw-bold">Overview</span>
                    </Button>
                    <Button variant="primary" size="sm" className="d-flex align-items-center gap-1 new-button" onClick={onOpenTaskForm}>
                        <Plus size={16} /> New
                    </Button>
                </div>

                {/* Search */}
                <InputGroup className="mb-3 search-input-group" size="sm">
                    <InputGroup.Text className="bg-white border-end-0">
                        <Search className="text-muted" />
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="Search tasks..."
                        className="border-start-0 ps-0 hover:bg-light focus:bg-white focus:border-start-0 focus:ring-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ boxShadow: 'none' }}
                    />
                    {searchQuery && (
                        <Button variant="outline-secondary" className="border-start-0 clear-search" onClick={() => setSearchQuery('')}>
                            <X />
                        </Button>
                    )}
                </InputGroup>

                {/* Tabs */}
                <Nav variant="pills" className="nav-fill gap-1 bg-white p-1 rounded border mb-3 tabs-container" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Nav.Item>
                        <Nav.Link eventKey="all" className="py-1 px-2 fw-semibold sidebar-tab" style={{ fontSize: '0.8rem' }}>All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="task" className="py-1 px-2 fw-semibold sidebar-tab" style={{ fontSize: '0.8rem' }}>Task</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="habit" className="py-1 px-2 fw-semibold sidebar-tab" style={{ fontSize: '0.8rem' }}>Habit</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Filter Dropdown */}
                <InputGroup size="sm" className="filter-group">
                    <InputGroup.Text className="bg-white"><Filter /></InputGroup.Text>
                    <Form.Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="box-shadow-none filter-select"
                    >
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </Form.Select>
                </InputGroup>
            </div>

            {/* Task List */}
            <div className="flex-grow-1 overflow-auto task-list-container">
                <ListGroup variant="flush">
                    {filteredTasks.length === 0 ? (
                        <div className="text-center p-4 text-muted empty-state">
                            <div className="fs-1 mb-2">📋</div>
                            <small>No tasks found</small>
                        </div>
                    ) : (
                        filteredTasks.map((task, index) => {
                            const isCompleted = task.status === 'completed';
                            const isSelected = selectedTaskId === task._id;

                            return (
                                <ListGroup.Item
                                    key={task._id}
                                    action
                                    onClick={() => onSelectTask(task._id)}
                                    className={`border-bottom px-3 py-3 sidebar-task-item ${isSelected ? 'bg-primary-subtle task-selected' : 'bg-white'} ${mounted ? 'task-fade-in' : ''}`}
                                    style={{
                                        borderLeft: isSelected ? '4px solid var(--bs-primary)' : '4px solid transparent',
                                        transition: 'all 0.2s ease',
                                        opacity: isCompleted ? 0.7 : 1,
                                        animationDelay: `${index * 0.05}s`
                                    }}
                                >
                                    <div className="d-flex align-items-start gap-3">
                                        {/* Checkbox */}
                                        <div className="mt-1">
                                            <div
                                                className={`task-checkbox rounded-circle d-flex align-items-center justify-content-center ${isCompleted ? 'bg-success checked' : 'border'}`}
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    borderColor: isCompleted ? 'transparent' : '#dee2e6'
                                                }}
                                            >
                                                {isCompleted && (
                                                    <CheckCircle size={14} className="text-white check-icon" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex-grow-1 min-w-0">
                                            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                                                {/* Task Title */}
                                                <span
                                                    className={`fw-semibold text-truncate task-title ${isCompleted ? 'text-decoration-line-through text-muted' : 'text-dark'}`}
                                                    style={{
                                                        maxWidth: '140px',
                                                        textDecorationThickness: isCompleted ? '2px' : '0',
                                                        textDecorationColor: isCompleted ? '#28a745' : 'inherit'
                                                    }}
                                                >
                                                    {task.title}
                                                </span>

                                                {/* Priority badge */}
                                                <Badge
                                                    bg={isCompleted ? 'light' : getPriorityColor(task.priority)}
                                                    text={isCompleted ? 'muted' : 'white'}
                                                    className="priority-badge"
                                                    style={{
                                                        fontSize: '0.65rem',
                                                        opacity: isCompleted ? 0.6 : 1
                                                    }}
                                                >
                                                    {isCompleted ? 'Done' : task.priority}
                                                </Badge>
                                            </div>

                                            <div className="d-flex align-items-center gap-3 text-muted small">
                                                <div className="d-flex align-items-center gap-1">
                                                    {task.type === 'habit' ? (
                                                        <>
                                                            <Clock size={12} className={isCompleted ? 'text-success' : 'text-muted'} />
                                                            <span
                                                                style={{
                                                                    fontSize: '0.75rem',
                                                                    color: isCompleted ? '#28a745' : '#6c757d',
                                                                    textTransform: 'capitalize'
                                                                }}
                                                            >
                                                                {task.frequency || 'Daily'}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Calendar size={12} className={isCompleted ? 'text-success' : 'text-muted'} />
                                                            <span
                                                                style={{
                                                                    fontSize: '0.75rem',
                                                                    color: isCompleted ? '#28a745' : '#6c757d'
                                                                }}
                                                            >
                                                                {formatDate(task.dueDate)}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Category badge */}
                                                <span
                                                    className={`badge category-badge ${isCompleted ? 'bg-light text-muted border' : `bg-light text-${getCategoryColor(task.category)} border`}`}
                                                    style={{
                                                        fontSize: '0.65rem',
                                                        opacity: isCompleted ? 0.6 : 1
                                                    }}
                                                >
                                                    {task.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            );
                        })
                    )}
                </ListGroup>
            </div>


        </div>
    );
};

export default Sidebar;