import asyncHandler from 'express-async-handler';
import Habit from '../models/Habit.js';

// @desc    Get habits
// @route   GET /api/habits
// @access  Private
const getHabits = asyncHandler(async (req, res) => {
    const habits = await Habit.find({ user: req.user.id });
    res.status(200).json(habits);
});

// @desc    Create habit
// @route   POST /api/habits
// @access  Private
const createHabit = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add a name field');
    }

    const habit = await Habit.create({
        name: req.body.name,
        description: req.body.description,
        frequency: req.body.frequency,
        user: req.user.id,
    });

    res.status(201).json(habit);
});

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
        res.status(404);
        throw new Error('Habit not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the habit user
    if (habit.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // If completedDates is being updated, recalculate streak
    if (req.body.completedDates) {
        const sortedDates = [...req.body.completedDates].sort((a, b) => new Date(b) - new Date(a));
        let currentStreak = 0;
        let expectedDate = new Date();
        // Normalize to start of day for accurate comparison
        expectedDate.setHours(0, 0, 0, 0);

        // Simple daily streak check
        // Check if today is completed
        const todayStr = expectedDate.toISOString().split('T')[0];
        const isTodayCompleted = sortedDates.some(d => d.startsWith(todayStr));

        // If not completed today, check yesterday for streak continuation
        // If completed today, start counting from today

        // Simplified Logic: 
        // 1. Sort dates descending.
        // 2. Iterate. Each date must be 1 day before the previous one (or today/yesterday).

        // Robust calculation:
        let streak = 0;
        const oneDay = 24 * 60 * 60 * 1000;

        let lastDate = null;

        // We only care about consecutive days relative to "now"
        // But for "current streak", we usually count backwards from today or yesterday.

        // Let's use a simpler approach: 
        // Iterate dates descending. 
        // If date is today or yesterday (and we haven't counted today yet), count it.
        // If date is exactly 1 day before last counted date, increment.
        // Break if gap > 1 day.

        const uniqueDates = [...new Set(sortedDates.map(d => d.split('T')[0]))].sort().reverse();

        if (uniqueDates.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            const yesterday = yesterdayDate.toISOString().split('T')[0];

            // If the most recent completion is neither today nor yesterday, streak is 0
            if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
                streak = 1;
                let currentDate = new Date(uniqueDates[0]);

                for (let i = 1; i < uniqueDates.length; i++) {
                    const prevDate = new Date(uniqueDates[i]);
                    const diffTime = Math.abs(currentDate - prevDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) {
                        streak++;
                        currentDate = prevDate;
                    } else {
                        break;
                    }
                }
            }
        }

        req.body.streak = streak; // Force update the streak
    }

    const updatedHabit = await Habit.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json(updatedHabit);
});

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
        res.status(404);
        throw new Error('Habit not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the habit user
    if (habit.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await habit.deleteOne();

    res.status(200).json({ id: req.params.id });
});

export { getHabits, createHabit, updateHabit, deleteHabit };
