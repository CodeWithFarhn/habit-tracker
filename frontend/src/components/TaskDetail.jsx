import React, { useState, useEffect } from 'react';
import { PencilSquare, Trash, CheckLg, ArrowLeft } from "react-bootstrap-icons";
import { Button, Badge, Form, Card } from 'react-bootstrap';
import { getCategoryColor, getPriorityColor } from '../data/mockData';

// Helper to find task from list driven by props now
const findTaskById = (tasks, taskId) => tasks.find(t => t._id === taskId) || null;

export default function TaskDetail({ taskId, tasks, onBackToDashboard, onDeleteTask, onUpdateTask }) {
    const task = findTaskById(tasks, taskId);

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    // Reset edit data when task changes
    useEffect(() => {
        if (task) {
            setEditData(task);
        }
    }, [task]);

    if (!task) {
        return (
            <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                <div className="text-secondary text-center">
                    <div className="display-4 mb-2">📪</div>
                    <p className="lead">Task not found</p>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        try {
            console.log('Saving task:', editData);
            if (onUpdateTask) {
                onUpdateTask(task._id, editData);
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData(task);
    };

    const handleMarkCompleted = () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        if (onUpdateTask) {
            onUpdateTask(task._id, { status: newStatus });
        }
        console.log('Task marked as:', newStatus);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                if (onDeleteTask) {
                    onDeleteTask(task._id);
                }
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    return (
        <div className="h-100 bg-white overflow-auto">
            {/* Header */}
            <div className="border-bottom px-4 py-3 d-flex align-items-center justify-content-between bg-light">
                <div className="d-flex align-items-center gap-3">
                    <Button
                        variant={task.status === 'completed' ? 'outline-success' : 'outline-secondary'}
                        onClick={handleMarkCompleted}
                        className="d-flex align-items-center gap-2 fw-semibold"
                        title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                    >
                        {task.status === 'completed' ? <CheckLg size={18} /> : <div style={{ width: 18, height: 18, border: '2px solid currentColor', borderRadius: '4px' }}></div>}
                        {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
                    </Button>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <Button
                        variant="outline-secondary"
                        onClick={() => setIsEditing(!isEditing)}
                        title="Edit task"
                        className="d-flex align-items-center justify-content-center p-2"
                    >
                        <PencilSquare size={18} />
                    </Button>

                    <Button
                        variant="outline-danger"
                        onClick={handleDelete}
                        title="Delete task"
                        className="d-flex align-items-center justify-content-center p-2"
                    >
                        <Trash size={18} />
                    </Button>
                </div>
            </div>

            {/* Badges */}
            <div className="px-4 py-3 bg-white d-flex align-items-center gap-2">
                <Badge bg="secondary" className="d-flex align-items-center gap-1 py-2 px-3 fw-bold rounded-pill text-uppercase">
                    {task.frequency ? 'HABIT' : 'TASK'}
                </Badge>

                <Badge bg={getCategoryColor(task.category)} className="d-flex align-items-center gap-1 py-2 px-3 fw-bold rounded-pill text-uppercase">
                    {task.category}
                </Badge>
            </div>

            {/* Task Title */}
            <div className="px-4 py-2 bg-white">
                <h1 className={`display-6 fw-bold ${task.status === 'completed' ? 'text-secondary text-decoration-line-through opacity-75' : 'text-dark'}`}>
                    {task.title}
                </h1>
            </div>

            {/* Content */}
            <div className="px-4 py-4">
                <div className="d-grid gap-4" style={{ maxWidth: '800px' }}>

                    {/* Priority & Due Date Row */}
                    <div className="d-flex gap-4 flex-wrap">
                        {/* Priority */}
                        <div className="flex-fill">
                            <Form.Label className="small fw-bold text-secondary text-uppercase mb-2">Priority</Form.Label>
                            {isEditing ? (
                                <Form.Select
                                    value={editData.priority || 'medium'}
                                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                                    className="fw-semibold text-capitalize"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </Form.Select>
                            ) : (
                                <div className="bg-light border rounded p-3">
                                    <p className="mb-0 fw-semibold text-capitalize text-dark">{task.priority}</p>
                                </div>
                            )}
                        </div>

                        {/* Due Date */}
                        <div className="flex-fill">
                            <Form.Label className="small fw-bold text-secondary text-uppercase mb-2">Due Date</Form.Label>
                            {isEditing ? (
                                <Form.Control
                                    type="date"
                                    value={editData.dueDate ? new Date(editData.dueDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setEditData({ ...editData, dueDate: new Date(e.target.value).toISOString() })}
                                    className="fw-semibold"
                                />
                            ) : (
                                <div className="bg-light border rounded p-3">
                                    <p className="mb-0 fw-semibold text-dark">
                                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <Form.Label className="small fw-bold text-secondary text-uppercase mb-2">Description</Form.Label>
                        {isEditing ? (
                            <Form.Control
                                as="textarea"
                                rows={8} /* Improvement: Increased rows for editing */
                                value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                className="fw-medium"
                            />
                        ) : (
                            /* Improvement: Added minHeight to Card Body to ensure it looks "bigger" */
                            <Card className="border-start border-start-4 border-primary bg-light-subtle shadow-sm my-1">
                                <Card.Body style={{ minHeight: '120px' }}>
                                    <p className="mb-0 text-secondary" style={{ lineHeight: '1.8' }}>
                                        {task.description || 'No description provided.'}
                                    </p>
                                </Card.Body>
                            </Card>
                        )}
                    </div>

                    {/* Footnote */}
                    <div className="text-muted small d-flex align-items-center gap-2 mt-2">
                        <div className="border-start ps-3">
                            Created {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date(task.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </div>
                    </div>

                    {/* Actions */}
                    {isEditing && (
                        <div className="d-flex gap-3 pt-3">
                            <Button variant="primary" className="flex-fill fw-bold" onClick={handleSave}>
                                Save Changes
                            </Button>
                            <Button variant="secondary" className="flex-fill fw-bold" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}