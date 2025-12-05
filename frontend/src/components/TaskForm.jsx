import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Circle, CheckCircleFill, Calendar } from 'react-bootstrap-icons';

const TaskForm = ({ onSubmit, onCancel, initialData = null, initialType = 'task' }) => {
    const [itemType, setItemType] = useState(initialType);
    const [formData, setFormData] = useState(initialData || {
        title: '',
        description: '',
        category: 'personal',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0],
        frequency: 'daily'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) {
            alert('Please fill in required fields');
            return;
        }
        if (itemType === 'task' && !formData.dueDate) {
            alert('Please fill in required fields');
            return;
        }
        // Include itemType in submission if needed, or structured data
        onSubmit({ ...formData, itemType });
    };

    return (
        <Modal show={true} onHide={onCancel} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="fs-5 fw-bold">Create New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    {/* Type Selector */}
                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-secondary text-uppercase">Type</Form.Label>
                        <div className="d-flex gap-3">
                            <div
                                className={`d-flex align-items-center gap-2 border rounded p-3 cursor-pointer flex-fill ${itemType === 'task' ? 'border-primary bg-primary-subtle text-primary' : 'bg-light text-secondary'}`}
                                onClick={() => setItemType('task')}
                                role="button"
                            >
                                {itemType === 'task' ? <CheckCircleFill /> : <Circle />}
                                <span className="fw-semibold">One-time Task</span>
                            </div>

                            <div
                                className={`d-flex align-items-center gap-2 border rounded p-3 cursor-pointer flex-fill ${itemType === 'habit' ? 'border-primary bg-primary-subtle text-primary' : 'bg-light text-secondary'}`}
                                onClick={() => setItemType('habit')}
                                role="button"
                            >
                                {itemType === 'habit' ? <CheckCircleFill /> : <Circle />}
                                <span className="fw-semibold">Recurring Habit</span>
                            </div>
                        </div>
                    </Form.Group>

                    {/* Title */}
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder={itemType === 'habit' ? 'e.g., Drinking water' : 'e.g., Submit Report'}
                        />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add details..."
                            style={{ minHeight: '80px', resize: 'none' }}
                        />
                    </Form.Group>

                    <Row>
                        <Col sm={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="work">Work</option>
                                    <option value="personal">Personal</option>
                                    <option value="health">Health</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col sm={6}>
                            {itemType === 'task' ? (
                                <Form.Group className="mb-3">
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </Form.Select>
                                </Form.Group>
                            ) : (
                                <Form.Group className="mb-3">
                                    <Form.Label>Frequency</Form.Label>
                                    <Form.Select
                                        name="frequency"
                                        value={formData.frequency}
                                        onChange={handleChange}
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </Form.Select>
                                </Form.Group>
                            )}
                        </Col>
                    </Row>

                    {itemType === 'task' && (
                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <div className="position-relative">
                                <Form.Control
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                />
                                <Calendar className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary pe-none" size={16} />
                            </div>
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer className="bg-light">
                <Button variant="outline-secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskForm;