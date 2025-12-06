import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, LightningCharge, ShieldCheck, ArrowRight } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';

const AuthLayout = ({ children, title, subtitle, footerText, footerLink, footerLinkText }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="d-flex min-vh-100 bg-white overflow-hidden position-relative">
            {/* Animated Background Particles for entire page */}
            <div className="position-absolute w-100 h-100 particles-container">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
                <div className="particle particle-4"></div>
                <div className="particle particle-5"></div>
            </div>

            {/* Left Side - Form */}
            <div className="d-flex flex-column justify-content-center align-items-center col-12 col-lg-6 p-4 p-lg-5 position-relative auth-form-side">
                <div className={`w-100 ${mounted ? 'fade-in-up' : ''}`} style={{ maxWidth: '420px' }}>
                    {/* Enhanced Brand */}
                    <div className="d-flex align-items-center gap-2 mb-5">
                        <div className="gradient-logo d-flex align-items-center justify-content-center fw-bold" style={{ width: 40, height: 40 }}>
                            Z
                        </div>
                        <span className="fw-bold fs-4 text-dark">ZenTask</span>
                        <span className="badge bg-primary bg-opacity-10 text-primary ms-2 px-2 py-1 small fw-normal">Beta</span>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-bold display-6 mb-2 text-gradient">{title}</h2>
                        <p>{subtitle}</p>
                    </div>

                    {children}

                    <div className="mt-4 text-center">
                        <p className="text-muted small">
                            {footerText} <Link to={footerLink} className="fw-semibold text-decoration-none text-primary hover-underline">{footerLinkText}</Link>
                        </p>
                    </div>
                </div>

                {/* Mobile Footer/Copyright */}
                <div className="mt-auto pt-4 text-center text-muted small d-lg-none">
                    &copy; 2024 ZenTask. All rights reserved.
                </div>
            </div>

            {/* Right Side - Modern Visual Panel */}
            <div className="d-none d-lg-flex col-lg-6 position-relative align-items-center justify-content-center overflow-hidden auth-visual-side">
                {/* Modern Gradient Background */}
                <div className="position-absolute w-100 h-100 modern-gradient"></div>

                {/* Animated Gradient Mesh */}
                <div className="position-absolute w-100 h-100 gradient-mesh"></div>

                {/* Floating Elements */}
                <div className="floating-element fe-1"></div>
                <div className="floating-element fe-2"></div>
                <div className="floating-element fe-3"></div>
                <div className="floating-element fe-4"></div>

                {/* Main Content Container */}
                <div className={`position-relative content-container ${mounted ? 'fade-in' : ''}`}>
                    {/* Stats Cards - Enhanced */}
                    <div className="stats-grid mb-5">
                        {[
                            { icon: <CheckCircle size={20} />, number: "10,000+", label: "Tasks Completed", color: "success", delay: "0s" },
                            { icon: <LightningCharge size={20} />, number: "5,000+", label: "Active Users", color: "primary", delay: "0.1s" },
                            { icon: <ShieldCheck size={20} />, number: "95%", label: "Success Rate", color: "warning", delay: "0.2s" }
                        ].map((stat, index) => (
                            <div key={index} className="stat-card" style={{ animationDelay: stat.delay }}>
                                <div className={`stat-icon bg-${stat.color} gradient-icon`}>
                                    {stat.icon}
                                </div>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Main Feature Card - Glass Morphism */}
                    <div className="feature-card-main glass-card p-5">
                        <div className="mb-4 d-flex justify-content-center">
                            {/* Animated Productivity Icon */}
                            <div className="productivity-icon-container">
                                <div className="productivity-circle circle-1"></div>
                                <div className="productivity-circle circle-2"></div>
                                <div className="productivity-circle circle-3"></div>
                                <div className="productivity-center">
                                    <LightningCharge size={32} className="text-primary" />
                                </div>
                            </div>
                        </div>

                        <h3 className="fw-bold text-dark mb-3">Transform Your Productivity</h3>
                        <p className="text-secondary lead mb-4">Join our community of mindful achievers who build lasting habits and accomplish more with less stress.</p>

                        {/* Feature List */}
                        <div className="feature-list">
                            {[
                                "Smart task management with AI suggestions",
                                "Habit tracking with visual progress",
                                "Focus mode for distraction-free work",
                                "Cross-platform synchronization"
                            ].map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <CheckCircle className="text-success me-2" size={18} />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button inside card */}
                        <Button
                            variant="primary"
                            className="w-100 mt-4 py-2 fw-semibold gradient-btn"
                            as={Link}
                            to={footerLink === "/login" ? "/signup" : "/login"}
                        >
                            {footerLink === "/login" ? "Try For Free" : "See How It Works"}
                            <ArrowRight className="ms-2" size={16} />
                        </Button>
                    </div>

                    {/* Floating Testimonial */}
                    <div className="testimonial-float">
                        <div className="testimonial-card glass-card">
                            <div className="testimonial-stars mb-2">
                                ⭐⭐⭐⭐⭐
                            </div>
                            <p className="testimonial-text mb-2">"ZenTask completely transformed my daily routine. I'm 3x more productive!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">S</div>
                                <div>
                                    <div className="author-name">Sarah Johnson</div>
                                    <div className="author-role">Product Designer @ Figma</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (email && password) {
                await login({ email, password });
                navigate('/app');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Please enter your details to log in."
            footerText="Don't have an account?"
            footerLink="/signup"
            footerLinkText="Sign up for free"
        >
            <Form onSubmit={handleLogin}>
                {error && <div className="alert alert-danger small py-2">{error}</div>}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="login-email" className="small fw-medium">Email address</Form.Label>
                    <Form.Control
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="py-2"
                        autoComplete="email"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <Form.Label htmlFor="login-password" className="small fw-medium mb-0">Password</Form.Label>
                        <Link to="#" className="small text-decoration-none text-primary hover-underline">Forgot password?</Link>
                    </div>
                    <Form.Control
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="py-2"
                        autoComplete="current-password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold mb-3 glow-on-hover">
                    Log In
                </Button>


            </Form>
        </AuthLayout>
    );
};

export const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (email && password && name) {
                await signup({ name, email, password });
                navigate('/app');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <AuthLayout
            title="Create account"
            subtitle="Start your journey to better habits today."
            footerText="Already have an account?"
            footerLink="/login"
            footerLinkText="Log in"
        >
            <Form onSubmit={handleSignup}>
                {error && <div className="alert alert-danger small py-2">{error}</div>}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="signup-name" className="small fw-medium">Full Name</Form.Label>
                    <Form.Control
                        id="signup-name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="py-2"
                        autoComplete="name"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="signup-email" className="small fw-medium">Email address</Form.Label>
                    <Form.Control
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="py-2"
                        autoComplete="email"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="signup-password" className="small fw-medium">Password</Form.Label>
                    <Form.Control
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="py-2"
                        autoComplete="new-password"
                    />
                    <Form.Text className="text-muted small">Must be at least 8 characters with numbers & symbols.</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 py-2 fw-semibold mb-3 glow-on-hover">
                    Get Started
                </Button>
            </Form>
        </AuthLayout>
    );
};