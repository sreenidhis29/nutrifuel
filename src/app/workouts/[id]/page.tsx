'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import VideoBackground from '@/components/VideoBackground';
import styles from './page.module.css';

interface Exercise {
    name: string;
    sets: number;
    reps: string;
    rest: string;
    videoUrl?: string;
    description?: string;
}

interface Workout {
    id: string;
    title: string;
    category: 'Strength' | 'Cardio' | 'Yoga' | 'HIIT';
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    image: string;
    description: string;
    calories: number;
    exercises: Exercise[];
    equipment?: string[];
    tips?: string[];
}

const workouts: Record<string, Workout> = {
    'full-body-strength': {
        id: 'full-body-strength',
        title: 'Full Body Strength',
        category: 'Strength',
        duration: '45 min',
        difficulty: 'Intermediate',
        image: '/media/workouts/strength.jpg',
        description: 'Build total body strength with this comprehensive workout targeting all major muscle groups.',
        calories: 350,
        exercises: [
            {
                name: 'Squats',
                sets: 4,
                reps: '12 reps',
                rest: '60 sec',
                videoUrl: '/media/exercises/squats.mp4',
                description: 'Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing.'
            },
            {
                name: 'Push-ups',
                sets: 3,
                reps: '15 reps',
                rest: '45 sec',
                videoUrl: '/media/exercises/pushups.mp4',
                description: 'Start in a plank position, lower your body until your chest nearly touches the floor, then push back up.'
            },
            {
                name: 'Dumbbell Rows',
                sets: 3,
                reps: '12 reps each',
                rest: '45 sec',
                videoUrl: '/media/exercises/rows.mp4',
                description: 'Bend at the waist, hold a dumbbell in one hand, pull it up to your chest, then lower it back down.'
            },
            {
                name: 'Lunges',
                sets: 3,
                reps: '10 reps each',
                rest: '45 sec',
                videoUrl: '/media/exercises/lunges.mp4',
                description: 'Step forward with one leg, lower your body until both knees are bent at 90 degrees, then push back to start.'
            },
            {
                name: 'Plank',
                sets: 3,
                reps: '45 sec',
                rest: '30 sec',
                videoUrl: '/media/exercises/plank.mp4',
                description: 'Hold a push-up position with your body in a straight line from head to heels.'
            }
        ],
        equipment: ['Dumbbells', 'Exercise mat'],
        tips: [
            'Warm up properly before starting',
            'Maintain proper form throughout each exercise',
            'Stay hydrated during the workout',
            'Listen to your body and rest when needed'
        ]
    }
};

export default function WorkoutPage() {
    const { id } = useParams();
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [restTimeLeft, setRestTimeLeft] = useState(0);

    useEffect(() => {
        if (id && typeof id === 'string') {
            setWorkout(workouts[id]);
        }
    }, [id]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isResting && restTimeLeft > 0) {
            timer = setInterval(() => {
                setRestTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (restTimeLeft === 0) {
            setIsResting(false);
            if (currentExercise < (workout?.exercises.length || 0) - 1) {
                setCurrentExercise(prev => prev + 1);
            }
        }
        return () => clearInterval(timer);
    }, [isResting, restTimeLeft, currentExercise, workout]);

    if (!workout) {
        return <div>Loading...</div>;
    }

    const startRest = (seconds: number) => {
        setIsResting(true);
        setRestTimeLeft(seconds);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <VideoBackground>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <div
                        className={styles.heroImage}
                        style={{ backgroundImage: `url(${workout.image})` }}
                    />
                    <div className={styles.heroContent}>
                        <h1>{workout.title}</h1>
                        <div className={styles.heroMeta}>
                            <span className={styles.category}>{workout.category}</span>
                            <span className={styles.difficulty}>{workout.difficulty}</span>
                            <span className={styles.duration}>{workout.duration}</span>
                            <span className={styles.calories}>{workout.calories} cal</span>
                        </div>
                        <p className={styles.description}>{workout.description}</p>
                        {!isWorkoutStarted ? (
                            <button
                                className={styles.startButton}
                                onClick={() => setIsWorkoutStarted(true)}
                            >
                                Start Workout
                            </button>
                        ) : (
                            <button
                                className={styles.pauseButton}
                                onClick={() => setIsWorkoutStarted(false)}
                            >
                                Pause Workout
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.content}>
                    {isWorkoutStarted ? (
                        <div className={styles.workoutSession}>
                            <div className={styles.currentExercise}>
                                <h2>Current Exercise</h2>
                                <div className={styles.exerciseCard}>
                                    <h3>{workout.exercises[currentExercise].name}</h3>
                                    <p>{workout.exercises[currentExercise].description}</p>
                                    <div className={styles.exerciseDetails}>
                                        <span>Sets: {workout.exercises[currentExercise].sets}</span>
                                        <span>Reps: {workout.exercises[currentExercise].reps}</span>
                                        {isResting ? (
                                            <span className={styles.restTimer}>
                                                Rest: {formatTime(restTimeLeft)}
                                            </span>
                                        ) : (
                                            <button
                                                className={styles.nextButton}
                                                onClick={() => startRest(parseInt(workout.exercises[currentExercise].rest))}
                                            >
                                                Next Set
                                            </button>
                                        )}
                                    </div>
                                    {workout.exercises[currentExercise].videoUrl && (
                                        <video
                                            src={workout.exercises[currentExercise].videoUrl}
                                            controls
                                            className={styles.exerciseVideo}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <section className={styles.equipment}>
                                <h2>Equipment Needed</h2>
                                <ul>
                                    {workout.equipment?.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className={styles.tips}>
                                <h2>Workout Tips</h2>
                                <ul>
                                    {workout.tips?.map((tip, index) => (
                                        <li key={index}>{tip}</li>
                                    ))}
                                </ul>
                            </section>

                            <section className={styles.exercises}>
                                <h2>Exercise List</h2>
                                <div className={styles.exerciseList}>
                                    {workout.exercises.map((exercise, index) => (
                                        <div key={index} className={styles.exerciseItem}>
                                            <h3>{exercise.name}</h3>
                                            <div className={styles.exerciseMeta}>
                                                <span>{exercise.sets} sets</span>
                                                <span>{exercise.reps}</span>
                                                <span>{exercise.rest} rest</span>
                                            </div>
                                            {exercise.description && (
                                                <p>{exercise.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </VideoBackground>
    );
} 