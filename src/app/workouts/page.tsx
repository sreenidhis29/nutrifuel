'use client';

import { useState } from 'react';
import Link from 'next/link';
import VideoBackground from '@/components/VideoBackground';
import styles from './page.module.css';

interface Workout {
    id: string;
    title: string;
    category: 'Strength' | 'Cardio' | 'Yoga' | 'HIIT';
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    image: string;
    description: string;
    calories: number;
    exercises: {
        name: string;
        sets: number;
        reps: string;
        rest: string;
    }[];
}

const workouts: Workout[] = [
    {
        id: 'full-body-strength',
        title: 'Full Body Strength',
        category: 'Strength',
        duration: '45 min',
        difficulty: 'Intermediate',
        image: '/media/workouts/strength.jpg',
        description: 'Build total body strength with this comprehensive workout targeting all major muscle groups.',
        calories: 350,
        exercises: [
            { name: 'Squats', sets: 4, reps: '12 reps', rest: '60 sec' },
            { name: 'Push-ups', sets: 3, reps: '15 reps', rest: '45 sec' },
            { name: 'Dumbbell Rows', sets: 3, reps: '12 reps each', rest: '45 sec' },
            { name: 'Lunges', sets: 3, reps: '10 reps each', rest: '45 sec' },
            { name: 'Plank', sets: 3, reps: '45 sec', rest: '30 sec' }
        ]
    },
    {
        id: 'hiit-cardio',
        title: 'HIIT Cardio Blast',
        category: 'HIIT',
        duration: '30 min',
        difficulty: 'Advanced',
        image: '/media/workouts/hiit.jpg',
        description: 'High-intensity interval training to boost your metabolism and burn calories.',
        calories: 400,
        exercises: [
            { name: 'Jumping Jacks', sets: 4, reps: '45 sec', rest: '15 sec' },
            { name: 'Mountain Climbers', sets: 4, reps: '45 sec', rest: '15 sec' },
            { name: 'Burpees', sets: 4, reps: '30 sec', rest: '15 sec' },
            { name: 'High Knees', sets: 4, reps: '45 sec', rest: '15 sec' }
        ]
    },
    {
        id: 'yoga-flow',
        title: 'Morning Yoga Flow',
        category: 'Yoga',
        duration: '40 min',
        difficulty: 'Beginner',
        image: '/media/workouts/yoga.jpg',
        description: 'Start your day with this energizing yoga sequence to improve flexibility and mindfulness.',
        calories: 200,
        exercises: [
            { name: 'Sun Salutations', sets: 3, reps: '5 rounds', rest: '30 sec' },
            { name: 'Warrior Poses', sets: 2, reps: '30 sec each', rest: '15 sec' },
            { name: 'Tree Pose', sets: 2, reps: '45 sec each', rest: '15 sec' },
            { name: 'Child\'s Pose', sets: 1, reps: '2 min', rest: 'none' }
        ]
    },
    {
        id: 'cardio-sculpt',
        title: 'Cardio Sculpt',
        category: 'Cardio',
        duration: '35 min',
        difficulty: 'Intermediate',
        image: '/media/workouts/cardio.jpg',
        description: 'Combine cardio and strength training for a total body workout.',
        calories: 300,
        exercises: [
            { name: 'Jump Rope', sets: 3, reps: '2 min', rest: '30 sec' },
            { name: 'Dumbbell Squat Press', sets: 3, reps: '12 reps', rest: '45 sec' },
            { name: 'Jumping Lunges', sets: 3, reps: '20 reps', rest: '30 sec' },
            { name: 'Plank to Push-up', sets: 3, reps: '10 reps', rest: '45 sec' }
        ]
    }
];

export default function WorkoutsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

    const filteredWorkouts = workouts.filter(workout => {
        if (selectedCategory !== 'all' && workout.category !== selectedCategory) return false;
        if (selectedDifficulty !== 'all' && workout.difficulty !== selectedDifficulty) return false;
        return true;
    });

    return (
        <VideoBackground>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Workout Library</h1>
                    <p>Find the perfect workout for your fitness goals</p>
                </header>

                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <label>Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={styles.select}
                        >
                            <option value="all">All Categories</option>
                            <option value="Strength">Strength</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Yoga">Yoga</option>
                            <option value="HIIT">HIIT</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Difficulty:</label>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className={styles.select}
                        >
                            <option value="all">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div className={styles.workoutGrid}>
                    {filteredWorkouts.map(workout => (
                        <div key={workout.id} className={styles.workoutCard}>
                            <div
                                className={styles.workoutImage}
                                style={{ backgroundImage: `url(${workout.image})` }}
                            />
                            <div className={styles.workoutContent}>
                                <div className={styles.workoutHeader}>
                                    <h2>{workout.title}</h2>
                                    <span className={styles.difficulty}>{workout.difficulty}</span>
                                </div>
                                <div className={styles.workoutMeta}>
                                    <span className={styles.category}>{workout.category}</span>
                                    <span className={styles.duration}>{workout.duration}</span>
                                    <span className={styles.calories}>{workout.calories} cal</span>
                                </div>
                                <p className={styles.description}>{workout.description}</p>
                                <div className={styles.exercises}>
                                    <h3>Exercises:</h3>
                                    <ul>
                                        {workout.exercises.map((exercise, index) => (
                                            <li key={index}>
                                                <span className={styles.exerciseName}>{exercise.name}</span>
                                                <span className={styles.exerciseDetails}>
                                                    {exercise.sets} sets × {exercise.reps}
                                                    {exercise.rest !== 'none' && ` • ${exercise.rest} rest`}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link
                                    href={`/workouts/${workout.id}`}
                                    className={styles.startButton}
                                >
                                    Start Workout
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </VideoBackground>
    );
} 