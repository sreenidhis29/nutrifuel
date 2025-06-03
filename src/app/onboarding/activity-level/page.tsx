'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

const activityLevels = [
    'Sedentary',
    'Lightly active', \n    'Active',
    'Very active',
];

export default function ActivityLevelPage() {
    const router = useRouter();
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const handleNext = () => {
        if (selectedLevel) {
            // Save selectedLevel to state or context if needed
            router.push('/onboarding/fitness-goal');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo} role="img" aria-label="NutriFuel Logo">🌿</div>
                <h1 className={styles.heading}>Select Activity Level</h1>
            </div>

            <div className={styles.optionsList}>
                {activityLevels.map(level => (
                    <button
                        key={level}
                        className={`${styles.optionButton} ${selectedLevel === level ? styles.selected : ''}`}
                        onClick={() => setSelectedLevel(level)}
                    >
                        {level === 'Sedentary' && <span className={styles.selectedOptionIndicator}></span>}{level}
                    </button>
                ))}
            </div>

            <div className={styles.buttonContainer}>
                <Button
                    onClick={handleNext}
                    fullWidth
                    disabled={!selectedLevel}
                >
                    Next
                </Button>
            </div>
        </div>
    );
} 