import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Container, Alert, InputGroup, Offcanvas } from 'react-bootstrap';
import {
    PersonCircle, ShieldLock, Bell, Palette, Trash, Save, Camera,
    ArrowLeft, Key, Moon, Sun, Eye, EyeSlash,
    CheckCircle, Clock, List
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: 'Alex Johnson',
        email: 'alex@zentask.app',
        bio: 'Mindful productivity enthusiast focused on building better habits.',
        notifications: {
            email: true,
            push: false,
            weeklyDigest: true,
            milestoneAlerts: true,
        },
        preferences: {
            theme: 'light',
            timezone: 'America/New_York'
        }
    });
    const [mounted, setMounted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(prev => ({ ...prev, ...storedUser }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (setting, category = 'notifications') => {
        setUser(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: !prev[category][setting]
            }
        }));
    };

    const handleThemeChange = (theme) => {
        setUser(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                theme: theme
            }
        }));
    };

    const handleSave = () => {
        localStorage.setItem('user', JSON.stringify(user));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Apply theme change
        if (user.preferences.theme === 'dark') {
            document.body.setAttribute('data-bs-theme', 'dark');
        } else {
            document.body.setAttribute('data-bs-theme', 'light');
        }
    };

    const handlePasswordChange = () => {
        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // Handle password change logic
        setPasswordError('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleAvatarUpload = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            console.log('File selected:', e.target.files[0]);
        };
        fileInput.click();
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: PersonCircle },
        { id: 'security', label: 'Security', icon: ShieldLock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'preferences', label: 'Preferences', icon: Palette },
    ];

    const renderSidebarContent = () => (
        <>
            <div className="p-4 border-bottom">
                <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center bg-primary text-white fw-bold" style={{ width: 48, height: 48 }}>
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold">{user.name}</h6>
                        <small className="text-muted">{user.email}</small>
                    </div>
                </div>
            </div>

            <div className="p-3">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? 'primary' : 'light'}
                        className={`w-100 mb-2 d-flex align-items-center gap-2 justify-content-start ${activeTab === tab.id ? '' : 'text-dark'}`}
                        onClick={() => {
                            setActiveTab(tab.id);
                            setShowMobileMenu(false);
                        }}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </Button>
                ))}
            </div>
        </>
    );

    return (
        <Container fluid className="p-0 h-100 overflow-hidden d-flex flex-column bg-white">
            {/* Clean Header */}
            <div className="border-bottom px-4 py-3 d-flex align-items-center gap-3">
                <Button
                    variant="light"
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center border"
                    onClick={() => navigate('/app')}
                >
                    <ArrowLeft size={20} />
                </Button>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="light"
                    className="d-md-none rounded-circle p-2 d-flex align-items-center justify-content-center border"
                    onClick={() => setShowMobileMenu(true)}
                >
                    <List size={20} />
                </Button>
                <div>
                    <h4 className="mb-0 fw-bold text-dark">Settings</h4>
                    <small className="text-muted">Manage your account preferences</small>
                </div>
            </div>

            <div className="flex-grow-1 overflow-hidden d-flex">
                {/* Desktop Sidebar Navigation */}
                <div className="d-none d-md-block border-end bg-light" style={{ width: '240px' }}>
                    {renderSidebarContent()}
                </div>

                {/* Mobile Sidebar (Offcanvas) */}
                <Offcanvas show={showMobileMenu} onHide={() => setShowMobileMenu(false)}>
                    <Offcanvas.Header closeButton className="border-bottom">
                        <Offcanvas.Title>Settings</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-0 bg-light">
                        {renderSidebarContent()}
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Main Content */}
                <div className="flex-grow-1 overflow-auto p-4">
                    <Container fluid className="h-100">
                        {showSuccess && (
                            <Alert variant="success" className="mb-4 border-0 shadow-sm d-flex align-items-center gap-2">
                                <CheckCircle size={20} />
                                <div className="flex-grow-1">
                                    <span className="fw-semibold">Settings saved successfully!</span>
                                </div>
                                <Button size="sm" variant="outline-success" onClick={() => setShowSuccess(false)}>
                                    Dismiss
                                </Button>
                            </Alert>
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="settings-fade-in">
                                <div className="mb-4">
                                    <h5 className="fw-bold mb-3">Profile Information</h5>

                                    <div className="d-flex align-items-center gap-4 mb-4">
                                        <div className="position-relative">
                                            <div className="avatar-container rounded-circle overflow-hidden" style={{ width: 96, height: 96 }}>
                                                <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-primary text-white fw-bold fs-3">
                                                    {user.name.charAt(0)}
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="light"
                                                className="position-absolute bottom-0 end-0 rounded-circle border shadow-sm"
                                                onClick={handleAvatarUpload}
                                                style={{ width: 32, height: 32 }}
                                            >
                                                <Camera size={14} />
                                            </Button>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold mb-1">{user.name}</h6>
                                            <p className="text-muted mb-2">{user.email}</p>
                                            <small className="text-primary">Click the camera icon to upload a new photo</small>
                                        </div>
                                    </div>

                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small fw-semibold">Full Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={user.name}
                                                    onChange={handleChange}
                                                    className="border"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className="small fw-semibold">Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={user.email}
                                                    onChange={handleChange}
                                                    className="border"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label className="small fw-semibold">Bio</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="bio"
                                                    value={user.bio}
                                                    onChange={handleChange}
                                                    className="border"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="settings-fade-in">
                                <h5 className="fw-bold mb-4">Security Settings</h5>

                                <Card className="border mb-4">
                                    <Card.Body>
                                        <h6 className="fw-bold mb-3">Change Password</h6>
                                        {passwordError && (
                                            <Alert variant="danger" className="py-2 mb-3">
                                                {passwordError}
                                            </Alert>
                                        )}
                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-semibold">New Password</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            type={showPassword ? "text" : "password"}
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            placeholder="Enter new password"
                                                            className="border-end-0"
                                                        />
                                                        <Button
                                                            variant="outline-secondary"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="border-start-0"
                                                        >
                                                            {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                                                        </Button>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label className="small fw-semibold">Confirm Password</Form.Label>
                                                    <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        placeholder="Confirm new password"
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Button
                                            variant="primary"
                                            className="mt-3"
                                            onClick={handlePasswordChange}
                                            disabled={!newPassword || !confirmPassword}
                                        >
                                            <Key className="me-2" size={16} />
                                            Update Password
                                        </Button>
                                    </Card.Body>
                                </Card>

                                <Card className="border">
                                    <Card.Body>
                                        <h6 className="fw-bold mb-3">Session Management</h6>
                                        <p className="text-muted small mb-3">Manage your active sessions across devices</p>
                                        <Button variant="outline-danger">
                                            Log out of all other devices
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="settings-fade-in">
                                <h5 className="fw-bold mb-4">Notification Preferences</h5>

                                <Card className="border mb-4">
                                    <Card.Body>
                                        <h6 className="fw-bold mb-3">Email Notifications</h6>
                                        <div className="d-flex flex-column gap-3">
                                            <div className="d-flex justify-content-between align-items-center p-3 rounded border">
                                                <div>
                                                    <h6 className="mb-0 fw-semibold">Task Reminders</h6>
                                                    <small className="text-muted">Daily and weekly task reminders</small>
                                                </div>
                                                <Form.Check
                                                    type="switch"
                                                    checked={user.notifications.email}
                                                    onChange={() => handleToggle('email')}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center p-3 rounded border">
                                                <div>
                                                    <h6 className="mb-0 fw-semibold">Push Notifications</h6>
                                                    <small className="text-muted">Desktop and mobile notifications</small>
                                                </div>
                                                <Form.Check
                                                    type="switch"
                                                    checked={user.notifications.push}
                                                    onChange={() => handleToggle('push')}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center p-3 rounded border">
                                                <div>
                                                    <h6 className="mb-0 fw-semibold">Weekly Digest</h6>
                                                    <small className="text-muted">Weekly productivity summary</small>
                                                </div>
                                                <Form.Check
                                                    type="switch"
                                                    checked={user.notifications.weeklyDigest}
                                                    onChange={() => handleToggle('weeklyDigest')}
                                                />
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        )}

                        {/* Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div className="settings-fade-in">
                                <h5 className="fw-bold mb-4">App Preferences</h5>

                                <Row>
                                    <Col md={6}>
                                        <Card className="border mb-4">
                                            <Card.Body>
                                                <h6 className="fw-bold mb-3">Theme</h6>
                                                <div className="text-center py-4">
                                                    <Palette size={48} className="text-muted mb-3" />
                                                    <h6 className="fw-bold text-muted">Coming Soon</h6>
                                                    <p className="text-muted small mb-0">
                                                        Dark mode and custom themes
                                                        will be available in a future update.
                                                    </p>
                                                </div>
                                                <Row className="g-3 opacity-50">
                                                    <Col md={6}>
                                                        <Button variant="outline-primary" className="w-100 d-flex flex-column align-items-center py-3" disabled>
                                                            <Sun size={24} className="mb-2" />
                                                            Light
                                                        </Button>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Button variant="outline-primary" className="w-100 d-flex flex-column align-items-center py-3" disabled>
                                                            <Moon size={24} className="mb-2" />
                                                            Dark
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card className="border mb-4">
                                            <Card.Body>
                                                <h6 className="fw-bold mb-3">Language & Region</h6>
                                                <div className="text-center py-4">
                                                    <Clock size={48} className="text-muted mb-3" />
                                                    <h6 className="fw-bold text-muted">Coming Soon</h6>
                                                    <p className="text-muted small mb-0">
                                                        Multi-language support and regional settings
                                                        will be available in a future update.
                                                    </p>
                                                </div>
                                                <div className="bg-light p-3 rounded border">
                                                    <Row className="g-3">
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="small fw-semibold text-muted">Language</Form.Label>
                                                                <Form.Select className="border" disabled>
                                                                    <option>English</option>
                                                                </Form.Select>
                                                                <Form.Text className="text-muted small">Currently only English</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="small fw-semibold text-muted">Timezone</Form.Label>
                                                                <Form.Select className="border" disabled>
                                                                    <option>{user.preferences.timezone}</option>
                                                                </Form.Select>
                                                                <Form.Text className="text-muted small">Auto-detected</Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        )}

                        {/* Danger Zone */}
                        <Card className="border border-danger mt-4">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <Trash size={24} className="text-danger" />
                                    <h5 className="mb-0 fw-bold text-danger">Danger Zone</h5>
                                </div>
                                <p className="text-muted small mb-3">These actions are permanent and cannot be undone.</p>
                                <div className="d-flex gap-3">
                                    <Button variant="outline-danger">
                                        Export All Data
                                    </Button>
                                    <Button variant="danger">
                                        Delete Account
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>

            {/* Save Button */}
            <div className="border-top p-3 bg-white shadow-sm">
                <Container fluid className="d-flex justify-content-end gap-3">
                    <Button
                        variant="light"
                        className="border"
                        onClick={() => navigate('/app')}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        className="px-4"
                        onClick={handleSave}
                    >
                        <Save className="me-2" size={16} />
                        Save Changes
                    </Button>
                </Container>
            </div>

            <style>
                {`
                .avatar-placeholder {
                    transition: all 0.2s ease;
                }
                
                .avatar-container {
                    border: 4px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                
                .settings-fade-in {
                    animation: fadeIn 0.3s ease-in-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .bg-light-hover:hover {
                    background-color: #f8f9fa !important;
                }
                
                .border {
                    transition: border-color 0.2s ease;
                }
                
                .border:focus {
                    border-color: var(--bs-primary) !important;
                }
                
                .btn-outline-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(13, 110, 253, 0.2);
                }
                
                /* Disabled form styling */
                .form-control:disabled, .form-select:disabled {
                    background-color: #f8f9fa;
                    border-color: #e9ecef;
                    color: #6c757d;
                    cursor: not-allowed;
                }
                `}
            </style>
        </Container>
    );
};

export default ProfileSettings;