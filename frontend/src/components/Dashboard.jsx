import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Button, Dropdown } from 'react-bootstrap';
import { Check2Square, ListUl, JournalCheck, LightningCharge, PersonCircle, BoxArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { getCategoryColor } from '../data/mockData';

// Calculate stats from PROPS now
const getStats = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const activeHabits = tasks.filter(t => t.frequency && t.status !== 'completed').length;
    const habits = tasks.filter(t => t.frequency).length;

    // Calculate Best Streak (highest streak among all habits)
    const habitStreaks = tasks
        .filter(t => t.type === 'habit' && t.streak)
        .map(h => h.streak);
    const bestStreak = habitStreaks.length > 0 ? Math.max(...habitStreaks) : 0;

    return {
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        pendingTasks: pendingTasks,
        activeHabits: habits,
        bestStreak: bestStreak
    };
};

const StatsCard = ({ label, value, unit = '', icon: IconComponent, description, color = 'secondary', delay = '0s' }) => {
    const textClass = `text-${color}`;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <Card className={`h-100 border-0 shadow-sm stats-card ${isVisible ? 'fade-in-up' : ''}`} style={{ animationDelay: delay }}>
            <Card.Body>
                <div className="d-flex align-items-start justify-content-between mb-3">
                    <div>
                        <p className={`fw-medium mb-1 ${textClass}`} style={{ fontSize: '0.875rem' }}>{label}</p>
                        <div className="d-flex align-items-baseline gap-1">
                            <span className={`display-6 fw-bold ${textClass} counter-number`} style={{ fontSize: '2rem' }}>{value}</span>
                            {unit && <span className="text-muted small">{unit}</span>}
                        </div>
                    </div>
                    <div className={`${textClass} fs-3 icon-float`}>
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
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);

    // Retrieve mock user from localStorage or use default
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Demo User', email: 'demo@zentask.app' };

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Morning';
        if (hour < 18) return 'Afternoon';
        return 'Evening';
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="h-100 overflow-auto bg-white">
            {/* Header */}
            <div className="bg-primary bg-gradient text-white dashboard-header shadow-sm position-relative">
                {/* Animated background shapes wrapper to prevent overflow but allow dropdowns to spill out of main header if needed (though dropdowns are usually absolute to window or parent, removing overflow-hidden from header helps) */}
                <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 0 }}>
                    <div className="header-shape header-shape-1"></div>
                    <div className="header-shape header-shape-2"></div>
                </div>

                <Container fluid className="position-relative" style={{ zIndex: 10 }}>
                    <div className="d-flex justify-content-between align-items-start py-4 px-3">
                        {/* Left: Greeting */}
                        <div className={`${mounted ? 'fade-in-left' : ''}`}>
                            <h1 className="fw-bold display-5 mb-2">
                                Good {getGreeting()}, {user.name.split(' ')[0]}!
                            </h1>
                            <p className="lead mb-0 text-white opacity-75">
                                Here's your overview for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.
                            </p>
                        </div>

                        {/* Right: User Profile Dropdown */}
                        <div className={`d-none d-md-block ${mounted ? 'fade-in-right' : ''}`}>
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    as="div"
                                    className="d-flex align-items-center gap-3 profile-toggle"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="text-end d-none d-md-block">
                                        <div className="fw-semibold text-white" style={{ fontSize: '0.9rem' }}>{user.name}</div>
                                        <div className="small text-white opacity-75" style={{ fontSize: '0.75rem' }}>{user.email}</div>
                                    </div>
                                    <div className="profile-avatar bg-white text-primary rounded-circle d-flex align-items-center justify-content-center shadow fw-bold" style={{ width: 48, height: 48, fontSize: '1.1rem' }}>
                                        {getInitials(user.name)}
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="shadow-lg border-0 mt-2 profile-dropdown">
                                    <div className="px-3 py-2 border-bottom">
                                        <div className="fw-semibold text-dark">{user.name}</div>
                                        <div className="small text-muted">{user.email}</div>
                                    </div>
                                    <Dropdown.Item className="py-2" onClick={() => navigate('/settings')}>
                                        <PersonCircle className="me-2" size={16} />
                                        Profile Settings
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout} className="text-danger py-2">
                                        <BoxArrowRight className="me-2" size={16} />
                                        Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
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
                            delay="0.1s"
                        />
                    </Col>
                    <Col sm={6} lg={3}>
                        <StatsCard
                            label="Pending Tasks"
                            value={stats.pendingTasks}
                            icon={<ListUl />}
                            description="One-time tasks remaining"
                            color="info"
                            delay="0.2s"
                        />
                    </Col>
                    <Col sm={6} lg={3}>
                        <StatsCard
                            label="Active Habits"
                            value={stats.activeHabits}
                            icon={<JournalCheck />}
                            description="Recurring habits being tracked"
                            color="success"
                            delay="0.3s"
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
                            delay="0.4s"
                        />
                    </Col>
                </Row>

                <Row className="g-4">
                    {/* Category Distribution */}
                    <Col lg={6}>
                        <Card className={`h-100 border shadow-sm chart-card ${mounted ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.5s' }}>
                            <Card.Body className="p-4">
                                <h5 className="fw-bold mb-4 text-dark">Category Distribution</h5>
                                {tasks.length === 0 ? (
                                    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '160px' }}>
                                        <div className="text-center text-muted">
                                            <div className="mb-2">No data available</div>
                                            <small className="text-secondary opacity-75">Start creating tasks to see analytics</small>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center gap-5">
                                        {/* Donut Chart */}
                                        <div className="position-relative" style={{ width: '140px', height: '140px' }}>
                                            <svg width="140" height="140" viewBox="0 0 140 140" className="rotate-90">
                                                <circle cx="70" cy="70" r="54" fill="transparent" stroke="#f8f9fa" strokeWidth="12" />
                                                {(() => {
                                                    let offset = 0;
                                                    const circumference = 2 * Math.PI * 54;

                                                    return ['work', 'personal', 'health'].map(cat => {
                                                        const count = tasks.filter(t => t.category === cat).length;
                                                        if (count === 0) return null;

                                                        const percentage = count / tasks.length;
                                                        const dashArray = percentage * circumference;
                                                        const currentOffset = offset;
                                                        offset += dashArray;

                                                        const colorMap = {
                                                            'work': '#0dcaf0',      // info
                                                            'personal': '#198754',  // success
                                                            'health': '#dc3545'     // danger
                                                        };

                                                        return (
                                                            <circle
                                                                key={cat}
                                                                cx="70"
                                                                cy="70"
                                                                r="54"
                                                                fill="transparent"
                                                                stroke={colorMap[cat]}
                                                                strokeWidth="12"
                                                                strokeDasharray={`${dashArray} ${circumference}`}
                                                                strokeDashoffset={-currentOffset}
                                                                strokeLinecap="round"
                                                                style={{ transition: 'stroke-dasharray 1s ease' }}
                                                            />
                                                        );
                                                    });
                                                })()}
                                            </svg>
                                            <div className="position-absolute top-50 start-50 translate-middle text-center">
                                                <div className="fs-4 fw-bold">{tasks.length}</div>
                                                <div className="text-muted small" style={{ fontSize: '0.7rem' }}>Total</div>
                                            </div>
                                        </div>

                                        {/* Legend */}
                                        <div className="d-flex flex-column gap-3">
                                            {['work', 'personal', 'health'].map(cat => {
                                                const count = tasks.filter(t => t.category === cat).length;
                                                const percentage = Math.round((count / tasks.length) * 100);
                                                const colorMap = {
                                                    'work': 'bg-info',
                                                    'personal': 'bg-success',
                                                    'health': 'bg-danger'
                                                };

                                                return (
                                                    <div key={cat} className="d-flex align-items-center gap-2">
                                                        <div className={`rounded-circle ${colorMap[cat]}`} style={{ width: '10px', height: '10px' }}></div>
                                                        <div>
                                                            <div className="fw-semibold small text-capitalize">{cat}</div>
                                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{percentage}% ({count})</div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Quick Actions */}
                    <Col lg={6}>
                        <Card className={`h-100 border border-primary-subtle bg-primary-subtle shadow-sm action-card ${mounted ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.6s' }}>
                            <Card.Body className="p-4">
                                <h5 className="fw-bold mb-3 text-dark">Quick Actions</h5>
                                <p className="text-secondary small mb-4">
                                    Start building better habits today. Consistency is key to long-term success.
                                </p>
                                <div className="d-flex flex-column flex-sm-row gap-3">
                                    <Button
                                        variant="light"
                                        className="flex-fill border py-2 text-primary fw-medium shadow-sm action-button"
                                        onClick={() => onOpenTaskForm('habit')}
                                    >
                                        <div className="text-center">
                                            <div className="fw-bold small">Add Habit</div>
                                            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Track daily routines</small>
                                        </div>
                                    </Button>
                                    <Button
                                        variant="light"
                                        className="flex-fill border py-2 text-primary fw-medium shadow-sm action-button"
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