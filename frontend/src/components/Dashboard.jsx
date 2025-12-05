import React, { useState } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { Check2Square, ListUl, JournalCheck, LightningCharge } from 'react-bootstrap-icons';

// Calculate stats from PROPS now
const getStats = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const activeHabits = tasks.filter(t => t.frequency && t.status !== 'completed').length;
    const habits = tasks.filter(t => t.frequency).length;

    return {
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        pendingTasks: pendingTasks,
        activeHabits: habits,
        bestStreak: 7 // Placeholder logic remains
    };
};

const StatsCard = ({ label, value, unit = '', icon: IconComponent, description, color = 'secondary' }) => {
    const textClass = `text-${color}`;

    return (
        <Card className="h-100 border-0 shadow-sm custom-card-hover">
            <Card.Body>
                <div className="d-flex align-items-start justify-content-between mb-3">
                    <div>
                        <p className={`fw-medium mb-1 ${textClass}`} style={{ fontSize: '0.875rem' }}>{label}</p>
                        <div className="d-flex align-items-baseline gap-1">
                            <span className={`display-6 fw-bold ${textClass}`} style={{ fontSize: '2rem' }}>{value}</span>
                            {unit && <span className="text-muted small">{unit}</span>}
                        </div>
                    </div>
                    <div className={`${textClass} fs-3`}>
                        {IconComponent}
                    </div>
                </div>
                <p className="text-muted small mb-0">{description}</p>
            </Card.Body>
        </Card>
    );
};

const Dashboard = ({ tasks, onSelectTask, onOpenTaskForm }) => {
    const stats = getStats(tasks);

    return (
        <div className="h-100 overflow-auto bg-white">
            {/* Header */}
            <div className="bg-primary bg-gradient text-white p-5 mb-4 shadow-sm">
                <Container fluid>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div>
                            <h1 className="fw-bold display-5 mb-2">Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, User!</h1>
                            <p className="lead mb-0 text-white opacity-75">
                                Here's your overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.
                            </p>
                        </div>
                        {/* Quick Add button removed as requested */}
                    </div>
                </Container>
            </div>

            {/* Main Content */}
            <Container fluid className="p-4">
                {/* Stats Grid */}
                <Row className="g-4 mb-4">
                    <Col sm={6} lg={3}>
                        <StatsCard
                            label="Completion Rate"
                            value={stats.completionRate}
                            unit="%"
                            icon={<Check2Square />}
                            description={`${Math.floor(stats.completionRate / 10)} of ${Math.ceil(100 / 10)} items completed`}
                            color="primary"
                        />
                    </Col>
                    <Col sm={6} lg={3}>
                        <StatsCard
                            label="Pending Tasks"
                            value={stats.pendingTasks}
                            icon={<ListUl />}
                            description="One-time tasks remaining"
                            color="info"
                        />
                    </Col>
                    <Col sm={6} lg={3}>
                        <StatsCard
                            label="Active Habits"
                            value={stats.activeHabits}
                            icon={<JournalCheck />}
                            description="Recurring habits being tracked"
                            color="success"
                        />
                    </Col>
                    <Col sm={6} lg={3}>
                        <StatsCard
                            label="Best Streak"
                            value={stats.bestStreak}
                            unit="Days"
                            icon={<LightningCharge />}
                            description="Keep the momentum going!"
                            color="warning"
                        />
                    </Col>
                </Row>

                <Row className="g-4">
                    {/* Category Distribution */}
                    <Col lg={6}>
                        <Card className="h-100 border shadow-sm custom-card-hover">
                            <Card.Body className="p-4">
                                <h5 className="fw-bold mb-4 text-dark">Category Distribution</h5>
                                <div className="d-flex align-items-center justify-content-center" style={{ height: '160px' }}>
                                    <div className="text-center text-muted">
                                        <div className="mb-2">No data available</div>
                                        <small className="text-secondary opacity-75">Chart placeholder for category breakdown</small>
                                        <ul className="list-unstyled mt-3 small text-secondary">
                                            <li>Work: {tasks.filter(t => t.category === 'work').length}</li>
                                            <li>Health: {tasks.filter(t => t.category === 'health').length}</li>
                                            <li>Personal: {tasks.filter(t => t.category === 'personal').length}</li>
                                        </ul>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Quick Actions */}
                    <Col lg={6}>
                        <Card className="h-100 border border-primary-subtle bg-primary-subtle shadow-sm custom-card-hover">
                            <Card.Body className="p-4">
                                <h5 className="fw-bold mb-3 text-dark">Quick Actions</h5>
                                <p className="text-secondary small mb-4">
                                    Start building better habits today. Consistency is key to long-term success.
                                </p>
                                <div className="d-flex flex-column flex-sm-row gap-3">
                                    <Button
                                        variant="light"
                                        className="flex-fill border py-2 text-primary fw-medium shadow-sm hover-shadow"
                                        onClick={() => onOpenTaskForm('habit')}
                                    >
                                        <div className="text-center">
                                            <div className="fw-bold small">Add Habit</div>
                                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Track daily routines</small>
                                        </div>
                                    </Button>
                                    <Button
                                        variant="light"
                                        className="flex-fill border py-2 text-primary fw-medium shadow-sm hover-shadow"
                                        onClick={() => onOpenTaskForm('task')}
                                    >
                                        <div className="text-center">
                                            <div className="fw-bold small">Add Task</div>
                                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Plan your day</small>
                                        </div>
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;