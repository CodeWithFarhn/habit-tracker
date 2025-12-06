import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            index: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a task title'],
        },
        description: {
            type: String,
        },
        category: {
            type: String,
            enum: ['work', 'personal', 'health'],
            default: 'personal',
            index: true, // Added index for filtering
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        dueDate: {
            type: Date,
            required: [true, 'Please add a due date'],
            index: true, // Added index for sorting/filtering
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending',
            index: true, // Added index for filtering
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
