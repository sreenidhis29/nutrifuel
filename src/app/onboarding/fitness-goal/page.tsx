'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { FitnessGoal } from '@/types';
import styles from './page.module.css';

const fitnessGoals: { value: FitnessGoal, label: string, emoji: string }[] = [
    { value: 'muscle_gain', label: 'Muscle\nGain', emoji: '💪' },
    { value: 'weight_loss', label: 'Weight\nLoss', emoji: '⚖️' },
    { value: 'maintenance', label: 'Maintenance', emoji: '❤️' },
];

export default function FitnessGoalPage() {
    const router = useRouter();
    const [selectedGoal, setSelectedGoal] = useState<FitnessGoal | null>(null);

    const handleNext = () => {
        if (selectedGoal) {
            // Save selectedGoal to state or context if needed
            router.push('/onboarding/about-yourself');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo} role="img" aria-label="NutriFuel Logo">🌿</div>
                <h1 className={styles.heading}>Set Your Fitness Goal</h1>
            </div>

            <div className={styles.goalsGrid}>
                {fitnessGoals.map(goal => (
                    <button
                        key={goal.value}
                        className={`${styles.goalButton} ${selectedGoal === goal.value ? styles.selected : ''}`}
                        onClick={() => setSelectedGoal(goal.value)}
                    >
                        <span className={styles.goalIcon} role="img" aria-label={goal.label}>{goal.emoji}</span>
                        <span className={styles.goalLabel}>{goal.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.buttonContainer}>
                <Button
                    onClick={handleNext}
                    fullWidth
                    disabled={!selectedGoal}
                >
                    Next
                </Button>
            </div>
        </div>
    );
} 