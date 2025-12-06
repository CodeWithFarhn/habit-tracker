import mongoose from 'mongoose';

const habitSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            index: true, // Optimize queries by user
        },
        name: {
            type: String,
            required: [true, 'Please add a habit name'],
        },
        description: {
            type: String,
        },
        frequency: {
            type: String,
            enum: ['daily', 'weekly'],
            default: 'daily',
        },
        completedDates: {
            type: [String], // Array of ISO date strings
            default: [],
        },
        streak: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for frequent queries (e.g. creating dashboards)
habitSchema.index({ user: 1, streak: -1 });

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
