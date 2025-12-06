import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { Check2Square, LightningCharge, ShieldCheck, Phone, ListUl, JournalCheck, Filter } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({
        hero: false,
        features: false,
        cta: false
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            // Check visibility of sections
            const features = document.getElementById('features');
            const cta = document.querySelector('.cta-section');

            if (features) {
                const rect = features.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75) {
                    setIsVisible(prev => ({ ...prev, features: true }));
                }
            }

            if (cta) {
                const rect = cta.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.75) {
                    setIsVisible(prev => ({ ...prev, cta: true }));
                }
            }
        };

        // Trigger hero animation on mount
        setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-white min-vh-100 d-flex flex-column font-sans" style={{ fontFamily: '"Inter", sans-serif' }}>
            {/* Navbar with subtle shadow */}
            <Navbar bg="white" expand="lg" className="py-3 sticky-top shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold text-dark fs-4">
                        <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center logo-pulse" style={{ width: 32, height: 32, fontSize: '1rem' }}>
                            Z
                        </div>
                        ZenTask
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="gap-2">
                            <Button as={Link} to="/login" variant="light" className="fw-medium text-dark border-0">Log In</Button>
                            <Button as={Link} to="/signup" variant="primary" className="fw-medium px-4">Get Started</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <section className="py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center header-section">
                <Container className="pt-5">
                    <Row className="justify-content-center">
                        <Col lg={8} xl={7}>
                            <h1 className={`display-3 fw-bold text-dark mb-4 hero-title ${isVisible.hero ? 'fade-in-up' : ''}`} style={{ letterSpacing: '-0.02em', lineHeight: 1.2, animationDelay: '0.1s' }}>
                                Master your habits,<br />
                                <span className="text-primary">conquer your day.</span>
                            </h1>
                            <p className={`lead text-secondary mb-5 mx-auto px-md-5 ${isVisible.hero ? 'fade-in-up' : ''}`} style={{ fontSize: '1.25rem', animationDelay: '0.3s' }}>
                                ZenTask combines powerful task management with habit tracking to help you build consistency and achieve your goals without the stress.
                            </p>
                            <div className={`d-flex gap-3 justify-content-center mb-5 hero-btns ${isVisible.hero ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.5s' }}>
                                <Button as={Link} to="/signup" variant="primary" size="lg" className="px-5 py-3 rounded-pill fw-semibold shadow-lg hover-transform hero-btn glow-on-hover">
                                    Start for free
                                </Button>
                                <Button href="#features" variant="outline-dark" size="lg" className="px-5 py-3 rounded-pill fw-semibold hover-transform hero-btn">
                                    Learn more
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Animated App Preview */}
                    <div className={`mt-5 mx-auto position-relative ${isVisible.hero ? 'fade-in-up' : ''}`} style={{ maxWidth: '1000px', perspective: '1000px', animationDelay: '0.7s' }}>
                        <div className="rounded-4 shadow-lg overflow-hidden border bg-light app-preview-container" style={{ transform: 'rotateX(5deg)', transition: 'transform 0.5s ease', height: '600px' }}>
                            {/* Browser Toolbar Mockup */}
                            <div className="bg-white border-bottom px-4 py-2 d-flex align-items-center gap-2">
                                <div className="d-flex gap-1 me-3">
                                    <div className="rounded-circle bg-danger opacity-75" style={{ width: 10, height: 10 }}></div>
                                    <div className="rounded-circle bg-warning opacity-75" style={{ width: 10, height: 10 }}></div>
                                    <div className="rounded-circle bg-success opacity-75" style={{ width: 10, height: 10 }}></div>
                                </div>
                                <div className="bg-light rounded px-3 py-1 small text-muted flex-grow-1 text-center font-monospace" style={{ maxWidth: '400px', margin: '0 auto' }}>zentask.app/dashboard</div>
                            </div>

                            {/* Mock UI Content - Matches Real App Layout */}
                            <div className="d-flex h-100">
                                {/* Mock Sidebar - Real app style */}
                                <div className="bg-white border-end d-none d-md-flex flex-column" style={{ width: '280px', textAlign: 'left' }}>
                                    {/* Sidebar Header */}
                                    <div className="px-3 py-3 border-bottom">
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold" style={{ width: 28, height: 28 }}>Z</div>
                                            <span className="fw-semibold text-dark small">ZenTask</span>
                                        </div>
                                    </div>
                                    {/* Sidebar Controls */}
                                    <div className="p-3 border-bottom bg-light">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-2 text-dark small fw-bold"><ListUl /> Overview</div>
                                            <div className="badge bg-primary rounded-pill d-flex align-items-center gap-1 p-1 px-2">+ New</div>
                                        </div>
                                        {/* Tabs */}
                                        <div className="d-flex bg-white p-1 rounded border gap-1">
                                            <div className="flex-fill text-center bg-primary text-white rounded py-1" style={{ fontSize: '0.7rem' }}>All</div>
                                            <div className="flex-fill text-center text-muted rounded py-1" style={{ fontSize: '0.7rem' }}>Task</div>
                                            <div className="flex-fill text-center text-muted rounded py-1" style={{ fontSize: '0.7rem' }}>Habit</div>
                                        </div>
                                    </div>
                                    {/* Sidebar List */}
                                    <div className="flex-grow-1 bg-white p-0">
                                        {[
                                            { t: 'Morning Meditation', p: 'High', c: 'success', date: 'Today' },
                                            { t: 'Project Proposal', p: 'Medium', c: 'primary', date: 'Tomorrow' },
                                            { t: 'Read 30 mins', p: 'Low', c: 'info', date: 'Today' },
                                            { t: 'Workout', p: 'High', c: 'success', date: 'Daily' }
                                        ].map((item, i) => (
                                            <div key={i} className="border-bottom p-3 d-flex align-items-start gap-2" style={{ borderLeft: i === 0 ? '4px solid var(--bs-primary)' : '4px solid transparent', backgroundColor: i === 0 ? 'var(--bs-primary-bg-subtle)' : 'white' }}>
                                                <div className="mt-1 text-muted"><Check2Square size={14} /></div>
                                                <div className="flex-grow-1 lh-1">
                                                    <div className="fw-medium text-dark mb-1 small">{item.t}</div>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className={`badge bg-${item.p === 'High' ? 'danger' : item.p === 'Medium' ? 'warning' : 'secondary'} text-white`} style={{ fontSize: '0.6rem' }}>{item.p}</span>
                                                        <span className="text-muted" style={{ fontSize: '0.65rem' }}>{item.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mock Dashboard Body */}
                                <div className="flex-grow-1 bg-white d-flex flex-column overflow-hidden">
                                    {/* Dashboard Header */}
                                    <div className="bg-primary bg-gradient text-white p-4 shadow-sm text-start">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="fw-bold mb-1">Good Morning, Demo!</h5>
                                                <p className="small mb-0 opacity-75">Here's your overview for today.</p>
                                            </div>
                                            <div className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 32, height: 32 }}>
                                                <div className="fw-bold small">D</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dashboard Content */}
                                    <div className="p-4 bg-light flex-grow-1 text-start">

                                        {/* Mock Stats Grid */}
                                        <Row className="g-3 mb-4">
                                            <Col xs={3}>
                                                <div className="bg-white p-2 rounded shadow-sm h-100">
                                                    <div className="text-primary fw-bold small">Rate</div>
                                                    <div className="fs-5 fw-bold text-dark">85%</div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div className="bg-white p-2 rounded shadow-sm h-100">
                                                    <div className="text-info fw-bold small">Pending</div>
                                                    <div className="fs-5 fw-bold text-dark">4</div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div className="bg-white p-2 rounded shadow-sm h-100">
                                                    <div className="text-success fw-bold small">Habits</div>
                                                    <div className="fs-5 fw-bold text-dark">3</div>
                                                </div>
                                            </Col>
                                            <Col xs={3}>
                                                <div className="bg-white p-2 rounded shadow-sm h-100">
                                                    <div className="text-warning fw-bold small">Streak</div>
                                                    <div className="fs-5 fw-bold text-dark">7</div>
                                                </div>
                                            </Col>
                                        </Row>

                                        {/* Two Columns: Category vs Quick Actions */}
                                        <Row className="g-3">
                                            <Col xs={6}>
                                                <div className="bg-white border rounded shadow-sm p-3 h-100">
                                                    <div className="fw-bold small mb-2 text-dark">Quick Actions</div>
                                                    <div className="d-flex flex-column gap-2">
                                                        <div className="border rounded p-2 text-center text-primary bg-light small fw-bold">+ Add Habit</div>
                                                        <div className="border rounded p-2 text-center text-primary bg-light small fw-bold">+ Add Task</div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className="bg-white border rounded shadow-sm p-3 h-100">
                                                    <div className="fw-bold small mb-2 text-dark">Categories</div>
                                                    {/* Mock Chart Bars */}
                                                    <div className="d-flex align-items-end gap-2 justify-content-center" style={{ height: '60px' }}>
                                                        <div className="bg-primary rounded-top" style={{ width: '15px', height: '80%' }}></div>
                                                        <div className="bg-success rounded-top" style={{ width: '15px', height: '40%' }}></div>
                                                        <div className="bg-info rounded-top" style={{ width: '15px', height: '60%' }}></div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements for Animation Effect */}
                        <div className="position-absolute top-50 start-0 translate-middle-y ms-n5 d-none d-lg-block floating-card-1">
                            <Card className="shadow-lg border-0 p-2" style={{ width: '180px' }}>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="bg-success text-white rounded-circle p-1 icon-bounce"><Check2Square size={16} /></div>
                                    <div>
                                        <div className="small fw-bold">Streak Saved!</div>
                                        <div className="text-xs text-muted" style={{ fontSize: '0.65rem' }}>7 Day Streak</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="position-absolute bottom-0 end-0 mb-5 me-n5 d-none d-lg-block floating-card-2">
                            <Card className="shadow-lg border-0 p-2" style={{ width: '200px' }}>
                                <div className="d-flex align-items-center gap-2">
                                    <div className="bg-primary text-white rounded-circle p-1 icon-bounce"><LightningCharge size={16} /></div>
                                    <div>
                                        <div className="small fw-bold">Focus Mode</div>
                                        <div className="text-xs text-muted" style={{ fontSize: '0.65rem' }}>Distractions blocked</div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-5 bg-light scroll-margin-top-60">
                <Container className="py-5">
                    <div className={`text-center mb-5 ${isVisible.features ? 'fade-in-up' : ''}`}>
                        <h2 className="fw-bold display-6 mb-3">Everything you need to stay focused</h2>
                        <p className="text-secondary lead">Powerful features wrapped in a simple, elegant interface.</p>
                    </div>

                    <Row className="g-4">
                        {[
                            { icon: Check2Square, color: 'primary', title: 'Habit Tracking', desc: 'Build lasting habits with daily streaks and progress tracking. Visualize your consistency.', delay: '0.1s' },
                            { icon: LightningCharge, color: 'warning', title: 'Focus Mode', desc: 'Eliminate distractions and zero in on your most important task for the day.', delay: '0.2s' },
                            { icon: JournalCheck, color: 'success', title: 'Smart Journals', desc: 'Reflect on your day and track your mood alongside your productivity metrics.', delay: '0.3s' },
                            { icon: Filter, color: 'info', title: 'Powerful Filters', desc: 'Organize tasks by priority, energy level, or category. Find exactly what you need in seconds.', delay: '0.4s' },
                            { icon: Phone, color: 'danger', title: 'Cross-Platform', desc: 'Seamlessly syncs across all your devices so you never lose track of a task.', delay: '0.5s' },
                            { icon: ShieldCheck, color: 'primary', title: 'Privacy First', desc: 'Your data is yours. We employ end-to-end encryption to keep your life private.', delay: '0.6s' }
                        ].map((feature, idx) => (
                            <Col md={4} key={idx}>
                                <Card className={`h-100 border-0 shadow-sm p-3 feature-card text-center text-md-start ${isVisible.features ? 'fade-in-up' : ''}`} style={{ animationDelay: feature.delay }}>
                                    <Card.Body>
                                        <div className={`bg-${feature.color} bg-opacity-10 text-${feature.color} rounded p-3 d-inline-block mb-3 icon-float`}>
                                            <feature.icon size={24} />
                                        </div>
                                        <h5 className="fw-bold mb-2">{feature.title}</h5>
                                        <p className="text-muted">{feature.desc}</p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Bottom CTA - Enhanced Zen Theme */}
            <section className={`cta-section position-relative ${isVisible.cta ? 'fade-in' : ''}`}>
                {/* Animated background particles */}
                <div className="particles-container">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 10}s`,
                                animationDuration: `${15 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                </div>

                <Container className="text-center position-relative" style={{ zIndex: 10 }}>
                    <div className={`cta-content ${isVisible.cta ? 'fade-in-up' : ''}`}>
                        <h2 className="display-5 fw-bold mb-4" style={{ animationDelay: '0.2s' }}>
                            Ready to find your zen?
                        </h2>
                        <p className="lead mb-5 mx-auto" style={{ maxWidth: '600px', fontSize: '1.25rem', animationDelay: '0.4s' }}>
                            Join thousands of mindful achievers who use ZenTask to build habits and crush goals.
                        </p>
                        <Button
                            as={Link}
                            to="/signup"
                            variant="light"
                            size="lg"
                            className="px-5 py-3 rounded-pill fw-semibold shadow-lg cta-button"
                            style={{ animationDelay: '0.6s' }}
                        >
                            Start Using ZenTask
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Footer */}
            <footer className="py-5 bg-white border-top">
                <Container>
                    <Row className="gy-4 justify-content-between">
                        {/* Branding / Company Info */}
                        <Col lg={3} md={6}>
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold" style={{ width: 32, height: 32 }}>
                                    Z
                                </div>
                                <span className="fw-bold fs-5 text-dark">ZenTask</span>
                            </div>
                            <p className="text-muted small mb-4">
                                The mindful productivity app designed to help you build better habits and achieve your goals with less stress.
                            </p>
                        </Col>

                        {/* Information Policies */}
                        <Col lg={3} md={6} xs={6}>
                            <h6 className="fw-bold mb-3 text-dark footer-heading">Information Policies</h6>
                            <ul className="list-unstyled d-flex flex-column gap-2 text-muted small">
                                <li><a href="#" className="text-decoration-none text-muted hover-primary">FAQ</a></li>
                                <li><a href="#" className="text-decoration-none text-muted hover-primary">Privacy Policy</a></li>
                                <li><a href="#" className="text-decoration-none text-muted hover-primary">Terms & Conditions</a></li>
                            </ul>
                        </Col>

                        {/* Quick Links */}
                        <Col lg={2} md={6} xs={6}>
                            <h6 className="fw-bold mb-3 text-dark footer-heading">Quick Links</h6>
                            <ul className="list-unstyled d-flex flex-column gap-2 text-muted small">
                                <li><a href="#features" className="text-decoration-none text-muted hover-primary">Features</a></li>
                                <li><a href="#" className="text-decoration-none text-muted hover-primary">Pricing</a></li>
                                <li><a href="#" className="text-decoration-none text-muted hover-primary">FAQ</a></li>
                                <li><a href="#" className="text-decoration-none text-muted hover-primary">Gallery</a></li>
                            </ul>
                        </Col>

                        {/* Newsletter */}
                        <Col lg={4} md={6}>
                            <h6 className="fw-bold mb-3 text-dark footer-heading">Newsletter</h6>
                            <p className="text-muted small mb-3">
                                Subscribe to receive updates, access to exclusive deals, and more.
                            </p>
                            <form className="d-flex flex-column gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Your Email Address"
                                    aria-label="Email for newsletter"
                                />
                                <Button variant="dark" type="submit" className="text-uppercase fw-bold w-100 mt-1" style={{ letterSpacing: '0.05em' }}>
                                    Subscribe
                                </Button>
                            </form>
                        </Col>
                    </Row>

                </Container>
            </footer>

        </div>
    );
};

export default LandingPage;