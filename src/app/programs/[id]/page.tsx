'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import VideoBackground from '@/components/VideoBackground';
import styles from './page.module.css';

interface Program {
    id: string;
    title: string;
    description: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    image: string;
    features: string[];
    price: number;
    schedule: {
        week: number;
        title: string;
        description: string;
        workouts: string[];
        meals: string[];
    }[];
    testimonials: {
        name: string;
        image: string;
        text: string;
        results: string;
    }[];
}

const programs: Record<string, Program> = {
    'weight-loss': {
        id: 'weight-loss',
        title: 'Weight Loss Program',
        description: 'Lose weight sustainably with personalized meal plans and workouts designed for your body type and lifestyle.',
        duration: '12 weeks',
        level: 'Beginner',
        image: '/media/programs/weight-loss.jpg',
        features: [
            'Personalized meal plans',
            'Custom workout routines',
            'Weekly progress tracking',
            'Nutritionist consultation',
            'Community support'
        ],
        price: 99,
        schedule: [
            {
                week: 1,
                title: 'Getting Started',
                description: 'Learn the basics of healthy eating and exercise',
                workouts: ['Full Body Strength', 'Cardio Basics', 'Core Workout'],
                meals: ['Meal Planning Guide', 'Healthy Recipes', 'Portion Control Tips']
            },
            {
                week: 2,
                title: 'Building Habits',
                description: 'Establish sustainable routines and habits',
                workouts: ['HIIT Cardio', 'Strength Training', 'Flexibility Workout'],
                meals: ['Meal Prep Guide', 'Snack Ideas', 'Hydration Tips']
            }
        ],
        testimonials: [
            {
                name: 'Sarah Johnson',
                image: '/media/testimonials/user1.jpg',
                text: 'Lost 20kg in 6 months with NutriFuel\'s personalized plans and expert guidance!',
                results: 'Lost 20kg'
            },
            {
                name: 'Mike Chen',
                image: '/media/testimonials/user2.jpg',
                text: 'The meal plans were perfect for my busy lifestyle. I never felt deprived!',
                results: 'Lost 15kg'
            }
        ]
    }
};

export default function ProgramPage() {
    const { id } = useParams();
    const [program, setProgram] = useState<Program | null>(null);
    const [selectedWeek, setSelectedWeek] = useState(1);

    useEffect(() => {
        if (id && typeof id === 'string') {
            setProgram(programs[id]);
        }
    }, [id]);

    if (!program) {
        return <div>Loading...</div>;
    }

    const currentWeek = program.schedule.find(w => w.week === selectedWeek);

    return (
        <VideoBackground>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <div
                        className={styles.heroImage}
                        style={{ backgroundImage: `url(${program.image})` }}
                    />
                    <div className={styles.heroContent}>
                        <h1>{program.title}</h1>
                        <div className={styles.heroMeta}>
                            <span className={styles.level}>{program.level}</span>
                            <span className={styles.duration}>{program.duration}</span>
                            <span className={styles.price}>${program.price}/month</span>
                        </div>
                        <p className={styles.description}>{program.description}</p>
                        <button className={styles.enrollButton}>Enroll Now</button>
                    </div>
                </div>

                <div className={styles.content}>
                    <section className={styles.features}>
                        <h2>What's Included</h2>
                        <div className={styles.featureGrid}>
                            {program.features.map((feature, index) => (
                                <div key={index} className={styles.featureCard}>
                                    <div className={styles.featureIcon}>✓</div>
                                    <p>{feature}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.schedule}>
                        <h2>Program Schedule</h2>
                        <div className={styles.weekSelector}>
                            {program.schedule.map(week => (
                                <button
                                    key={week.week}
                                    className={`${styles.weekButton} ${selectedWeek === week.week ? styles.active : ''}`}
                                    onClick={() => setSelectedWeek(week.week)}
                                >
                                    Week {week.week}
                                </button>
                            ))}
                        </div>
                        {currentWeek && (
                            <div className={styles.weekContent}>
                                <h3>{currentWeek.title}</h3>
                                <p>{currentWeek.description}</p>
                                <div className={styles.weekDetails}>
                                    <div className={styles.workouts}>
                                        <h4>Workouts</h4>
                                        <ul>
                                            {currentWeek.workouts.map((workout, index) => (
                                                <li key={index}>{workout}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.meals}>
                                        <h4>Meal Plans</h4>
                                        <ul>
                                            {currentWeek.meals.map((meal, index) => (
                                                <li key={index}>{meal}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    <section className={styles.testimonials}>
                        <h2>Success Stories</h2>
                        <div className={styles.testimonialGrid}>
                            {program.testimonials.map((testimonial, index) => (
                                <div key={index} className={styles.testimonialCard}>
                                    <div className={styles.testimonialContent}>
                                        <p>{testimonial.text}</p>
                                        <div className={styles.testimonialAuthor}>
                                            <img src={testimonial.image} alt={testimonial.name} />
                                            <div>
                                                <h4>{testimonial.name}</h4>
                                                <span>{testimonial.results}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </VideoBackground>
    );
} 