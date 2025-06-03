'use client';

import { useState } from 'react';
import { VideoBackground } from '@/components/VideoBackground';
import styles from './page.module.css';

interface WorkoutLog {
    id: string;
    date: string;
    workoutName: string;
    duration: number;
    caloriesBurned: number;
    exercises: {
        name: string;
        sets: number;
        reps: number;
        weight?: number;
    }[];
}

interface NutritionLog {
    id: string;
    date: string;
    meals: {
        name: string;
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    }[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
}

interface ProgressData {
    date: string;
    weight: number;
    bodyFat?: number;
    measurements: {
        chest?: number;
        waist?: number;
        hips?: number;
        arms?: number;
        thighs?: number;
    };
}

const mockWorkoutLogs: WorkoutLog[] = [
    {
        id: '1',
        date: '2024-03-15',
        workoutName: 'Full Body Strength',
        duration: 45,
        caloriesBurned: 350,
        exercises: [
            { name: 'Squats', sets: 3, reps: 12, weight: 60 },
            { name: 'Push-ups', sets: 3, reps: 15 },
            { name: 'Dumbbell Rows', sets: 3, reps: 12, weight: 20 },
            { name: 'Lunges', sets: 3, reps: 12, weight: 15 },
            { name: 'Plank', sets: 3, reps: 1, weight: 60 }
        ]
    },
    {
        id: '2',
        date: '2024-03-14',
        workoutName: 'HIIT Cardio',
        duration: 30,
        caloriesBurned: 400,
        exercises: [
            { name: 'Burpees', sets: 4, reps: 10 },
            { name: 'Mountain Climbers', sets: 4, reps: 20 },
            { name: 'Jump Squats', sets: 4, reps: 15 },
            { name: 'High Knees', sets: 4, reps: 30 }
        ]
    }
];

const mockNutritionLogs: NutritionLog[] = [
    {
        id: '1',
        date: '2024-03-15',
        meals: [
            {
                name: 'Breakfast - Protein Oatmeal',
                calories: 350,
                protein: 20,
                carbs: 45,
                fat: 8
            },
            {
                name: 'Lunch - Grilled Chicken Salad',
                calories: 450,
                protein: 35,
                carbs: 25,
                fat: 15
            },
            {
                name: 'Dinner - Salmon with Vegetables',
                calories: 550,
                protein: 40,
                carbs: 30,
                fat: 25
            }
        ],
        totalCalories: 1350,
        totalProtein: 95,
        totalCarbs: 100,
        totalFat: 48
    }
];

const mockProgressData: ProgressData[] = [
    {
        date: '2024-03-01',
        weight: 75,
        bodyFat: 20,
        measurements: {
            chest: 95,
            waist: 80,
            hips: 90,
            arms: 32,
            thighs: 55
        }
    },
    {
        date: '2024-03-15',
        weight: 73,
        bodyFat: 18,
        measurements: {
            chest: 94,
            waist: 78,
            hips: 88,
            arms: 33,
            thighs: 54
        }
    }
];

export default function TrackingPage() {
    const [activeTab, setActiveTab] = useState<'workouts' | 'nutrition' | 'progress'>('workouts');

    return (
        <VideoBackground>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Progress Tracking</h1>
                    <p>Monitor your fitness journey and stay on track</p>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'workouts' ? styles.active : ''}`}
                        onClick={() => setActiveTab('workouts')}
                    >
                        Workouts
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'nutrition' ? styles.active : ''}`}
                        onClick={() => setActiveTab('nutrition')}
                    >
                        Nutrition
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'progress' ? styles.active : ''}`}
                        onClick={() => setActiveTab('progress')}
                    >
                        Progress
                    </button>
                </div>

                <div className={styles.content}>
                    {activeTab === 'workouts' && (
                        <div className={styles.workoutLogs}>
                            <h2>Workout History</h2>
                            <div className={styles.logsGrid}>
                                {mockWorkoutLogs.map((log) => (
                                    <div key={log.id} className={styles.logCard}>
                                        <div className={styles.logHeader}>
                                            <h3>{log.workoutName}</h3>
                                            <span className={styles.date}>{log.date}</span>
                                        </div>
                                        <div className={styles.logStats}>
                                            <div className={styles.stat}>
                                                <span>Duration</span>
                                                <strong>{log.duration} min</strong>
                                            </div>
                                            <div className={styles.stat}>
                                                <span>Calories</span>
                                                <strong>{log.caloriesBurned}</strong>
                                            </div>
                                        </div>
                                        <div className={styles.exercises}>
                                            <h4>Exercises</h4>
                                            <ul>
                                                {log.exercises.map((exercise, index) => (
                                                    <li key={index}>
                                                        {exercise.name} - {exercise.sets}x{exercise.reps}
                                                        {exercise.weight && ` @ ${exercise.weight}kg`}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'nutrition' && (
                        <div className={styles.nutritionLogs}>
                            <h2>Nutrition Tracking</h2>
                            <div className={styles.logsGrid}>
                                {mockNutritionLogs.map((log) => (
                                    <div key={log.id} className={styles.logCard}>
                                        <div className={styles.logHeader}>
                                            <h3>Daily Nutrition</h3>
                                            <span className={styles.date}>{log.date}</span>
                                        </div>
                                        <div className={styles.meals}>
                                            {log.meals.map((meal, index) => (
                                                <div key={index} className={styles.meal}>
                                                    <h4>{meal.name}</h4>
                                                    <div className={styles.mealStats}>
                                                        <div className={styles.stat}>
                                                            <span>Calories</span>
                                                            <strong>{meal.calories}</strong>
                                                        </div>
                                                        <div className={styles.stat}>
                                                            <span>Protein</span>
                                                            <strong>{meal.protein}g</strong>
                                                        </div>
                                                        <div className={styles.stat}>
                                                            <span>Carbs</span>
                                                            <strong>{meal.carbs}g</strong>
                                                        </div>
                                                        <div className={styles.stat}>
                                                            <span>Fat</span>
                                                            <strong>{meal.fat}g</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.totalStats}>
                                            <h4>Daily Totals</h4>
                                            <div className={styles.statsGrid}>
                                                <div className={styles.stat}>
                                                    <span>Calories</span>
                                                    <strong>{log.totalCalories}</strong>
                                                </div>
                                                <div className={styles.stat}>
                                                    <span>Protein</span>
                                                    <strong>{log.totalProtein}g</strong>
                                                </div>
                                                <div className={styles.stat}>
                                                    <span>Carbs</span>
                                                    <strong>{log.totalCarbs}g</strong>
                                                </div>
                                                <div className={styles.stat}>
                                                    <span>Fat</span>
                                                    <strong>{log.totalFat}g</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'progress' && (
                        <div className={styles.progressTracking}>
                            <h2>Progress Tracking</h2>
                            <div className={styles.progressGrid}>
                                <div className={styles.weightChart}>
                                    <h3>Weight Progress</h3>
                                    <div className={styles.chart}>
                                        {mockProgressData.map((data, index) => (
                                            <div
                                                key={index}
                                                className={styles.chartPoint}
                                                style={{
                                                    left: `${(index / (mockProgressData.length - 1)) * 100}%`
                                                }}
                                            >
                                                <div className={styles.point} />
                                                <span className={styles.pointLabel}>{data.weight}kg</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.chartDates}>
                                        {mockProgressData.map((data, index) => (
                                            <span key={index} className={styles.dateLabel}>
                                                {data.date}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.measurements}>
                                    <h3>Body Measurements</h3>
                                    <div className={styles.measurementsGrid}>
                                        {mockProgressData.map((data, index) => (
                                            <div key={index} className={styles.measurementCard}>
                                                <h4>{data.date}</h4>
                                                <div className={styles.measurementStats}>
                                                    {data.measurements.chest && (
                                                        <div className={styles.stat}>
                                                            <span>Chest</span>
                                                            <strong>{data.measurements.chest}cm</strong>
                                                        </div>
                                                    )}
                                                    {data.measurements.waist && (
                                                        <div className={styles.stat}>
                                                            <span>Waist</span>
                                                            <strong>{data.measurements.waist}cm</strong>
                                                        </div>
                                                    )}
                                                    {data.measurements.hips && (
                                                        <div className={styles.stat}>
                                                            <span>Hips</span>
                                                            <strong>{data.measurements.hips}cm</strong>
                                                        </div>
                                                    )}
                                                    {data.measurements.arms && (
                                                        <div className={styles.stat}>
                                                            <span>Arms</span>
                                                            <strong>{data.measurements.arms}cm</strong>
                                                        </div>
                                                    )}
                                                    {data.measurements.thighs && (
                                                        <div className={styles.stat}>
                                                            <span>Thighs</span>
                                                            <strong>{data.measurements.thighs}cm</strong>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </VideoBackground>
    );
} 