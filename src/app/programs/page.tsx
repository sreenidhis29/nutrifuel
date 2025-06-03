'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VideoBackground } from '@/components/VideoBackground';
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
}

const programs: Program[] = [
    {
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
        price: 99
    },
    {
        id: 'muscle-gain',
        title: 'Muscle Gain Program',
        description: 'Build muscle mass with expert nutrition and training guidance tailored to your goals.',
        duration: '16 weeks',
        level: 'Intermediate',
        image: '/media/programs/muscle-gain.jpg',
        features: [
            'High-protein meal plans',
            'Strength training workouts',
            'Progress monitoring',
            'Supplement guidance',
            'Expert trainer support'
        ],
        price: 129
    },
    {
        id: 'healthy-living',
        title: 'Healthy Living Program',
        description: 'Maintain a balanced lifestyle with sustainable habits and mindful eating practices.',
        duration: '8 weeks',
        level: 'Beginner',
        image: '/media/programs/healthy-living.jpg',
        features: [
            'Balanced meal plans',
            'Mindful eating guidance',
            'Stress management',
            'Sleep optimization',
            'Lifestyle coaching'
        ],
        price: 79
    },
    {
        id: 'athletic-performance',
        title: 'Athletic Performance',
        description: 'Enhance your athletic performance with specialized training and nutrition plans.',
        duration: '20 weeks',
        level: 'Advanced',
        image: '/media/programs/athletic.jpg',
        features: [
            'Performance nutrition',
            'Sport-specific training',
            'Recovery protocols',
            'Injury prevention',
            'Elite coach support'
        ],
        price: 149
    }
];

export default function ProgramsPage() {
    const [selectedLevel, setSelectedLevel] = useState<string>('all');
    const [selectedDuration, setSelectedDuration] = useState<string>('all');

    const filteredPrograms = programs.filter(program => {
        if (selectedLevel !== 'all' && program.level !== selectedLevel) return false;
        if (selectedDuration !== 'all') {
            const duration = parseInt(program.duration);
            if (selectedDuration === 'short' && duration > 8) return false;
            if (selectedDuration === 'medium' && (duration < 8 || duration > 16)) return false;
            if (selectedDuration === 'long' && duration < 16) return false;
        }
        return true;
    });

    return (
        <VideoBackground>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Our Programs</h1>
                    <p>Choose the perfect program to achieve your fitness goals</p>
                </header>

                <div className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <label>Level:</label>
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className={styles.select}
                        >
                            <option value="all">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Duration:</label>
                        <select
                            value={selectedDuration}
                            onChange={(e) => setSelectedDuration(e.target.value)}
                            className={styles.select}
                        >
                            <option value="all">Any Duration</option>
                            <option value="short">Short (≤8 weeks)</option>
                            <option value="medium">Medium (9-16 weeks)</option>
                            <option value="long">Long (>16 weeks)</option>
                        </select>
                    </div>
                </div>

                <div className={styles.programGrid}>
                    {filteredPrograms.map(program => (
                        <div key={program.id} className={styles.programCard}>
                            <div
                                className={styles.programImage}
                                style={{ backgroundImage: `url(${program.image})` }}
                            />
                            <div className={styles.programContent}>
                                <div className={styles.programHeader}>
                                    <h2>{program.title}</h2>
                                    <span className={styles.level}>{program.level}</span>
                                </div>
                                <p className={styles.description}>{program.description}</p>
                                <div className={styles.details}>
                                    <span className={styles.duration}>
                                        <strong>Duration:</strong> {program.duration}
                                    </span>
                                    <span className={styles.price}>
                                        <strong>Price:</strong> ${program.price}/month
                                    </span>
                                </div>
                                <ul className={styles.features}>
                                    {program.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                                <Link
                                    href={`/programs/${program.id}`}
                                    className={styles.enrollButton}
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </VideoBackground>
    );
} 