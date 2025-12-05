import React, { useState } from 'react';
import { Form, InputGroup, Button, Nav, Badge, ListGroup } from 'react-bootstrap';
import { Search, Plus, X, Filter, Calendar, CheckCircleFill } from 'react-bootstrap-icons';
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
            <div className="d-none d-md-block px-4 py-3 border-bottom">
                <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold" style={{ width: 32, height: 32 }}>
                        Z
                    </div>
                    <span className="fw-semibold fs-5 text-dark">ZenTask</span>
                </div>
            </div>

            {/* Controls Section*/}
            <div className="p-3 border-bottom bg-light">
                {/* Overview & New Button */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <Button
                        variant="link"
                        className="text-decoration-none text-dark p-0 d-flex align-items-center gap-2 sidebar-btn-hover"
                        onClick={() => window.dispatchEvent(new CustomEvent('navigateToDashboard'))}
                    >
                        <div className="d-flex align-items-center justify-content-center" style={{ width: 24, height: 24 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                            </svg>
                        </div>
                        <span className="fw-bold">Overview</span>
                    </Button>
                    <Button variant="primary" size="sm" className="d-flex align-items-center gap-1" onClick={onOpenTaskForm}>
                        <Plus size={16} /> New
                    </Button>
                </div>

                {/* Search */}
                <InputGroup className="mb-3" size="sm">
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
                        <Button variant="outline-secondary" className="border-start-0" onClick={() => setSearchQuery('')}>
                            <X />
                        </Button>
                    )}
                </InputGroup>

                {/* Tabs */}
                {/* Improvement: Ensure text color is white on active tab for visibility */}
                <style>
                    {`
                    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
                        background-color: var(--bs-primary);
                        color: white !important;
                    }
                    .nav-pills .nav-link {
                         color: var(--bs-secondary);
                    }
                    `}
                </style>
                <Nav variant="pills" className="nav-fill gap-1 bg-white p-1 rounded border mb-3" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Nav.Item>
                        <Nav.Link eventKey="all" className="py-1 px-2 fw-semibold sidebar-tab-hover" style={{ fontSize: '0.8rem' }}>All</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="task" className="py-1 px-2 fw-semibold sidebar-tab-hover" style={{ fontSize: '0.8rem' }}>Task</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="habit" className="py-1 px-2 fw-semibold sidebar-tab-hover" style={{ fontSize: '0.8rem' }}>Habit</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Filter Dropdown */}
                <InputGroup size="sm">
                    <InputGroup.Text className="bg-white"><Filter /></InputGroup.Text>
                    <Form.Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="box-shadow-none"
                    >
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </Form.Select>
                </InputGroup>
            </div>

            {/* Task List */}
            <div className="flex-grow-1 overflow-auto">
                <ListGroup variant="flush">
                    {filteredTasks.length === 0 ? (
                        <div className="text-center p-4 text-muted">
                            <div className="fs-1 mb-2">📋</div>
                            <small>No tasks found</small>
                        </div>
                    ) : (
                        filteredTasks.map(task => (
                            <ListGroup.Item
                                key={task._id}
                                action
                                onClick={() => onSelectTask(task._id)}
                                className={`border-bottom px-3 py-3 sidebar-task-item ${selectedTaskId === task._id ? 'bg-primary-subtle' : 'bg-white'}`}
                                style={{
                                    borderLeft: selectedTaskId === task._id ? '4px solid var(--bs-primary)' : '4px solid transparent',
                                    transition: 'border-left 0.1s linear'
                                }}
                            >
                                <div className="d-flex align-items-start gap-3">
                                    <div className="mt-1">
                                        {/* Visual indicator only in sidebar, actual state is task.status */}
                                        {task.status === 'completed' ? <div className="text-success"><CheckCircleFill size={16} /></div> : null}
                                    </div>

                                    <div className="flex-grow-1 min-w-0">
                                        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                                            {/* Sync: Use task.status for strikethrough logic */}
                                            <span className={`fw-semibold text-truncate ${task.status === 'completed' ? 'text-decoration-line-through text-muted' : 'text-dark'}`} style={{ maxWidth: '140px' }}>
                                                {task.title}
                                            </span>
                                            <Badge bg={getPriorityColor(task.priority)} style={{ fontSize: '0.65rem' }}>
                                                {task.priority}
                                            </Badge>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 text-muted small">
                                            <div className="d-flex align-items-center gap-1">
                                                <Calendar size={12} />
                                                <span style={{ fontSize: '0.75rem' }}>{formatDate(task.dueDate)}</span>
                                            </div>
                                            <span className={`badge bg-light text-${getCategoryColor(task.category)} border`} style={{ fontSize: '0.65rem' }}>
                                                {task.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            </div>
        </div>
    );
};

export default Sidebar;
